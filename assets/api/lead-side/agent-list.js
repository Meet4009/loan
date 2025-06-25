document.addEventListener("DOMContentLoaded", function () {
    fetchAgentList();
});

// check if the user is logged in
if (!localStorage.getItem("token")) {
    // If not logged in, redirect to login page
    window.location.href = "login.html";
}

// Add custom alert styles and function
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

const showConfirm = (message, onYes, onNo) => {
    const modal = document.createElement('div');
    modal.className = 'custom-modal';
    modal.innerHTML = `
        <div style="margin-bottom: 10px;">${message}</div>
        <button class="btn-yes">Yes</button>
        <button class="btn-no">No</button>
    `;
    document.body.appendChild(modal);
    modal.querySelector('.btn-yes').onclick = () => {
        modal.remove();
        if (onYes) onYes();
    };
    modal.querySelector('.btn-no').onclick = () => {
        modal.remove();
        if (onNo) onNo();
    };
};

function fetchAgentList() {
    fetch("https://loantest.innovatixtechnologies.com/account/example-app/public/api/agent-list", {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${localStorage.getItem("token")}`,
        },
    })
        .then(response => response.json())
        .then(result => {

            if (result.message === "Data fetched successfully" && result.data.length > 0) {
                renderAgentList(result.data);
            } else {
                showAlert("No data or unexpected response", "error");
            }
        })
        .catch(error => {
            showAlert("Error fetching agent list", "error");
        });
}

function renderAgentList(data) {
    const tbody = document.querySelector('#agent-list tbody');
    tbody.innerHTML = '';

    data.forEach(agent => {
        const row = `
            <tr>
                <td>${agent.id || ' - '}</td>
                <td>${agent.date || ' - '}</td>
                <td>
                    <div class="button-items">
                        <button type="button" class="btn btn-outline-info btn-icon-circle-sm agent-data-update" data-id="${agent.id}"><i class="fa-solid fa-pen"></i></button>
                        <button type="button" class="btn btn-outline-danger btn-icon-circle-sm agent-data-delete" data-id="${agent.id}"><i class="fa-solid fa-trash"></i></button>
                    </div>
                </td>
                <td>${agent.agent_name || ' - '}</td> 
                <td>${agent.party_name || ' - '}</td>
                <td>${agent.party_mono || ' - '}</td>
                <td>${agent.property_name || ' - '}</td>
                <td>${agent.builder_name || ' - '}</td>
                <td>${agent.reference || ' - '}</td>
                <td>${agent.party_profile || ' - '}</td>
                <td>${agent.document || ' - '}</td>
                <td>${agent.document_check || ' - '}</td>
                <td>${agent.bank || ' - '}</td>
                <td>
                    <div class="button-items">
                        <button type="button" class="btn btn-outline-primary waves-effect waves-light show-cost-btn" data-id="${agent.id}">
                            ${agent.cost.toLocaleString()}
                        </button>
                    </div>
                </td>
                <td>
                    <div class="button-items">
                        <button type="button" class="btn btn-outline-primary waves-effect waves-light show-follow-up-btn" data-id="${agent.id}">
                            ${agent.follow_up.length > 0 ? 'More' : 'None'}
                        </button>
                    </div>
                </td>
                <td>
                            <div class="button-items">
                                ${agent.dropdown === 'Done'
                ? `<button type="button" class="btn btn-outline-success">${agent.dropdown}</button>`
                : agent.dropdown === 'Pending'
                    ? `<button type="button" class="btn btn-outline-primary">${agent.dropdown}</button>`
                    : agent.dropdown === 'Hold'
                        ? `<button type="button" class="btn btn-outline-warning">${agent.dropdown}</button>`
                        : agent.dropdown === 'Reject'
                            ? `<button type="button" class="btn btn-outline-danger">${agent.dropdown}</button>`
                            : `<button type="button" class="btn btn-outline-secondary">${agent.dropdown}</button>`
            }
                            </div>
                        </td>
            </tr>
        `;
        tbody.insertAdjacentHTML('beforeend', row);
    });

    // Add event listeners to edit buttons
    document.querySelectorAll('.agent-data-update').forEach(btn => {
        btn.addEventListener('click', (e) => {
            const id = e.currentTarget.dataset.id;
            window.location.href = `update-agent.html?id=${id}`;
        });
    });

    // 🔴 Add click listeners to all delete buttons
    document.querySelectorAll('.agent-data-delete').forEach(button => {
        button.addEventListener('click', () => {
            const id = button.getAttribute('data-id');

            showConfirm("Are you sure you want to delete this data?", () => {
                fetch(`https://loantest.innovatixtechnologies.com/account/example-app/public/api/agent-delete/${id}`, {
                    method: 'DELETE',
                    headers: {
                        "Accept": "application/json",
                        "Authorization": `Bearer ${localStorage.getItem('token')}`
                    }
                })
                    .then(res => res.json())
                    .then(result => {
                        if (result.message === "Agent and related follow-ups deleted successfully") {
                            button.closest('tr').remove(); // remove row from UI
                            showAlert("Data Deleted successfully", "success");
                        } else {
                            showAlert("Delete failed.", "error");
                        }
                    })
                    .catch(err => {
                        showAlert("Delete error", "error");
                    });
            });
        });
    })

    // 🔴 Add click listeners to all cost buttons
    document.querySelectorAll('.show-cost-btn').forEach(button => {
        button.addEventListener('click', () => {
            const id = button.getAttribute('data-id');
            window.location.href = `../lead-side/agent-cost.html?id=${id}`;
        });
    });
    // 🔴 Add click listeners to all follow-up buttons
    document.querySelectorAll('.show-follow-up-btn').forEach(button => {
        button.addEventListener('click', () => {
            const id = button.getAttribute('data-id');
            window.location.href = `../lead-side/agent-followup.html?id=${id}`;
        });
    });
}

