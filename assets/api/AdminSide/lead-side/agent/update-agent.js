const urlParams = new URLSearchParams(window.location.search);
const id = urlParams.get('id');
const token = localStorage.getItem('token');

document.addEventListener('DOMContentLoaded', async () => {
    if (!id) {
        console.error('No ID provided in URL parameters');
        return;
    }

    if (!token) {
        window.location.href = '../../index.html';
        return;
    }

    // Attach Add Follow-Up handler
    document.querySelector('.btn-outline-primary').addEventListener('click', (e) => {
        e.preventDefault();
        addFollowUpSection();
    });

    // Delegate remove follow-up handler
    document.addEventListener('click', (e) => {
        if (e.target.closest('.remove-follow-up')) {
            e.target.closest('.follow-up-section').remove();
        }
    });

    // Attach form submit handler
    document.getElementById('agent-data-add').addEventListener('click', handleFormSubmission);

    // Fetch data in parallel
    await Promise.all([
        loadAgentDetails(),
        loadFollowUps()
    ]);
});

/** Add a follow-up section. If `data` is given, prefill values. */
function addFollowUpSection(data = {}) {
    const html = `
        <div class="row follow-up-section">
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
        </div>
    `;
    const submitRow = document.getElementById('agent-data-add').closest('.row');
    submitRow.insertAdjacentHTML('beforebegin', html);
}

/** Load agent details and fill form fields */
async function loadAgentDetails() {
    try {
        const res = await fetch(`https://loantest.innovatixtechnologies.com/account/example-app/public/api/agent/admin/${id}`, {
            headers: { 'Authorization': `Bearer ${token}` }
        });
        const { data } = await res.json();
        if (!data) throw new Error('Agent not found');

        // Fill basic fields
        [
            'date', 'agent_name', 'party_name', 'builder_name',
            'party_mono', 'property_name', 'reference',
            'party_profile', 'document', 'document_check',
            'bank', 'dropdown',
            'pf', 'rm', 'stemp', 'tcvr',
            'c_astiment', 'ework', 'astiment', 'b_astiment',
            'vahivat', 'loan_fees'
        ].forEach(id => {
            if (document.getElementById(id)) {
                document.getElementById(id).value = data[id] || (['pf', 'rm', 'stemp', 'tcvr', 'c_astiment', 'ework', 'astiment', 'b_astiment', 'vahivat', 'loan_fees'].includes(id) ? 0 : '');
            }
        });

    } catch (err) {
        console.error('Failed to load agent details:', err);
        alert(err.message);
    }
}

/** Load follow-up sections from API and render them */
async function loadFollowUps() {
    try {
        const res = await fetch(`https://loantest.innovatixtechnologies.com/account/example-app/public/api/agent-follow-ups/admin/${id}`, {
            headers: { 'Authorization': `Bearer ${token}` }
        });
        const { data } = await res.json();
        if (Array.isArray(data) && data.length) {
            // Clear any existing follow-ups
            document.querySelectorAll('.follow-up-section').forEach(el => el.remove());
            // Add each
            data.forEach(item => addFollowUpSection(item));
        }
    } catch (err) {
        console.error('Failed to load follow-ups:', err);
    }
}

/** Handle form submission and PUT update */
async function handleFormSubmission(e) {
    e.preventDefault();
    const formData = {
        date: getVal('date'),
        agent_name: getVal('agent_name'),
        party_name: getVal('party_name'),
        builder_name: getVal('builder_name'),
        party_mono: getVal('party_mono'),
        property_name: getVal('property_name'),
        reference: getVal('reference'),
        party_profile: getVal('party_profile'),
        document: getVal('document'),
        document_check: getVal('document_check'),
        bank: getVal('bank'),
        dropdown: getVal('dropdown'),
        pf: getVal('pf'), rm: getVal('rm'),
        stemp: getVal('stemp'), tcvr: getVal('tcvr'),
        c_astiment: getVal('c_astiment'), ework: getVal('ework'),
        astiment: getVal('astiment'), b_astiment: getVal('b_astiment'),
        vahivat: getVal('vahivat'), loan_fees: getVal('loan_fees'),
        follow_up: Array.from(document.querySelectorAll('.follow-up-section')).map(section => ({
            start_date: section.querySelector('.follow_start_date').value,
            end_date: section.querySelector('.follow_end_date').value,
            property: section.querySelector('.follow_property').value,
            description: section.querySelector('.follow_description').value
        }))
    };

    try {
        const res = await fetch(`https://loantest.innovatixtechnologies.com/account/example-app/public/api/agent-edit-admin/${id}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            },
            body: JSON.stringify(formData)
        });
        const result = await res.json();
        if (res.ok) {
            alert('Agent updated successfully');
            window.location.href = 'index.html';
        } else {
            throw new Error(result.message || 'Failed to update agent');
        }
    } catch (err) {
        console.error('Update error:', err);
        alert(err.message);
    }
}

function getVal(id) {
    return document.getElementById(id)?.value || '';
}
