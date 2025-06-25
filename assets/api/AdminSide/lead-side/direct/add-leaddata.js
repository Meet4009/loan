// Ensure user is authenticated
const token = localStorage.getItem('token');
if (!token) {
    window.location.href = '../../index.html';
}

// Counter for follow-up sections
let followUpCount = 1;

// Cached elements
const addFollowUpBtn = document.querySelector('.btn-outline-primary');
const submitBtn = document.getElementById('submitBtn');

// Template for new follow-up section
const createFollowUpTemplate = (count) => `
    <div class="row follow-up-section">
        <div class="col-lg-12">
            <div class="card p-5">
                <div class="card-body">
                    <div class="row justify-content-end" id="follow-up-${count}">
                        <div class="col-lg-6">
                            <div class="form-group row">
                                <label class="col-sm-2 col-form-label text-right">Date</label>
                                <div class="col-sm-10">
                                    <input class="form-control follow_start_date" type="date">
                                </div>
                            </div>
                            <div class="form-group row">
                                <label class="col-sm-2 col-form-label text-right">End Date</label>
                                <div class="col-sm-10">
                                    <input class="form-control follow_end_date" type="date">
                                </div>
                            </div>
                        </div>
                        <div class="col-lg-6">
                            <div class="form-group row">
                                <label class="col-sm-2 col-form-label text-right">Property Name</label>
                                <div class="col-sm-10">
                                    <input class="form-control follow_property" type="text">
                                </div>
                            </div>
                            <div class="form-group row">
                                <label class="col-sm-2 col-form-label text-right">Description</label>
                                <div class="col-sm-10">
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

// Add follow-up section handler
addFollowUpBtn.addEventListener('click', (e) => {
    e.preventDefault();
    followUpCount++;

    const submitRow = submitBtn.closest('.row');
    submitRow.insertAdjacentHTML('beforebegin', createFollowUpTemplate(followUpCount));
});

// Remove follow-up section (using event delegation)
document.addEventListener('click', (e) => {
    if (e.target.classList.contains('remove-follow-up')) {
        e.target.closest('.follow-up-section').remove();
    }
});

// Collect form data into payload
const buildPayload = () => {
    const followUps = [...document.querySelectorAll('.follow-up-section')].map(section => ({
        start_date: section.querySelector('.follow_start_date')?.value || '',
        end_date: section.querySelector('.follow_end_date')?.value || '',
        property: section.querySelector('.follow_property')?.value || '',
        description: section.querySelector('.follow_description')?.value || ''
    }));

    const getNumber = id => Number(document.getElementById(id)?.value || 0);

    return {
        date: document.getElementById('date')?.value || '',
        party_profile: document.getElementById('party_profile')?.value || '',
        party_name: document.getElementById('party_name')?.value || '',
        document: document.getElementById('document')?.value || '',
        party_mono: document.getElementById('party_mono')?.value || '',
        document_check: document.getElementById('document_check')?.value || '',
        property_name: document.getElementById('property_name')?.value || '',
        builder_name: document.getElementById('builder_name')?.value || '',
        bank: document.getElementById('bank')?.value || '',
        reference: document.getElementById('reference')?.value || '',
        status: document.getElementById('status')?.value || '',
        pf: getNumber('pf'),
        ework: getNumber('ework'),
        rm: getNumber('rm'),
        astiment: getNumber('astiment'),
        stemp: getNumber('stemp'),
        b_astiment: getNumber('b_astiment'),
        tcvr: getNumber('tcvr'),
        vahivat: getNumber('vahivat'),
        c_astiment: getNumber('c_astiment'),
        loan_fees: getNumber('loan_fees'),
        follow_up: followUps
    };
};

// Submit form handler
submitBtn.addEventListener('click', async (e) => {
    e.preventDefault();

    const payload = buildPayload();
    console.log('Submitting:', payload);

    try {
        const response = await fetch('https://loantest.innovatixtechnologies.com/account/example-app/public/api/form-store-admin', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            },
            body: JSON.stringify(payload)
        });

        const result = await response.json();

        if (response.ok) {
            console.log("✅ Saved:", result.data);
            window.location.href = "index.html";
        } else {
            console.error("❌ Failed:", result.message || "Unknown error");
        }
    } catch (err) {
        console.error("❌ Submit error:", err);
    }
});
