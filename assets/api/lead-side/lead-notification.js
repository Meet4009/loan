// Add custom alert styles and functions
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

// Function to fetch notification data
async function fetchNotificationData(startDate, endDate) {
    try {
        const url = new URL('https://loantest.innovatixtechnologies.com/account/example-app/public/api/form-notification');
        url.searchParams.append('start_date', startDate);
        url.searchParams.append('end_date', endDate);

        const response = await fetch(url, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${localStorage.getItem('token')}`
            }
        });

        const result = await response.json();
        const tbody = document.querySelector('#notification-table tbody');
        tbody.innerHTML = '';

        result.data.forEach((item, index) => {
            const row = document.createElement('tr');
            row.innerHTML = `
                <!-- <td>${index + 1}</td>-->
                <td>${item.follow_up_id}</td>
                <td>${item.source || ''}</td>
                <td>${item.start_date || ''}</td>
                <td>${item.end_date || ''}</td>
                <td>${item.property || ''}</td>
                <td>${item.description || ''}</td>
                <td>
                    <div class="button-items">
                        <button type="button" class="btn btn-outline-success waves-effect waves-light delete-follow-up" data-id="${item.follow_up_id}" data-source="${item.source}">
                            Complete
                        </button>
                    </div>
                </td>
            `;
            tbody.appendChild(row);
        });
        // 🔴 Add click listeners to all delete buttons
        document.querySelectorAll('.delete-follow-up').forEach(button => {
            button.addEventListener('click', () => {
                const id = button.getAttribute('data-id');
                const source = button.getAttribute('data-source').toLowerCase();

                showConfirm("Are you sure you want to Complete this follow up?", () => {
                    fetch(`https://loantest.innovatixtechnologies.com/account/example-app/public/api/delete/${source}/${id}`, {
                        method: 'DELETE',
                        headers: {
                            "Accept": "application/json",
                            "Authorization": `Bearer ${localStorage.getItem('token')}`
                        }
                    })
                        .then(res => res.json())
                        .then(result => {
                            if (result.message === "Follow-up deleted successfully.") {
                                button.closest('tr').remove(); // remove row from UI
                                showAlert("Follow-up completed!", "success");
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
    } catch (error) {
        showAlert('Error fetching notifications', 'error');
    }
}

// Set default dates (current month)
document.addEventListener('DOMContentLoaded', function () {
    const today = new Date();
    const firstDay = new Date(today.getFullYear(), today.getMonth(), 2);
    const lastDay = new Date(today.getFullYear(), today.getMonth() + 1, 1);

    // Format dates for input fields
    const formatDate = (date) => date.toISOString().split('T')[0];

    document.getElementById('nstartDate').value = formatDate(firstDay);
    document.getElementById('nendDate').value = formatDate(lastDay);

    // Fetch data for current month
    fetchNotificationData(formatDate(firstDay), formatDate(lastDay));
});

// Handle filter button click
document.querySelector('.apply-notification-filter').addEventListener('click', function () {
    const startDate = document.getElementById('nstartDate').value;
    const endDate = document.getElementById('nendDate').value;

    if (!startDate || !endDate) {
        return;
    }

    fetchNotificationData(startDate, endDate);
});

