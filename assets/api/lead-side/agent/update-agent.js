const urlParams = new URLSearchParams(window.location.search);
const id = urlParams.get('id');

document.addEventListener('DOMContentLoaded', function () {

    if (!id) {
        showAlert('No ID provided in URL parameters', 'error');
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
    fetchAgentDetails(id, token);
    fetchFollowUpData(id);

    // Form submission handler
    document.getElementById('agent-data-add').addEventListener('click', handleFormSubmission);
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

    const submitBtn = document.getElementById('agent-data-add');
    submitBtn.closest('.row').insertAdjacentHTML('beforebegin', newFollowUp);
}

document.addEventListener('click', function (e) {
    if (e.target.classList.contains('remove-follow-up')) {
        e.target.closest('.follow-up-section').remove();
    }
});

// Fetch agent details
async function fetchAgentDetails(id, token) {
    try {
        const response = await fetch(`https://loantest.innovatixtechnologies.com/account/example-app/public/api/agent/${id}`, {
            method: 'GET',
            headers: {
                'Authorization': `Bearer ${token}`,
                'Accept': 'application/json'
            }
        });

        const result = await response.json();

        if (result.data) {
            const agentData = result.data;
            if (agentData) {
                // Populate form fields with null checks
                document.getElementById('date').value = agentData.date || '';
                document.getElementById('agent_name').value = agentData.agent_name || '';
                document.getElementById('party_name').value = agentData.party_name || '';
                document.getElementById('builder_name').value = agentData.builder_name || '';
                document.getElementById('party_mono').value = agentData.party_mono || '';
                document.getElementById('property_name').value = agentData.property_name || '';
                document.getElementById('reference').value = agentData.reference || '';
                document.getElementById('party_profile').value = agentData.party_profile || 'Salary';
                document.getElementById('document').value = agentData.document || 'No';
                document.getElementById('document_check').value = agentData.document_check || 'No';
                document.getElementById('bank').value = agentData.bank || '';
                document.getElementById('dropdown').value = agentData.dropdown || 'Pending';

                // Cost fields - note the stemp and tcvr field names
                document.getElementById('pf').value = agentData.pf || 0;
                document.getElementById('rm').value = agentData.rm || 0;
                document.getElementById('stemp').value = agentData.stemp || 0;  // API returns stemp
                document.getElementById('tcvr').value = agentData.tcvr || 0;  // API returns tcvr
                document.getElementById('c_astiment').value = agentData.c_astiment || 0;
                document.getElementById('ework').value = agentData.ework || 0;
                document.getElementById('astiment').value = agentData.astiment || 0;
                document.getElementById('b_astiment').value = agentData.b_astiment || 0;
                document.getElementById('vahivat').value = agentData.vahivat || 0;
                document.getElementById('loan_fees').value = agentData.loan_fees || 0;

                // Follow up fields - handle array properly
                if (agentData.follow_up && Array.isArray(agentData.follow_up)) {

                    document.querySelectorAll('.follow-up-section').forEach(section => section.remove());

                    agentData.follow_up.forEach((followUp, index) => {
                        if (index > 0) {
                            document.querySelector('.btn-outline-primary').click(); // Add new follow-up 
                        }

                        const sections = document.querySelectorAll('.follow-up-section');
                        const currentSection = sections[sections.length - 1];


                        if (currentSection) {
                            currentSection.querySelector('.follow_start_date').value = followUp.start_date || '';
                            currentSection.querySelector('.follow_end_date').value = followUp.end_date || '';
                            currentSection.querySelector('.follow_property').value = followUp.property || '';
                            currentSection.querySelector('.follow_description').value = followUp.description || '';
                        }
                    });
                }
                else {
                    const sections = document.querySelectorAll('.follow-up-section');
                    if (sections.length > 0) {
                        document.querySelector('.btn-outline-primary').click();
                    }
                }
            } else {
                showAlert('Agent not found', 'error');
            }
        }
    } catch (error) {
        showAlert('Error fetching agent details', 'error');
    }
}

// Fetch follow-up data
function fetchFollowUpData(id) {
    fetch(`https://loantest.innovatixtechnologies.com/account/example-app/public/api/agent-follow-ups/${id}`, {
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
    const formData = {
        date: document.getElementById('date').value,
        agent_name: document.getElementById('agent_name').value,
        party_name: document.getElementById('party_name').value,
        builder_name: document.getElementById('builder_name').value,
        party_mono: document.getElementById('party_mono').value,
        property_name: document.getElementById('property_name').value,
        reference: document.getElementById('reference').value,
        party_profile: document.getElementById('party_profile').value,
        document: document.getElementById('document').value,
        document_check: document.getElementById('document_check').value,
        bank: document.getElementById('bank').value,
        dropdown: document.getElementById('dropdown').value,
        // Cost fields
        pf: document.getElementById('pf').value,
        rm: document.getElementById('rm').value,
        stemp: document.getElementById('stemp').value,
        tcvr: document.getElementById('tcvr').value,
        c_astiment: document.getElementById('c_astiment').value,
        ework: document.getElementById('ework').value,
        astiment: document.getElementById('astiment').value,
        b_astiment: document.getElementById('b_astiment').value,
        vahivat: document.getElementById('vahivat').value,
        loan_fees: document.getElementById('loan_fees').value,
        // Follow up fields - structure as an array
        follow_up: Array.from(document.querySelectorAll('.follow-up-section')).map(section => ({
            start_date: section.querySelector('.follow_start_date').value,
            end_date: section.querySelector('.follow_end_date').value,
            property: section.querySelector('.follow_property').value,
            description: section.querySelector('.follow_description').value
        }))
    };

    try {
        const response = await fetch(`https://loantest.innovatixtechnologies.com/account/example-app/public/api/agent-edit/${id}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`,
                'Accept': 'application/json'
            },
            body: JSON.stringify(formData)
        });

        const result = await response.json();
        if (response.ok) {
            showAlert('Agent updated successfully', 'success');
            setTimeout(() => {
                window.location.href = 'agent.html';
            }, 1200);
        } else {
            showAlert(result.message || 'Failed to update agent', 'error');
        }
    } catch (error) {
        showAlert('Error updating agent', 'error');
    }
};

// Load agent details when page loads
// document.addEventListener('DOMContentLoaded', fetchAgentDetails);..


document.getElementById("cancelBtn").addEventListener("click", function () {
    window.location.href = "agent.html";
});
