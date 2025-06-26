// ✅ Add custom alert CSS and showAlert function
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

// ✅ Token check and redirect
const token = localStorage.getItem("token");
if (!token) {
    window.location.href = "../index.html";
}

document.addEventListener('DOMContentLoaded', function () {
    // Set default dates to current month
    const today = new Date();
    const firstDay = new Date(today.getFullYear(), today.getMonth(), 2);
    const lastDay = new Date(today.getFullYear(), today.getMonth() + 1, 1);

    const formatDate = (date) => {
        return date.toISOString().split('T')[0];
    };

    document.getElementById('startDate').value = formatDate(firstDay);
    document.getElementById('endDate').value = formatDate(lastDay);

    // Fetch data for current month automatically
    fetchMonthlyReport(formatDate(firstDay), formatDate(lastDay));
});

function fetchMonthlyReport(startDate, endDate) {
    const url = new URL('https://loantest.innovatixtechnologies.com/account/example-app/public/api/monthly-report');
    url.searchParams.append('start_date', startDate);
    url.searchParams.append('end_date', endDate);

    fetch(url, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
        }
    })
        .then(res => res.json())
        .then(result => {
            const tbody = document.querySelector('#monthly-report tbody');
            tbody.innerHTML = '';
            const data = result.data || [];

            data.forEach(item => {
                const row = document.createElement('tr');
                row.innerHTML = `
                <td>${item.bank || ''}</td>
                <td>${item.file_no || ''}</td>
                <td>${item.date || ''}</td>
                <td>
                    <div class="button-items">
                        <button type="button" class="btn btn-outline-info btn-icon-circle-sm update-btn" data-id="${item.id}"><i class="fa-solid fa-pen"></i></button>
                        <button type="button" class="btn btn-outline-danger btn-icon-circle-sm delete-btn" data-id="${item.id}"><i class="fa-solid fa-trash"></i></button>
                    </div>
                </td>
                <td>${item.f_number || ''}</td>
                <td>${item.mo_no || ''}</td>
                <td>${item.party_name || ''}</td>
                <td>${item.project_name || ''}</td>
                <td>${item.product || ''}</td>
                <td>${item.bhl_to || ''}</td>
                <td>${item.top_up || ''}</td>
                <td>${item.total || ''}</td>
                <td>${item.total_fees || ''}</td>
                <td>${item.ap_1 || ''}</td>
                <td>${item.ap_1_date || ''}</td>
                <td>
                    <div class="button-items">
                        ${item.status === 'completed'
                        ? `<button type="button" class="btn btn-outline-success">${item.status}</button>`
                        : item.status === 'pending'
                            ? `<button type="button" class="btn btn-outline-primary">${item.status}</button>`
                            : item.status === 'processing'
                                ? `<button type="button" class="btn btn-outline-warning">${item.status}</button>`
                                : item.status === 'reject'
                                    ? `<button type="button" class="btn btn-outline-danger">${item.status}</button>`
                                    : `<button type="button" class="btn btn-outline-secondary">${item.status}</button>`}
                    </div>
                </td>
                <td>${item.pf || ''}</td>
                <td>${item.pf_parat || ''}</td>
                <td>${item.pf_parat_date || ''}</td>
                <td>${item.remark || ''}</td>
                <td>${item.remark_payment || ''}</td>
                <td>${item.payment_2 || ''}</td>
                <td>${item.payment_2_date || ''}</td>
                <td>${item.payment_3 || ''}</td>
                <td>${item.payment_3_date || ''}</td>
                <td>${item.kasar || ''}</td>
                <td>${item.payment_baki || ''}</td>
                <td>${item.morgej_parat || ''}</td>
                <td>${item.morgej_parat_date || ''}</td>
                <td>${item.m_cal || ''}</td>
                <td>${item.m_diff || ''}</td>
                <td>${item.stamp || ''}</td>
                <td>${item.agreement_parat || ''}</td>
                <td>${item.agreement_parat_date || ''}</td>
                <td>${item.payout_date || ''}</td>
                <td>${item.payout_amount || ''}</td>
                <td>${item.payout_remark || ''}</td>
                <td>${item.ap_parat || ''}</td>
                <td>${item.ap_parat_date || ''}</td>
                <td>${item.remark_1 || ''}</td>
                <td>${item.remark_2 || ''}</td>
                <td>${item.remark_3 || ''}</td>
            `;
                tbody.appendChild(row);
            });

            // ✅ Delete button with custom confirmation and alert
            document.querySelectorAll('.delete-btn').forEach(button => {
                button.addEventListener('click', () => {
                    const id = button.getAttribute('data-id');

                    showConfirm("Are you sure you want to delete this data?", () => {
                        fetch(`https://loantest.innovatixtechnologies.com/account/example-app/public/api/account-delete/${id}`, {
                            method: 'DELETE',
                            headers: {
                                "Accept": "application/json",
                                "Authorization": `Bearer ${token}`
                            }
                        })
                            .then(response => {
                                if (!response.ok) throw new Error("Network response was not OK");
                                return response.json();
                            })
                            .then(result => {
                                showAlert('Data deleted successfully!', 'success');
                                setTimeout(() => window.location.reload(), 1000);
                            })
                            .catch(error => {
                                showAlert(`Error deleting data: ${error.message}`, 'error');
                            });
                    });
                });
            });

            // ✅ Update button
            document.querySelectorAll('.update-btn').forEach(button => {
                button.addEventListener('click', () => {
                    const id = button.getAttribute('data-id');
                    window.location.href = `update-account.html?id=${id}`;
                });
            });

        })
        .catch(error => {
            showAlert(`Error loading report: ${error.message}`, 'error');
        });
}

// ✅ Search button click handler
document.querySelector('.apply-filter').addEventListener('click', function () {
    const startDate = document.getElementById('startDate').value;
    const endDate = document.getElementById('endDate').value;
    fetchMonthlyReport(startDate, endDate);
});
