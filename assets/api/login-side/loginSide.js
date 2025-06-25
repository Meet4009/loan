// --- Custom Alert & Modal ---
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

// Custom confirm modal
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
// --- End Custom Alert & Modal ---

const token = localStorage.getItem("token");
if (!token) {
    window.location.href = "../index.html"; // Redirect if no token
}
document.addEventListener("DOMContentLoaded", function () {
    fetch("https://loantest.innovatixtechnologies.com/account/example-app/public/api/loginside-list", {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${localStorage.getItem("token")}`
        }
    })
        .then(response => response.json())
        .then(result => {
            const data = result.data;

            const tableBody = document.querySelector("#tech-companies-1 tbody");

            data.forEach((item, index) => {
                const row = document.createElement("tr");

                row.innerHTML = `
                <td>${item.id || index + 1}</td>
                <td>${item.date || " - "}</td>
                <td>${item.party_name || " - "}</td>
                <td>${item.property_name || " - "}</td>
                <td>    
                    <div class="button-items">
                        <button type="button" class="btn btn-outline-info btn-icon-circle-sm update-login-list-btn" data-id="${item.id}"><i class="fa-solid fa-pen"></i></button>
                        <button type="button" class="btn btn-outline-danger btn-icon-circle-sm delete-login-list-btn" data-id="${item.id}"><i class="fa-solid fa-trash"></i></button>
                    </div>
                </td>
                <td>${item.area || " - "}</td>
                <td>${item.mo_no || " - "}</td>
                <td>${item.company_number || " - "}</td>
                <td>${item.product || " - "}</td>
                <td>${item.loan || " - "}</td>
                <td>${item.docu || " - "}</td>
                <td>${item.chaque || " - "}</td>
                <td>${item.ap || " - "}</td>
                <td>${item.st || " - "}</td>
                <td>${item.hi || " - "}</td>
                <td>${item.b || " - "}</td>
                <td>${item.tcr_vr || " - "}</td>
                <td>${item.fi || " - "}</td>
                <td>${item.submit || " - "}</td>
                <td>${item.mitesh || " - "}</td>
                <td>${item.book || " - "}</td>
                <td>${item.hg || " - "}</td>
                <td>${item.remark || " - "}</td>
                <td>${item.hed || " - "}</td>
                <td>${item.refrence || " - "}</td>
                <td>${item.builder_name || " - "}</td>
                <td>${item.rlf || " - "}</td>
                <td>${item.session == 1 ? "Yes" : "No" || " - "}</td>
            `;
                tableBody.appendChild(row);
            });

            // Add click listeners to all delete buttons
            document.querySelectorAll('.delete-login-list-btn').forEach(button => {
                button.addEventListener('click', () => {
                    const id = button.getAttribute('data-id');
                    showConfirm("Are you sure you want to delete this data?", () => {
                        fetch(`https://loantest.innovatixtechnologies.com/account/example-app/public/api/loginside-delete/${id}`, {
                            method: 'DELETE',
                            headers: {
                                "Accept": "application/json",
                                "Authorization": `Bearer ${localStorage.getItem('token')}`
                            }
                        })
                            .then(response => {
                                if (response.ok) {
                                    showAlert("Data deleted successfully!", "success");
                                    setTimeout(() => window.location.reload(), 1200);
                                } else {
                                    showAlert("Failed to delete data.", "error");
                                }
                            })
                            .catch(() => {
                                showAlert("❌ Error deleting data.", "error");
                            });
                    });
                });
            });
            // update button functionality
            document.querySelectorAll('.update-login-list-btn').forEach(button => {
                button.addEventListener('click', () => {
                    const id = button.getAttribute('data-id');
                    window.location.href = `../login-side/update-login.html?id=${id}`;
                });
            });

        })
        .catch(() => {
            showAlert("Error fetching data.", "error");
        });
});