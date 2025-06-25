document.addEventListener('DOMContentLoaded', function () {
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

    const urlParams = new URLSearchParams(window.location.search);
    const id = urlParams.get('id');
    if (!id) return;

    const token = localStorage.getItem('token');
    if (!token) {
        window.location.href = "../index.html";
        return;
    }

    // Fetch existing data
    fetch(`https://loantest.innovatixtechnologies.com/account/example-app/public/api/account/${id}`, {
        method: 'GET',
        headers: {
            'Authorization': `Bearer ${token}`,
            'Accept': 'application/json'
        }
    })
        .then(response => {
            if (!response.ok) {
                showAlert(`Error: HTTP ${response.status}`, 'error');
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            return response.json();
        })
        .then(response => {
            if (!response || !response.data) {
                showAlert('Invalid data received from server.', 'error');
                throw new Error('Invalid data structure received');
            }

            const data = response.data;

            try {
                if (data.bank) {
                    const bankSelect = document.getElementById("bank");
                    Array.from(bankSelect.options).forEach(option => {
                        if (option.text === data.bank) {
                            bankSelect.value = option.value;
                        }
                    });
                }

                const fields = [
                    "file_no", "date", "f_number", "mo_no", "party_name", "project_name", "product",
                    "bhl_to", "top_up", "total", "total_fees", "ap_1", "remark_payment", "ap_1_date",
                    "status", "pf", "remark", "pf_parat", "pf_parat_date", "payment_2", "payment_2_date",
                    "payment_3", "payment_3_date", "kasar", "payment_baki", "morgej_parat",
                    "morgej_parat_date", "m_cal", "m_diff", "stamp", "agreement_parat",
                    "agreement_parat_date", "payout_amount", "payout_date", "payout_remark",
                    "ap_parat", "ap_parat_date", "remark_1", "remark_2", "remark_3"
                ];

                fields.forEach(field => {
                    if (document.getElementById(field)) {
                        document.getElementById(field).value = data[field] || '  -  ' ;
                    }
                });

            } catch (err) {
                showAlert(`Error populating form: ${err.message}`, 'error');
            }

        })
        .catch(error => {
            showAlert(`Error fetching data: ${error.message}`, 'error');
        });

    // Handle form submission
    document.getElementById('updateAccData').addEventListener('click', function (e) {
        e.preventDefault();

        const formData = { id };
        [
            "bank", "file_no", "date", "f_number", "mo_no", "party_name", "project_name", "product",
            "bhl_to", "top_up", "total", "total_fees", "ap_1", "remark_payment", "ap_1_date",
            "status", "pf", "remark", "pf_parat", "pf_parat_date", "payment_2", "payment_2_date",
            "payment_3", "payment_3_date", "kasar", "payment_baki", "morgej_parat",
            "morgej_parat_date", "agreement_parat", "agreement_parat_date", "m_cal", "m_diff",
            "stamp", "payout_amount", "payout_date", "payout_remark", "ap_parat", "ap_parat_date",
            "remark_1", "remark_2", "remark_3"
        ].forEach(field => {
            formData[field] = document.getElementById(field)?.value || '  -  ' ;
        });

        fetch(`https://loantest.innovatixtechnologies.com/account/example-app/public/api/account-edit/${id}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`,
                'Accept': 'application/json'
            },
            body: JSON.stringify(formData)
        })
            .then(response => response.json())
            .then(data => {
                if (data.message === 'Data updated successfully') {
                    showAlert('Data updated successfully!', 'success');
                    setTimeout(() => {
                        window.history.back();
                    }, 1000);
                } else {
                    showAlert(`Failed to update: ${data.message || 'Unknown error'}`, 'error');
                }
            })
            .catch(error => {
                showAlert(`Error updating data: ${error.message}`, 'error');
            });
    });

    // Cancel button
    document.getElementById("cancelUpdate").addEventListener("click", function () {
        window.location.href = "index.html";
    });
});
