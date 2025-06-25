// Extract ID from URL parameters once
const urlParams = new URLSearchParams(window.location.search);
const id = urlParams.get('id');

// Utility: Get token and check authentication
const token = localStorage.getItem('token');
if (!token) {
    window.location.href = "../../../index.html";
}

// Global follow-up counter
let followUpCount = 1;

// Main page initialization
document.addEventListener('DOMContentLoaded', () => {
    if (!id) {
        console.error('No ID provided in URL parameters');
        return;
    }

    // Button handlers
    document.querySelector('.btn-outline-primary').addEventListener('click', e => {
        e.preventDefault();
        followUpCount++;
        addFollowUpSection();
    });

    document.addEventListener('click', e => {
        if (e.target.classList.contains('remove-follow-up')) {
            e.target.closest('.follow-up-section').remove();
        }
    });

    document.getElementById('add-builder-data').addEventListener('click', handleFormSubmission);

    // Load existing data
    loadBuilderDetails();
    loadFollowUps();
});

/**
 * Add a follow-up input section (reused for new and existing)
 */
function addFollowUpSection(data = {}) {
    const template = `
        <div class="row follow-up-section" ${data.id ? `data-followup-id="${data.id}"` : ''}>
            <div class="col-lg-12">
                <div class="card p-5">
                    <div class="card-body">
                        <div class="row justify-content-end">
                            <div class="col-lg-6">
                                <div class="form-group row">
                                    <label class="col-sm-3 col-form-label">Date</label>
                                    <div class="col-sm-9">
                                        <input class="form-control follow_start_date" type="date" value="${data.start_date || ''}">
                                    </div>
                                </div>
                                <div class="form-group row">
                                    <label class="col-sm-3 col-form-label">End Date</label>
                                    <div class="col-sm-9">
                                        <input class="form-control follow_end_date" type="date" value="${data.end_date || ''}">
                                    </div>
                                </div>
                            </div>
                            <div class="col-lg-6">
                                <div class="form-group row">
                                    <label class="col-sm-3 col-form-label">Property Name</label>
                                    <div class="col-sm-9">
                                        <input class="form-control follow_property" type="text" value="${data.property || ''}">
                                    </div>
                                </div>
                                <div class="form-group row">
                                    <label class="col-sm-3 col-form-label">Description</label>
                                    <div class="col-sm-9">
                                        <input class="form-control follow_description" type="text" value="${data.description || ''}">
                                    </div>
                                </div>
                                <div class="col-sm-12 text-right">
                                    <button type="button" class="btn btn-danger remove-follow-up">Remove</button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>`;

    const submitRow = document.getElementById('add-builder-data').closest('.row');
    submitRow.insertAdjacentHTML('beforebegin', template);
}

/**
 * Load builder details into form fields
 */
async function loadBuilderDetails() {
    try {
        const res = await fetch(`https://loantest.innovatixtechnologies.com/account/example-app/public/api/builder/admin/${id}`, {
            headers: {
                'Authorization': `Bearer ${token}`,
                'Accept': 'application/json'
            }
        });
        const result = await res.json();
        const data = result.data;

        if (data) {
            const mappings = {
                date: data.date, builder_name: data.builder_name, party_name: data.party_name,
                party_mono: data.party_mono, property_name: data.property_name, reference: data.reference,
                party_profile: data.party_profile || 'Salary',
                document: data.document || 'No',
                document_check: data.document_check || 'No',
                bank: data.bank, dropdown: data.dropdown || 'Pending',
                pf: data.pf, rm: data.rm, stemppaper: data.stemppaper, tcvr: data.tcvr,
                c_astiment: data.c_astiment, ework: data.ework, astiment: data.astiment,
                b_astiment: data.b_astiment, vahivat: data.vahivat, loan_fees: data.loan_fees,
            };

            for (const [id, val] of Object.entries(mappings)) {
                const el = document.getElementById(id);
                if (el) el.value = val || '';
            }
        }

    } catch (err) {
        console.error('Error loading builder:', err);
        alert('Could not load builder data.');
    }
}

/**
 * Load and render all follow-up data
 */
async function loadFollowUps() {
    try {
        const res = await fetch(`https://loantest.innovatixtechnologies.com/account/example-app/public/api/builder-follow-up-list-admin/${id}`, {
            headers: {
                "Authorization": `Bearer ${token}`,
                "Accept": "application/json"
            }
        });
        const result = await res.json();
        if (result.message === "Follow-up data fetched successfully" && Array.isArray(result.data)) {
            // Remove default follow-up section if exists
            document.querySelectorAll('.follow-up-section').forEach(s => s.remove());
            result.data.forEach(addFollowUpSection);
        }
    } catch (err) {
        console.error('Error loading follow-ups:', err);
    }
}

/**
 * Handle update form submit
 */
async function handleFormSubmission(e) {
    e.preventDefault();

    // Validate required fields
    const required = ['date', 'builder_name', 'party_name', 'party_mono'];
    const missing = required.filter(id => !document.getElementById(id).value.trim());
    if (missing.length) {
        return alert(`Please fill: ${missing.join(', ')}`);
    }

    // Gather data
    const formData = {
        date: document.getElementById('date').value.trim(),
        builder_name: document.getElementById('builder_name').value.trim(),
        party_name: document.getElementById('party_name').value.trim(),
        party_mono: document.getElementById('party_mono').value.trim(),
        property_name: document.getElementById('property_name').value.trim(),
        reference: document.getElementById('reference').value.trim(),
        party_profile: document.getElementById('party_profile').value || 'Salary',
        document: document.getElementById('document').value || 'No',
        document_check: document.getElementById('document_check').value || 'No',
        bank: document.getElementById('bank').value.trim(),
        dropdown: document.getElementById('dropdown').value || 'Pending',
        pf: document.getElementById('pf').value || '0',
        rm: document.getElementById('rm').value || '0',
        stemppaper: document.getElementById('stemppaper').value || '0',
        tcvr: document.getElementById('tcvr').value || '0',
        c_astiment: document.getElementById('c_astiment').value || '0',
        ework: document.getElementById('ework').value || '0',
        astiment: document.getElementById('astiment').value || '0',
        b_astiment: document.getElementById('b_astiment').value || '0',
        vahivat: document.getElementById('vahivat').value || '0',
        loan_fees: document.getElementById('loan_fees').value || '0',
        follow_up: Array.from(document.querySelectorAll('.follow-up-section')).map(section => ({
            start_date: section.querySelector('.follow_start_date').value,
            end_date: section.querySelector('.follow_end_date').value,
            property: section.querySelector('.follow_property').value,
            description: section.querySelector('.follow_description').value
        }))
    };

    try {
        const res = await fetch(`https://loantest.innovatixtechnologies.com/account/example-app/public/api/builder-edit-admin/${id}`, {
            method: 'PUT',
            headers: {
                'Authorization': `Bearer ${token}`,
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(formData)
        });
        const result = await res.json();
        if (result.status === 200 || result.status === true || res.ok) {
            alert('Builder updated successfully.');
            window.location.href = 'index.html';
        } else {
            throw new Error(result.message || 'Update failed.');
        }
    } catch (err) {
        console.error('Update error:', err);
        alert('Error: ' + err.message);
    }
}
