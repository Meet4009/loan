// Check for token and redirect if missing
const token = localStorage.getItem('token');
if (!token) {
    window.location.href = '../../index.html';
}

let followUpCount = 1;

// Reusable function to create a follow-up section
function createFollowUpSection() {
    return `
    <div class="row follow-up-section">
        <div class="col-lg-12">
            <div class="card p-5">
                <div class="card-body">
                    <div class="row justify-content-end">
                        <div class="col-lg-6">
                            <div class="form-group row">
                                <label class="col-sm-3 col-form-label text-left text-sm-center">Date</label>
                                <div class="col-sm-9">
                                    <input class="form-control follow-start-date" type="date">
                                </div>
                            </div>
                            <div class="form-group row">
                                <label class="col-sm-3 col-form-label text-left text-sm-center">End Date</label>
                                <div class="col-sm-9">
                                    <input class="form-control follow-end-date" type="date">
                                </div>
                            </div>
                        </div>
                        <div class="col-lg-6">
                            <div class="form-group row">
                                <label class="col-sm-3 col-form-label text-left text-sm-center">Property Name</label>
                                <div class="col-sm-9">
                                    <input class="form-control follow-property" type="text">
                                </div>
                            </div>
                            <div class="form-group row">
                                <label class="col-sm-3 col-form-label text-left text-sm-center">Description</label>
                                <div class="col-sm-9">
                                    <input class="form-control follow-description" type="text">
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
}

// Handle add follow-up click
document.querySelector('#add-follow-up').addEventListener('click', function (e) {
    e.preventDefault();
    followUpCount++;

    const newFollowUp = createFollowUpSection();

    const submitRow = document.querySelector('#Agent-data-add').closest('.row');
    submitRow.insertAdjacentHTML('beforebegin', newFollowUp);
});

// Handle dynamic remove button clicks
document.addEventListener('click', function (e) {
    if (e.target.classList.contains('remove-follow-up')) {
        e.target.closest('.follow-up-section').remove();
    }
});

// Gather main form field value safely
function getFieldValue(id) {
    const el = document.getElementById(id);
    return el ? el.value.trim() : '';
}

// Gather numeric field safely (returns 0 if empty)
function getNumericValue(id) {
    return Number(getFieldValue(id)) || 0;
}

// Handle form submit
document.querySelector('#Agent-data-add').addEventListener('click', async function (e) {
    e.preventDefault();

    // Gather all follow-ups
    const followUps = Array.from(document.querySelectorAll('.follow-up-section')).map(section => ({
        start_date: section.querySelector('.follow-start-date').value,
        end_date: section.querySelector('.follow-end-date').value,
        property: section.querySelector('.follow-property').value,
        description: section.querySelector('.follow-description').value
    }));

    // Prepare payload
    const data = {
        date: getFieldValue("date"),
        party_profile: getFieldValue("party_profile"),
        agent_name: getFieldValue("agent_name"),
        party_name: getFieldValue("party_name"),
        builder_name: getFieldValue("builder_name"),
        document: getFieldValue("document"),
        document_check: getFieldValue("document_check"),
        party_mono: getFieldValue("party_mono"),
        bank: getFieldValue("bank"),
        property_name: getFieldValue("property_name"),
        dropdown: getFieldValue("dropdown"),
        reference: getFieldValue("reference"),
        pf: getNumericValue("pf"),
        rm: getNumericValue("rm"),
        stemp: getNumericValue("stamp"),
        tcvr: getNumericValue("tcrvr"),
        vahivat: getNumericValue("vahivat"),
        ework: getNumericValue("ework"),
        astiment: getNumericValue("astiment"),
        b_astiment: getNumericValue("b_astiment"),
        c_astiment: getNumericValue("c_astiment"),
        loan_fees: getNumericValue("loan_fees"),
        follow_up: followUps
    };

    console.log("📤 Submitting data:", data);

    try {
        const response = await fetch("https://loantest.innovatixtechnologies.com/account/example-app/public/api/agent-insert-admin", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${token}`
            },
            body: JSON.stringify(data)
        });

        const result = await response.json();

        if (response.ok) {
            console.log("✅ Data submitted successfully:", result);
            window.location.href = "index.html";
        } else {
            console.error("❌ API Error:", result.message);
            alert(`Error: ${result.message}`);
        }

    } catch (err) {
        console.error("❌ Network Error:", err);
        alert("Network error, please try again.");
    }
});
