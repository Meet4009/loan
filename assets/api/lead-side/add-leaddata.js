let followUpCount = 1;

document.querySelector('.btn-outline-primary').addEventListener('click', function (e) {
    e.preventDefault();
    followUpCount++;

    const newFollowUp = `  
    <div class="row follow-up-section">
        <div class="col-lg-12">
            <div class="card p-5">
                <div class="card-body">
                    <div class="row justify-content-end" id="follow-up-${followUpCount}">
                        <div class="col-lg-6">
                            <div class="form-group row">
                                <label class="col-sm-3 col-form-label text-left text-sm-center">Date</label>
                                <div class="col-sm-9">
                                    <input class="form-control follow_start_date" type="date">
                                </div>
                            </div>
                            <div class="form-group row">
                                <label class="col-sm-3 col-form-label text-left text-sm-center">End Date</label>
                                <div class="col-sm-9">
                                    <input class="form-control follow_end_date" type="date">
                                </div>
                            </div>
                        </div>
                        <div class="col-lg-6">
                            <div class="form-group row">
                                <label class="col-sm-3 col-form-label text-left text-sm-center">Property Name</label>
                                <div class="col-sm-9">
                                    <input class="form-control follow_property" type="text">
                                </div>
                            </div>
                            <div class="form-group row">
                                <label class="col-sm-3 col-form-label text-left text-sm-center">Description</label>
                                <div class="col-sm-9">
                                    <input class="form-control follow_description" type="text">
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

    // Insert the new follow-up section before the submit buttons
    const submitRow = document.querySelector('#submitBtn').closest('.row');
    submitRow.insertAdjacentHTML('beforebegin', newFollowUp);
});

document.addEventListener('click', function (e) {
    if (e.target.classList.contains('remove-follow-up')) {
        e.target.closest('.follow-up-section').remove();
    }
});

// Add CSS for custom alerts and modal
const style = document.createElement('style');
style.textContent = `
    .custom-alert {
        position: fixed;
        top: 20px;
        left: 50%;
        transform: translateX(-50%) translateY(-10px);
        z-index: 1000;
        padding: 15px 20px;
        border-radius: 5px;
        min-width: 200px;
        max-width: 300px;
        color: white;
        font-family: Arial, sans-serif;
        font-size: 14px;
        box-shadow: 0 2px 5px rgba(0,0,0,0.2);
        opacity: 0;
        transition: opacity 0.3s ease, transform 0.3s ease;
    }
    .custom-alert.show {
        opacity: 1;
        transform: translateX(-50%) translateY(0);
    }
    .custom-alert.success {
        background-color: #28a745;
    }
    .custom-alert.error {
        background-color: #dc3545;
    }
    .custom-modal {
        position: fixed;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        background: white;
        padding: 20px;
        border-radius: 5px;
        z-index: 2000;
        box-shadow: 0 4px 8px rgba(0,0,0,0.2);
        text-align: center;
        max-width: 300px;
    }
    .custom-modal button {
        margin: 10px;
        padding: 8px 16px;
        border: none;
        border-radius: 3px;
        cursor: pointer;
        color: white;
    }
    .custom-modal .btn-yes {
        background: #dc3545;
    }
    .custom-modal .btn-no {
        background: #6c757d;
    }
`;
document.head.appendChild(style);

const showAlert = (message, type = 'error') => {
    const alertDiv = document.createElement('div');
    alertDiv.className = `custom-alert ${type}`;
    alertDiv.textContent = message;
    document.body.appendChild(alertDiv);
    setTimeout(() => alertDiv.classList.add('show'), 10);
    setTimeout(() => {
        alertDiv.classList.remove('show');
        setTimeout(() => alertDiv.remove(), 300);
    }, 3000);
};

document.getElementById('submitBtn').addEventListener('click', async function (e) {
    e.preventDefault();

    // Get all follow-up sections
    const followUpSections = document.querySelectorAll('.follow-up-section');
    const followUps = Array.from(followUpSections).map(section => ({
        start_date: section.querySelector('.follow_start_date').value,
        property: section.querySelector('.follow_property').value,
        end_date: section.querySelector('.follow_end_date').value,
        description: section.querySelector('.follow_description').value
    }));

    const payload = {
        date: document.getElementById('date').value,
        party_profile: document.getElementById('party_profile').value,
        party_name: document.getElementById('party_name').value,
        document: document.getElementById('document').value,
        party_mono: document.getElementById('party_mono').value,
        document_check: document.getElementById('document_check').value,
        property_name: document.getElementById('property_name').value,
        builder_name: document.getElementById('builder_name').value,
        bank: document.getElementById('bank').value,
        reference: document.getElementById('reference').value,
        status: document.getElementById('status').value,
        pf: Number(document.getElementById('pf').value || 0),
        ework: Number(document.getElementById('ework').value || 0),
        rm: Number(document.getElementById('rm').value || 0),
        astiment: Number(document.getElementById('astiment').value || 0),
        stemp: Number(document.getElementById('stemp').value || 0),
        b_astiment: Number(document.getElementById('b_astiment').value || 0),
        tcvr: Number(document.getElementById('tcvr').value || 0),
        vahivat: Number(document.getElementById('vahivat').value || 0),
        c_astiment: Number(document.getElementById('c_astiment').value || 0),
        loan_fees: Number(document.getElementById('loan_fees').value || 0),
        follow_up: followUps
    };

    try {
        const response = await fetch('https://loantest.innovatixtechnologies.com/account/example-app/public/api/form-store', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${localStorage.getItem('token')}`
            },
            body: JSON.stringify(payload)
        });
        const result = await response.json();

        if (response.ok) {
            showAlert("Data saved successfully!", "success");
            setTimeout(() => {
                window.location.href = "index.html";
            }, 1200);
        } else {
            showAlert(result.message || "❌ Failed to insert.", "error");
        }
    } catch (err) {
        showAlert("❌ Error occurred while submitting data.", "error");
    }
});

// Handle cancel button
document.getElementById("cancelBtn").addEventListener("click", function () {
    window.location.href = "index.html";
});

