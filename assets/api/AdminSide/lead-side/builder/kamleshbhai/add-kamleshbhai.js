// ✅ Ensure token exists
const token = localStorage.getItem("token");
if (!token) window.location.href = "../../../index.html";

let followUpCount = 1;

// ✅ Cache selectors
const addFollowUpBtn = document.querySelector('#add-follow-up');
const submitBtn = document.querySelector('.add-builder-data');
const formContainer = submitBtn.closest('.container') || document; // fallback

// ✅ Add follow-up section
addFollowUpBtn.addEventListener('click', (e) => {
    e.preventDefault();
    followUpCount++;

    const followUpHTML = `
        <div class="row follow-up-section">
            <div class="col-lg-12">
                <div class="card p-5">
                    <div class="card-body">
                        <div class="row justify-content-end">
                            <div class="col-lg-6">
                                <div class="form-group row">
                                    <label class="col-sm-3 col-form-label">Date</label>
                                    <div class="col-sm-9">
                                        <input class="form-control follow-start-date" type="date">
                                    </div>
                                </div>
                                <div class="form-group row">
                                    <label class="col-sm-3 col-form-label">End Date</label>
                                    <div class="col-sm-9">
                                        <input class="form-control follow-end-date" type="date">
                                    </div>
                                </div>
                            </div>
                            <div class="col-lg-6">
                                <div class="form-group row">
                                    <label class="col-sm-3 col-form-label">Property Name</label>
                                    <div class="col-sm-9">
                                        <input class="form-control follow-property" type="text">
                                    </div>
                                </div>
                                <div class="form-group row">
                                    <label class="col-sm-3 col-form-label">Description</label>
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
        </div>`;

    // Insert before the submit button row
    submitBtn.closest('.row').insertAdjacentHTML('beforebegin', followUpHTML);
});

// ✅ Remove follow-up section (event delegation)
document.addEventListener('click', (e) => {
    if (e.target.classList.contains('remove-follow-up')) {
        e.target.closest('.follow-up-section').remove();
    }
});

// ✅ Submit form handler
submitBtn.addEventListener('click', async (e) => {
    e.preventDefault();

    // Collect follow-up data
    const followUps = Array.from(document.querySelectorAll('.follow-up-section')).map(section => ({
        start_date: section.querySelector('.follow-start-date')?.value || '  -  ' ,
        end_date: section.querySelector('.follow-end-date')?.value || '  -  ' ,
        property: section.querySelector('.follow-property')?.value || '  -  ' ,
        description: section.querySelector('.follow-description')?.value || '  -  ' 
    }));

    // Collect main form data
    const getVal = id => document.getElementById(id)?.value || '  -  ' ;
    const getNum = id => Number(getVal(id)) || 0;

    const formData = {
        date: getVal("date"),
        party_profile: getVal("party_profile"),
        builder_name: getVal("builder_name"),
        document: getVal("document"),
        party_name: getVal("party_name"),
        party_mono: getVal("party_mono"),
        document_check: getVal("document_check"),
        property_name: getVal("property_name"),
        dropdown: getVal("dropdown"),
        bank: getVal("bank"),
        reference: getVal("reference"),
        pf: getNum("pf"),
        ework: getNum("ework"),
        rm: getNum("rm"),
        astiment: getNum("astiment"),
        stemppaper: getNum("stemppaper"),
        b_astiment: getNum("b_astiment"),
        tcvr: getNum("tcvr"),
        vahivat: getNum("vahivat"),
        c_astiment: getNum("c_astiment"),
        loan_fees: getNum("loan_fees"),
        follow_up: followUps
    };

    console.log("Submitting Form Data:", formData);

    try {
        const response = await fetch("https://loantest.innovatixtechnologies.com/account/example-app/public/api/builder-store1-admin", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`
            },
            body: JSON.stringify(formData)
        });

        const result = await response.json();
        if (response.ok) {
            console.log("✅ Success:", result);
            window.location.href = 'index.html';
        } else {
            console.error("❌ API Error:", result);
            alert("Error: " + (result.message || "Submission failed"));
        }
    } catch (err) {
        console.error("❌ Network Error:", err);
        alert("Network error occurred");
    }
});
