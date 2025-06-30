const urlParams = new URLSearchParams(window.location.search);
const id = urlParams.get('id');

document.addEventListener('DOMContentLoaded', function () {

    if (!id) {
        showAlert('No ID provided in URL parameters', 'error');
        return;
    }

    const token = localStorage.getItem('token');
    if (!token) {
        showAlert("Please log in again.", "error");
        window.location.href = 'index.html';
        return;
    }

    let followUpCount = 1;

    // Add Follow Up button click handler
    document.querySelector('.btn-outline-primary').addEventListener('click', function (e) {
        e.preventDefault();
        followUpCount++;
        addNewFollowUpSection();
    });

    // Remove Follow Up button handler
    document.addEventListener('click', function (e) {
        if (e.target.classList.contains('remove-follow-up')) {
            e.target.closest('.follow-up-section').remove();
        }
    });

    // Fetch both lead data and follow-ups
    fetchBuilderDetails(id, token);
    fetchFollowUpData(id);

    // Form submission handler
    document.getElementById('add-builder-data').addEventListener('click', handleFormSubmission);
});




// Add follow-up button click handler
function addNewFollowUpSection(data = {}) {
    const newFollowUp = `  
        <div class="row follow-up-section" ${data.id ? `data-followup-id="${data.id}"` : ''}>
            <div class="col-lg-12">
                <div class="card p-5">
                    <div class="card-body">
                        <div class="row justify-content-end">
                            <div class="col-lg-6">
                                <div class="form-group row">
                                    <label class="col-sm-3 col-form-label text-left text-sm-center">Date</label>
                                    <div class="col-sm-9">
                                        <input class="form-control follow_start_date" type="date" value="${data.start_date || ''}">
                                    </div>
                                </div>
                                <div class="form-group row">
                                    <label class="col-sm-3 col-form-label text-left text-sm-center">End Date</label>
                                    <div class="col-sm-9">
                                        <input class="form-control follow_end_date" type="date" value="${data.end_date || ''}">
                                    </div>
                                </div>
                            </div>
                            <div class="col-lg-6">
                                <div class="form-group row">
                                    <label class="col-sm-3 col-form-label text-left text-sm-center">Property Name</label>
                                    <div class="col-sm-9">
                                        <input class="form-control follow_property" type="text" value="${data.property || ''}">
                                    </div>
                                </div>
                                <div class="form-group row">
                                    <label class="col-sm-3 col-form-label text-left text-sm-center">Description</label>
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

    const submitBtn = document.getElementById('add-builder-data');
    submitBtn.closest('.row').insertAdjacentHTML('beforebegin', newFollowUp);
}

async function fetchBuilderDetails(id, token) {
    try {
        // First get list of all builders
        const response = await fetch(`https://loantest.innovatixtechnologies.com/account/example-app/public/api/builder/admin/${id}`, {
            method: 'GET',
            headers: {
                'Authorization': `Bearer ${token}`,
                'Accept': 'application/json'
            }
        });

        const result = await response.json();

        if (result.data) {
            // Find the specific builder by ID
            const builderData = result.data

            if (builderData) {
                // Map all form fields
                const fieldMappings = {
                    date: builderData.date,
                    builder_name: builderData.builder_name,
                    party_name: builderData.party_name,
                    party_mono: builderData.party_mono,
                    property_name: builderData.property_name,
                    reference: builderData.reference,
                    party_profile: builderData.party_profile || 'Salary',
                    document: builderData.document || 'No',
                    document_check: builderData.document_check || 'No',
                    bank: builderData.bank,
                    dropdown: builderData.dropdown || 'Pending',
                    // Cost fields
                    pf: builderData.pf,
                    rm: builderData.rm,
                    stemppaper: builderData.stemppaper,
                    tcvr: builderData.tcvr,
                    c_astiment: builderData.c_astiment,
                    ework: builderData.ework,
                    astiment: builderData.astiment,
                    b_astiment: builderData.b_astiment,
                    vahivat: builderData.vahivat,
                    loan_fees: builderData.loan_fees,
                };

                // Set form values with logging
                Object.entries(fieldMappings).forEach(([fieldId, value]) => {
                    const element = document.getElementById(fieldId);
                    if (element) {
                        element.value = value || '';
                    }
                });
            }
        }
    } catch (error) {
        showAlert('Error fetching builder', 'error');
    }
}

function fetchFollowUpData(id) {
    fetch(`https://loantest.innovatixtechnologies.com/account/example-app/public/api/builder-follow-up-list-admin/${id}`, {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${localStorage.getItem("token")}`,
        },
    })
        .then(response => response.json())
        .then(result => {
            if (result.message === "Follow-up data fetched successfully" && result.data.length > 0) {
                document.querySelectorAll('.follow-up-section').forEach(section => section.remove());
                result.data.forEach(item => addNewFollowUpSection(item));
            }
        })
        .catch(error => {
            showAlert("Error fetching follow-up data", "error");
        });
}

// Handle form submission
async function handleFormSubmission(e) {
    e.preventDefault();

    const token = localStorage.getItem('token');
    if (!token) {
        showAlert("Please log in again.", "error");
        window.location.href = 'index.html';
        return;
    }

    // Validate required fields
    const requiredFields = ['date', 'builder_name', 'party_name', 'party_mono'];
    const missingFields = requiredFields.filter(field => !document.getElementById(field).value.trim());
    if (missingFields.length > 0) {
        showAlert("Please fill all required fields.", "error");
        return;
    }

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
        // Cost data - convert empty to 0
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
        const response = await fetch(`https://loantest.innovatixtechnologies.com/account/example-app/public/api/builder-edit-admin/${id}`, {
            method: 'PUT',  // Changed from POST to PUT
            headers: {
                'Authorization': `Bearer ${token}`,
                'Content-Type': 'application/json',
                'Accept': 'application/json'
            },
            body: JSON.stringify(formData)
        });

        const result = await response.json();

        if (result.status === 200 || result.status === true || response.ok) {
            showAlert("Builder updated successfully", "success");
            setTimeout(() => {
                window.location.href = 'index.html';
            }, 1200);
        } else {
            showAlert('Update failed', 'error');
        }
    } catch (error) {
        showAlert('Error updating builder', 'error');
    }
};

// Load builder details when page loads
document.addEventListener('DOMContentLoaded', fetchBuilderDetails);


document.getElementById("cancelBtn").addEventListener("click", function () {
    window.location.href = "index.html";
});