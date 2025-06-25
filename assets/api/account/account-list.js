document.addEventListener("DOMContentLoaded", () => {
    // Add CSS for custom alerts
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

    // Function to show custom alert
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

    const token = localStorage.getItem('token');
    if (!token) {
        window.location.href = '../index.html';
        return;
    }

    const tbody = document.querySelector('#tech-companies-1 tbody');
    const baseUrl = 'https://loantest.innovatixtechnologies.com/account/example-app/public/api/';

    // Fetch Account List Data
    fetch(`${baseUrl}account-list`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
        }
    })
        .then(response => response.json().then(data => ({ response, data })))
        .then(({ response, data }) => {
            if (!response.ok) {
                throw new Error(data.message || 'Failed to fetch accounts');
            }
            tbody.innerHTML = '';
            data.data.forEach(item => {
                const statusButton = {
                    completed: '<button type="button" class="btn btn-outline-success">completed</button>',
                    pending: '<button type="button" class="btn btn-outline-primary">pending</button>',
                    processing: '<button type="button" class="btn btn-outline-warning">processing</button>',
                    reject: '<button type="button" class="btn btn-outline-danger">reject</button>'
                }[item.status] || `<button type="button" class="btn btn-outline-secondary">${item.status || '-'}</button>`;

                tbody.innerHTML += `
                    <tr>
                        <td>${item.bank || '-'}</td>
                        <td>${item.file_no || '-'}</td>
                        <td>${item.date || '-'}</td>
                        <td>
                            <div class="button-items">
                                <button type="button" class="btn btn-outline-info btn-icon-circle-sm update-btn" data-id="${item.id}"><i class="fa-solid fa-pen"></i></button>
                                <button type="button" class="btn btn-outline-danger btn-icon-circle-sm delete-btn" data-id="${item.id}"><i class="fa-solid fa-trash"></i></button>
                            </div>
                        </td>
                        <td>${item.f_number || '-'}</td>
                        <td>${item.mo_no || '-'}</td>
                        <td>${item.party_name || '-'}</td>
                        <td>${item.project_name || '-'}</td>
                        <td>${item.product || '-'}</td>
                        <td>${item.bhl_to || '-'}</td>
                        <td>${item.top_up || '-'}</td>
                        <td>${item.total || '-'}</td>
                        <td>${item.total_fees || '-'}</td>
                        <td>${item.ap_1 || '-'}</td>
                        <td>${item.ap_1_date || '-'}</td>
                        <td><div class="button-items">${statusButton}</div></td>
                        <td>${item.pf || '-'}</td>
                        <td>${item.pf_parat || '-'}</td>
                        <td>${item.pf_parat_date || '-'}</td>
                        <td>${item.remark || '-'}</td>
                        <td>${item.remark_payment || '-'}</td>
                        <td>${item.payment_2 || '-'}</td>
                        <td>${item.payment_2_date || '-'}</td>
                        <td>${item.payment_3 || '-'}</td>
                        <td>${item.payment_3_date || '-'}</td>
                        <td>${item.kasar || '-'}</td>
                        <td>${item.payment_baki || '-'}</td>
                        <td>${item.morgej_parat || '-'}</td>
                        <td>${item.morgej_parat_date || '-'}</td>
                        <td>${item.m_cal || '-'}</td>
                        <td>${item.m_diff || '-'}</td>
                        <td>${item.stamp || '-'}</td>
                        <td>${item.agreement_parat || '-'}</td>
                        <td>${item.agreement_parat_date || '-'}</td>
                        <td>${item.payout_date || '-'}</td>
                        <td>${item.payout_amount || '-'}</td>
                        <td>${item.payout_remark || '-'}</td>
                        <td>${item.ap_parat || '-'}</td>
                        <td>${item.ap_parat_date || '-'}</td>
                        <td>${item.remark_1 || '-'}</td>
                        <td>${item.remark_2 || '-'}</td>
                        <td>${item.remark_3 || '-'}</td>
                    </tr>
                `;
            });

            // Event delegation for update and delete buttons
            tbody.addEventListener('click', e => {
                const button = e.target.closest('button');
                if (!button) return;
                const id = button.dataset.id;

                if (button.classList.contains('update-btn')) {
                    window.location.href = `update-account.html?id=${id}`;
                } else if (button.classList.contains('delete-btn')) {
                    const modal = document.createElement('div');
                    modal.className = 'custom-modal';
                    modal.innerHTML = `
                        <p>Are you sure you want to delete this item?</p>
                        <button class="btn-yes">Yes</button>
                        <button class="btn-no">No</button>
                    `;
                    document.body.appendChild(modal);

                    modal.querySelector('.btn-yes').addEventListener('click', () => {
                        fetch(`${baseUrl}account-delete/${id}`, {
                            method: 'DELETE',
                            headers: {
                                'Content-Type': 'application/json',
                                'Authorization': `Bearer ${token}`
                            }
                        })
                            .then(response => response.json().then(data => ({ response, data })))
                            .then(({ response, data }) => {
                                if (response.ok) {
                                    showAlert('✅ Account deleted successfully!', 'success');
                                    window.location.reload();
                                } else {
                                    throw new Error(data.message || 'Failed to delete account');
                                }
                            })
                            .catch(error => showAlert(`Error deleting account: ${error.message}`, 'error'));
                        modal.remove();
                    });

                    modal.querySelector('.btn-no').addEventListener('click', () => modal.remove());
                }
            });
        })
        .catch(error => showAlert(`Failed to load accounts: ${error.message}`, 'error'));
});