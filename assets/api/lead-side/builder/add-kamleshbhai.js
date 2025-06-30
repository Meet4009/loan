const token = localStorage.getItem("token");
if (!token) {
    showAlert("Please log in again.", "error");
    window.location.href = "index.html"
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
    const submitRow = document.querySelector('.add-builder-data').closest('.row');
    submitRow.insertAdjacentHTML('beforebegin', newFollowUp);
});

document.addEventListener('click', function (e) {
    if (e.target.classList.contains('remove-follow-up')) {
        e.target.closest('.follow-up-section').remove();
    }
});

document.querySelector(".add-builder-data").addEventListener("click", async function (e) {
    e.preventDefault();
    // Collect follow-up data
    const followUpSections = document.querySelectorAll('.follow-up-section');
    const followUps = Array.from(followUpSections).map(section => ({
        start_date: section.querySelector('.follow-start-date').value,
        property: section.querySelector('.follow-property').value,
        end_date: section.querySelector('.follow-end-date').value,
        description: section.querySelector('.follow-description').value
    }));

    // Prepare form data
    const formData = {
        date: document.getElementById("date").value,
        party_profile: document.getElementById("party_profile").value,
        builder_name: document.getElementById("builder_name").value,
        document: document.getElementById("document").value,
        party_name: document.getElementById("party_name").value,
        party_mono: document.getElementById("party_mono").value,
        document_check: document.getElementById("document_check").value,
        property_name: document.getElementById("property_name").value,
        dropdown: document.getElementById("dropdown").value,
        bank: document.getElementById("bank").value,
        reference: document.getElementById("reference").value,

        pf: Number(document.getElementById("pf").value),
        ework: Number(document.getElementById("ework").value),
        rm: Number(document.getElementById("rm").value),
        astiment: Number(document.getElementById("astiment").value),
        stemppaper: Number(document.getElementById("stemppaper").value),
        b_astiment: Number(document.getElementById("b_astiment").value),
        tcvr: Number(document.getElementById("tcvr").value),
        vahivat: Number(document.getElementById("vahivat").value),
        c_astiment: Number(document.getElementById("c_astiment").value),
        loan_fees: Number(document.getElementById("loan_fees").value),

        follow_up: followUps
    };

    try {
        const response = await fetch(" https://loantest.innovatixtechnologies.com/account/example-app/public/api/builder-store1", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`,
            },
            body: JSON.stringify(formData)
        });

        const result = await response.json();
        if (response.ok) {
            showAlert("Data submitted successfully!", "success");
            setTimeout(() => {
                window.location.href = 'kamlesh-bhai.html';
            }, 1000);
        } else {
            showAlert("Error submitting data: ", "error");
        }
    } catch (error) {
        showAlert("Network error occurred", "error");
    }
});


document.getElementById("cancelBtn").addEventListener("click", function () {
    window.location.href = "kamlesh-bhai.html";
});
