const urlParams = new URLSearchParams(window.location.search);
const id = urlParams.get('id');

document.addEventListener('DOMContentLoaded', function () {

    if (!id) {
        console.error('No ID provided in URL parameters');
        return;
    }

    const token = localStorage.getItem('token');
    if (!token) {
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
    fetchLeadData(id, token);
    fetchFollowUpData(id);

    // Form submission handler
    document.getElementById('direct-data-add').addEventListener('click', handleFormSubmission);
});

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

    const submitBtn = document.getElementById('direct-data-add');
    submitBtn.closest('.row').insertAdjacentHTML('beforebegin', newFollowUp);
}

function fetchLeadData(id, token) {
    fetch(`https://loantest.innovatixtechnologies.com/account/example-app/public/api/formdata/admin/${id}`, {
        method: 'GET',
        headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json'
        }
    })
        .then(response => response.json())
        .then(result => {
            if (result.message === "Form data fetched successfully") {
                populateFormData(result.data);
            } else {
                console.error("Failed to fetch form data");
            }
        })
        .catch(error => {
            console.error("Error:", error);
        });
}

function fetchFollowUpData(id) {
    fetch(`https://loantest.innovatixtechnologies.com/account/example-app/public/api/follow-up-list/admin/${id}`, {
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
            console.error("Error fetching follow-up data:", error);
        });
}

function populateFormData(data) {
    const fields = [
        'date', 'party_name', 'party_mono', 'property_name', 'builder_name', 'reference',
        'party_profile', 'document', 'document_check', 'bank', 'status',
        'pf', 'rm', 'stemp', 'tcvr', 'c_astiment', 'ework', 'astiment',
        'b_astiment', 'vahivat', 'loan_fees'
    ];

    fields.forEach(field => {
        const element = document.getElementById(field);
        if (element) element.value = data[field] || '';
    });
}

async function handleFormSubmission(e) {
    e.preventDefault();

    const getFieldValue = (id) => {
        const element = document.getElementById(id);
        return element ? element.value || '' : '';
    };

    const getNumericValue = (id) => {
        const value = getFieldValue(id);
        return value || '0';
    };

    // DEBUG: Check how many follow-up sections exist
    const followUpSections = document.querySelectorAll('.follow-up-section');

    const followUps = Array.from(followUpSections).map((section, index) => {

        const startDateEl = section.querySelector('.follow_start_date');
        const endDateEl = section.querySelector('.follow_end_date');
        const propertyEl = section.querySelector('.follow_property');
        const descriptionEl = section.querySelector('.follow_description');

        const followUp = {
            start_date: startDateEl ? startDateEl.value : '',
            end_date: endDateEl ? endDateEl.value : '',
            property: propertyEl ? propertyEl.value : '',
            description: descriptionEl ? descriptionEl.value : ''
        };

        // Only include id if it exists (for existing follow-ups)
        const followUpId = section.dataset.followupId;
        if (followUpId) {
            followUp.id = followUpId;
        }

        return followUp;
    });


    const updateData = {
        date: getFieldValue('date'),
        party_name: getFieldValue('party_name'),
        party_mono: getFieldValue('party_mono'),
        property_name: getFieldValue('property_name'),
        builder_name: getFieldValue('builder_name'),
        reference: getFieldValue('reference'),
        party_profile: getFieldValue('party_profile'),
        document: getFieldValue('document'),
        document_check: getFieldValue('document_check'),
        bank: getFieldValue('bank'),
        status: getFieldValue('status'),
        pf: getNumericValue('pf'),
        rm: getNumericValue('rm'),
        stemp: getNumericValue('stemp'),
        tcvr: getNumericValue('tcvr'),
        c_astiment: getNumericValue('c_astiment'),
        ework: getNumericValue('ework'),
        astiment: getNumericValue('astiment'),
        b_astiment: getNumericValue('b_astiment'),
        vahivat: getNumericValue('vahivat'),
        loan_fees: getNumericValue('loan_fees'),
        follow_up: followUps
    };


    if (!updateData.date || !updateData.party_name || !updateData.party_mono || !updateData.property_name) {
        showAlert('Please fill all required fields', 'error');
        return;
    }

    try {
        const apiUrl = `https://loantest.innovatixtechnologies.com/account/example-app/public/api/form-update/admin/${id}`;

        const formResponse = await fetch(apiUrl, {
            method: 'PUT',
            headers: {
                'Authorization': `Bearer ${localStorage.getItem('token')}`,
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(updateData)
        });

        const result = await formResponse.json();

        if (formResponse.ok || result.status === true) {
            showAlert('Data updated successfully!', 'success');
            setTimeout(() => {
                window.location.href = 'index.html';
            }, 1200);
        } else {
            showAlert(result.message || 'Update failed', 'error');
        }
    } catch (error) {
        showAlert('Error updating lead: ' + error.message, 'error');
    }
}

// Handle cancel button
document.getElementById("cancelBtn").addEventListener("click", function () {
    window.location.href = "index.html";
});