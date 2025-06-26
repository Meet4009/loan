document.addEventListener("DOMContentLoaded", () => {


    const token = localStorage.getItem('token');
    if (!token) {
        window.location.href = '../index.html';
        return;
    }

    const baseUrl = 'https://loantest.innovatixtechnologies.com/account/example-app/public/api';

    // Handle account submission
    const accSubmitBtn = document.querySelector('#accSubmitBtn');
    if (accSubmitBtn) {
        accSubmitBtn.addEventListener('click', async e => {
            e.preventDefault();

            const bodyData = {
                bank: document.getElementById('bank')?.value || '',
                file_no: document.getElementById('file_no')?.value || '',
                date: document.getElementById('date')?.value || '',
                f_number: document.getElementById('f_number')?.value || '',
                mo_no: document.getElementById('mo_no')?.value || '',
                party_name: document.getElementById('party_name')?.value || '',
                project_name: document.getElementById('project_name')?.value || '',
                product: document.getElementById('product')?.value || '',
                bhl_to: document.getElementById('bhl_to')?.value || 0,
                top_up: parseInt(document.getElementById('top_up')?.value) || 0,
                total_fees: parseInt(document.getElementById('total_fees')?.value) || 0,
                ap_1: parseInt(document.getElementById('ap_1')?.value) || 0,
                remark_payment: document.getElementById('remark_payment')?.value || '',
                ap_1_date: document.getElementById('ap_1_date')?.value || '',
                status: document.getElementById('status')?.value || '',
                pf: parseInt(document.getElementById('pf')?.value) || 0,
                remark: document.getElementById('remark')?.value || '',
                pf_parat: parseInt(document.getElementById('pf_parat')?.value) || 0,
                pf_parat_date: document.getElementById('pf_parat_date')?.value || '',
                payment_2: parseInt(document.getElementById('payment_2')?.value) || 0,
                payment_2_date: document.getElementById('payment_2_date')?.value || '',
                payment_3: parseInt(document.getElementById('payment_3')?.value) || 0,
                payment_3_date: document.getElementById('payment_3_date')?.value || '',
                kasar: parseInt(document.getElementById('kasar')?.value) || 0,
                morgej_parat: parseInt(document.getElementById('morgej_parat')?.value) || 0,
                morgej_parat_date: document.getElementById('morgej_parat_date')?.value || '',
                agreement_parat: document.getElementById('agreement_parat')?.value || '',
                agreement_parat_date: document.getElementById('agreement_parat_date')?.value || '',
                payout_amount: parseInt(document.getElementById('payout_amount')?.value) || 0,
                payout_date: document.getElementById('payout_date')?.value || '',
                payout_remark: document.getElementById('payout_remark')?.value || '',
                ap_parat: document.getElementById('ap_parat')?.value || '',
                ap_parat_date: document.getElementById('ap_parat_date')?.value || '',
                remark_1: document.getElementById('remark_1')?.value || '',
                remark_2: document.getElementById('remark_2')?.value || '',
                remark_3: document.getElementById('remark_3')?.value || ''
            };

            try {
                const response = await fetch(`${baseUrl}/account-data`, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `Bearer ${token}`
                    },
                    body: JSON.stringify(bodyData)
                });

                const result = await response.json();
                if (response.ok) {
                    showAlert('✅ Account created successfully!', 'success');
                    setTimeout(() => {
                        window.location.href = 'index.html';
                    }, 1200);
                } else {
                    throw new Error(result.message || 'Failed to create account');
                }
            } catch (error) {
                showAlert(`❌ Error creating account: ${error.message}`, 'error');
            }
        });
    }

    // Handle cancel button
    const cancelAccBtn = document.getElementById('cancelAccBtn');
    if (cancelAccBtn) {
        cancelAccBtn.addEventListener('click', () => {
            window.location.href = 'index.html';
        });
    }
});