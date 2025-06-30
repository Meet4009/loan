document.addEventListener('DOMContentLoaded', function () {

    const urlParams = new URLSearchParams(window.location.search);
    const id = urlParams.get('id');
    if (!id) return;

    const token = localStorage.getItem('token');
    if (!token) {
        showAlert("Please log in again.", "error");
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
                showAlert(`Faild to fatch`, 'error');
                return Promise.reject();
            }
            return response.json();
        })
        .then(response => {
            if (!response || !response.data) {
                showAlert('Invalid data received from server.', 'error');
                return;
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
                        document.getElementById(field).value = data[field] || '';
                    }
                });

            } catch (err) {
                showAlert('Error populating form', 'error');
            }

        })
        .catch(error => {
            showAlert('Error fetching data ', 'error');
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
            formData[field] = document.getElementById(field)?.value || '';
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
                        const backPage = localStorage.getItem("back") || 'index';
                        if (backPage === 'index') {
                            window.location.href = "index.html";
                        }
                        else {
                            window.location.href = `${backPage}.html`;
                        }
                    }, 1000);
                } else {
                    showAlert('Failed to update', 'error');
                }
            })
            .catch(error => {
                showAlert('Error updating data', 'error');
            });
    });

    // Cancel button
    document.getElementById("cancelUpdate").addEventListener("click", function () {
        window.location.href = "index.html";
    });
});
