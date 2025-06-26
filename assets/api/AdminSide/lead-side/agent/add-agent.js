const token = localStorage.getItem("token");
if (!token) {
    window.location.href = "index.html" // Redirect to login page
}

let followUpCount = 1;
document.querySelector('#add-follow-up').addEventListener('click', function (e) {
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

    // Insert the new follow-up section before the submit buttons
    const submitRow = document.querySelector('#Agent-data-add').closest('.row');
    submitRow.insertAdjacentHTML('beforebegin', newFollowUp);
});

document.addEventListener('click', function (e) {
    if (e.target.classList.contains('remove-follow-up')) {
        e.target.closest('.follow-up-section').remove();
    }
});


document.querySelector('#Agent-data-add').addEventListener('click', async function (e) {
    e.preventDefault();

    // Get all follow-up sections
    const followUpSections = document.querySelectorAll('.follow-up-section');
    const followUps = Array.from(followUpSections).map(section => ({
        start_date: section.querySelector('.follow-start-date').value,
        property: section.querySelector('.follow-property').value,
        end_date: section.querySelector('.follow-end-date').value,
        description: section.querySelector('.follow-description').value
    }));

    const data = {
        date: document.getElementById("date").value,
        party_profile: document.getElementById("party_profile").value,
        agent_name: document.getElementById("agent_name").value,
        party_name: document.getElementById("party_name").value,
        builder_name: document.getElementById("builder_name").value,
        document: document.getElementById("document").value,
        document_check: document.getElementById("document_check").value,
        party_mono: document.getElementById("party_mono").value,
        bank: document.getElementById("bank").value,
        property_name: document.getElementById("property_name").value,
        dropdown: document.getElementById("dropdown").value,
        reference: document.getElementById("reference").value,
        pf: Number(document.getElementById("pf").value),
        rm: Number(document.getElementById("rm").value),
        stemp: Number(document.getElementById("stamp").value),
        tcvr: Number(document.getElementById("tcrvr").value),
        vahivat: Number(document.getElementById("vahivat").value),
        ework: Number(document.getElementById("ework").value),
        astiment: Number(document.getElementById("astiment").value),
        b_astiment: Number(document.getElementById("b_astiment").value),
        c_astiment: Number(document.getElementById("c_astiment").value),
        loan_fees: Number(document.getElementById("loan_fees").value),
        follow_up: followUps
    };
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
            showAlert("✅ Agent added successfully", "success");
            setTimeout(() => {

                window.location.href = "index.html"; // Redirect to agent list page
            }, 1200);
        } else {
            showAlert(result.message || "An error occurred.", "error");
        }
    } catch (err) {
        showAlert("❌ Network error", "error");
    }
});

// Handle cancel button
document.getElementById("cancelBtn").addEventListener("click", function () {
    window.location.href = "index.html";
});



