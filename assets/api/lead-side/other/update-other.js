const urlParams = new URLSearchParams(window.location.search);
const otherId = urlParams.get('id');

document.addEventListener('DOMContentLoaded', function () {
    if (!otherId) {
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
    fetchOtherData(otherId, token);
    fetchFollowUpData(otherId);

    // Form submission handler
    document.getElementById('other-data-add').addEventListener('click', handleFormSubmission);
});

// Add this after the existing data fetching code
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

    const submitBtn = document.getElementById('other-data-add');
    submitBtn.closest('.row').insertAdjacentHTML('beforebegin', newFollowUp);
}


document.addEventListener('click', function (e) {
    if (e.target.classList.contains('remove-follow-up')) {
        e.target.closest('.follow-up-section').remove();
    }
});

// Fetch existing other data
function fetchOtherData(id) {
    fetch(`https://loantest.innovatixtechnologies.com/account/example-app/public/api/other/show/${id}`, {
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${localStorage.getItem('token')}`
        }
    })
        .then(response => response.json())
        .then(data => {
            if (data.data) {
                const formData = data.data;
                // Populate form fields
                document.getElementById('date').value = formData.date;
                document.getElementById('party_name').value = formData.party_name;
                document.getElementById('party_mono').value = formData.party_mono;
                document.getElementById('property_name').value = formData.property_name;
                document.getElementById('builder_name').value = formData.property_name;
                document.getElementById('reference').value = formData.reference;
                document.getElementById('party_profile').value = formData.party_profile;
                document.getElementById('document').value = formData.document;
                document.getElementById('document_check').value = formData.document_check;
                document.getElementById('bank').value = formData.bank;
                document.getElementById('dropdown').value = formData.dropdown;

                // Cost fields
                document.getElementById('pf').value = formData.pf;
                document.getElementById('rm').value = formData.rm;
                document.getElementById('stemppaper').value = formData.stemppaper;
                document.getElementById('tcrvr').value = formData.tcvr;
                document.getElementById('c_astiment').value = formData.c_astiment;
                document.getElementById('ework').value = formData.ework;
                document.getElementById('astiment').value = formData.astiment;
                document.getElementById('b_astiment').value = formData.b_astiment;
                document.getElementById('vahivat').value = formData.vahivat;
                document.getElementById('loan_fees').value = formData.loan_fees;
            }
        })
        .catch(error => showAlert('Error fetching data', 'error'));
}

function fetchFollowUpData(id) {
    fetch(`https://loantest.innovatixtechnologies.com/account/example-app/public/api/otherfollowup-list/${id}`, {
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


// Update other data
async function handleFormSubmission(e) {
    e.preventDefault();

    // Validate token
    const token = localStorage.getItem('token');
    if (!token) {
        showAlert("Please log in again.", "error");
        window.location.href = 'other.html';
        return;
    }

    // Validate required fields
    const requiredFields = ['date', 'party_name', 'party_mono', 'property_name'];
    const missingFields = requiredFields.filter(field => !document.getElementById(field).value.trim());

    if (missingFields.length > 0) {
        showAlert(`Please fill in all required fields: ${missingFields.join(', ')}`, 'error');
        return;
    }

    const formData = {
        date: document.getElementById('date').value.trim(),
        party_name: document.getElementById('party_name').value.trim(),
        party_mono: document.getElementById('party_mono').value.trim(),
        property_name: document.getElementById('property_name').value.trim(),
        builder_name: document.getElementById('builder_name').value.trim(),
        reference: document.getElementById('reference').value.trim(),
        party_profile: document.getElementById('party_profile').value || 'Salary',
        document: document.getElementById('document').value || 'No',
        document_check: document.getElementById('document_check').value || 'No',
        bank: document.getElementById('bank').value.trim(),
        dropdown: document.getElementById('dropdown').value,
        // Convert empty numeric fields to 0
        pf: document.getElementById('pf').value || '0',
        rm: document.getElementById('rm').value || '0',
        stemppaper: document.getElementById('stemppaper').value || '0',
        tcvr: document.getElementById('tcrvr').value || '0',
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
        const response = await fetch(
            `https://loantest.innovatixtechnologies.com/account/example-app/public/api/other/${otherId}`,
            {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`,
                    'Accept': 'application/json'
                },
                body: JSON.stringify(formData)
            }
        );

        const data = await response.json();

        if (!response.ok) {
            showAlert('Update failed', 'error');
            return;
        }

        showAlert("Other Data Updated Successfully", "success");
        setTimeout(() => {
            window.location.href = 'other.html';
        }, 1000);
    } catch (error) {
        showAlert('Error updating other data', 'error');
    }
};

// Load data when page loads
document.addEventListener('DOMContentLoaded', fetchOtherData);

document.getElementById("cancelBtn").addEventListener("click", function () {
    window.location.href = "other.html";
});
