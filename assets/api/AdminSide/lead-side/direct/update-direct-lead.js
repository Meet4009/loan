const urlParams = new URLSearchParams(window.location.search);
const id = urlParams.get('id');

document.addEventListener('DOMContentLoaded', async () => {
    if (!id) {
        console.error('No ID provided in URL parameters');
        return;
    }

    const token = localStorage.getItem('token');
    if (!token) {
        window.location.href = '../../index.html';
        return;
    }

    let followUpCount = 1;

    // Add Follow Up button
    document.querySelector('.btn-outline-primary')?.addEventListener('click', (e) => {
        e.preventDefault();
        followUpCount++;
        addNewFollowUpSection();
    });

    // Remove Follow Up buttons (event delegation)
    document.addEventListener('click', (e) => {
        if (e.target.classList.contains('remove-follow-up')) {
            e.target.closest('.follow-up-section')?.remove();
        }
    });

    // Load form and follow-up data
    await Promise.all([fetchLeadData(id, token), fetchFollowUpData(id, token)]);

    // Submit handler
    document.getElementById('direct-data-add')?.addEventListener('click', handleFormSubmission);
});

function addNewFollowUpSection(data = {}) {
    const newSection = `
    <div class="row follow-up-section" ${data.id ? `data-followup-id="${data.id}"` : ''}>
        <div class="col-lg-12">
            <div class="card p-5">
            <div class="card-body">
                <div class="row justify-content-end">
                <div class="col-lg-6">
                    ${createInputGroup('Date', 'follow_start_date', 'date', data.start_date)}
                    ${createInputGroup('End Date', 'follow_end_date', 'date', data.end_date)}
                </div>
                <div class="col-lg-6">
                    ${createInputGroup('Property Name', 'follow_property', 'text', data.property)}
                    ${createInputGroup('Description', 'follow_description', 'text', data.description)}
                    <div class="col-sm-12 text-right">
                    <button type="button" class="btn btn-danger remove-follow-up">Remove</button>
                    </div>
                </div>
                </div>
            </div>
            </div>
        </div>
        </div>
    `;
    document.getElementById('direct-data-add').closest('.row').insertAdjacentHTML('beforebegin', newSection);
}

function createInputGroup(label, className, type, value = '') {
    return `
    <div class="form-group row">
      <label class="col-sm-3 col-form-label text-left text-sm-center">${label}</label>
      <div class="col-sm-9">
        <input class="form-control ${className}" type="${type}" value="${value}">
      </div>
    </div>
  `;
}

async function fetchLeadData(id, token) {
    try {
        const response = await fetch(`https://loantest.innovatixtechnologies.com/account/example-app/public/api/formdata/admin/${id}`, {
            headers: {
                'Authorization': `Bearer ${token}`,
                'Content-Type': 'application/json'
            }
        });
        const result = await response.json();
        if (result.message === "Form data fetched successfully") {
            populateFormData(result.data);
        } else {
            console.error("Failed to fetch form data");
        }
    } catch (error) {
        console.error("Error fetching lead data:", error);
    }
}

async function fetchFollowUpData(id, token) {
    try {
        const response = await fetch(`https://loantest.innovatixtechnologies.com/account/example-app/public/api/follow-up-list/admin/${id}`, {
            headers: {
                'Authorization': `Bearer ${token}`,
                'Content-Type': 'application/json'
            }
        });
        const result = await response.json();
        if (result.message === "Follow-up data fetched successfully" && Array.isArray(result.data)) {
            document.querySelectorAll('.follow-up-section').forEach(el => el.remove());
            result.data.forEach(item => addNewFollowUpSection(item));
        } else {
            console.warn("No follow-up data found");
        }
    } catch (error) {
        console.error("Error fetching follow-up data:", error);
    }
}

function populateFormData(data) {
    [
        'date', 'party_name', 'party_mono', 'property_name', 'builder_name',
        'reference', 'party_profile', 'document', 'document_check',
        'bank', 'status', 'pf', 'rm', 'stemp', 'tcvr', 'c_astiment',
        'ework', 'astiment', 'b_astiment', 'vahivat', 'loan_fees'
    ].forEach(id => {
        const el = document.getElementById(id);
        if (el) el.value = data[id] || '';
    });
}

async function handleFormSubmission(e) {
    e.preventDefault();

    const getField = id => document.getElementById(id)?.value?.trim() || '';
    const getNumField = id => getField(id) || '0';

    const followUps = Array.from(document.querySelectorAll('.follow-up-section')).map(section => {
        const followUp = {
            start_date: section.querySelector('.follow_start_date')?.value || '',
            end_date: section.querySelector('.follow_end_date')?.value || '',
            property: section.querySelector('.follow_property')?.value || '',
            description: section.querySelector('.follow_description')?.value || ''
        };
        if (section.dataset.followupId) followUp.id = section.dataset.followupId;
        return followUp;
    });

    const payload = {
        date: getField('date'),
        party_name: getField('party_name'),
        party_mono: getField('party_mono'),
        property_name: getField('property_name'),
        builder_name: getField('builder_name'),
        reference: getField('reference'),
        party_profile: getField('party_profile'),
        document: getField('document'),
        document_check: getField('document_check'),
        bank: getField('bank'),
        status: getField('status'),
        pf: getNumField('pf'),
        rm: getNumField('rm'),
        stemp: getNumField('stemp'),
        tcvr: getNumField('tcvr'),
        c_astiment: getNumField('c_astiment'),
        ework: getNumField('ework'),
        astiment: getNumField('astiment'),
        b_astiment: getNumField('b_astiment'),
        vahivat: getNumField('vahivat'),
        loan_fees: getNumField('loan_fees'),
        follow_up: followUps
    };

    if (!payload.date || !payload.party_name || !payload.party_mono || !payload.property_name) {
        alert('Please fill all required fields');
        return;
    }

    try {
        const res = await fetch(`https://loantest.innovatixtechnologies.com/account/example-app/public/api/form-update/admin/${id}`, {
            method: 'PUT',
            headers: {
                'Authorization': `Bearer ${localStorage.getItem('token')}`,
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(payload)
        });

        const result = await res.json();
        if (res.ok || result.status === true) {
            alert('Lead and follow-ups updated successfully');
            window.location.href = 'index.html';
        } else {
            throw new Error(result.message || 'Update failed');
        }
    } catch (error) {
        console.error('Update error:', error);
        alert('Error updating lead: ' + error.message);
    }
}
