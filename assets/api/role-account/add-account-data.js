document.addEventListener('DOMContentLoaded', () => {
    const API_BASE_URL = 'https://loantest.innovatixtechnologies.com/account/example-app/public/api';
    const token = localStorage.getItem('token');

    // Redirect to login if no token
    if (!token) {
        window.location.href = '../index.html';
        return;
    }

    const form = document.querySelector('#accountForm'); // Assumes form has id="accountForm"
    const errorContainer = document.querySelector('#errorContainer'); // Assumes <div id="errorContainer">
    const submitBtn = document.querySelector('#accSubmitBtn');
    const cancelBtn = document.querySelector('#cancelAccBtn');

    // Helper to get form field value or empty string
    const getFieldValue = (id) => document.getElementById(id)?.value.trim() || '';

    // Helper to get number or 0
    const getFieldNumber = (id) => parseInt(getFieldValue(id)) || 0;

    // Collect form data
    const getFormData = () => ({
        bank: getFieldValue('bank'),
        file_no: getFieldValue('file_no'),
        date: getFieldValue('date'),
        f_number: getFieldValue('f_number'),
        mo_no: getFieldValue('mo_no'),
        party_name: getFieldValue('party_name'),
        project_name: getFieldValue('project_name'),
        product: getFieldValue('product'),
        bhl_to: getFieldValue('bhl_to'),
        top_up: getFieldNumber('top_up'),
        total_fees: getFieldNumber('total_fees'),
        ap_1: getFieldNumber('ap_1'),
        ap_1_date: getFieldValue('ap_1_date'),
        status: getFieldValue('status'),
        pf: getFieldNumber('pf'),
        pf_parat: getFieldNumber('pf_parat'),
        pf_parat_date: getFieldValue('pf_parat_date'),
        payment_2: getFieldNumber('payment_2'),
        payment_2_date: getFieldValue('payment_2_date'),
        payment_3: getFieldNumber('payment_3'),
        payment_3_date: getFieldValue('payment_3_date'),
        kasar: getFieldNumber('kasar'),
        morgej_parat: getFieldNumber('morgej_parat'),
        morgej_parat_date: getFieldValue('morgej_parat_date'),
        agreement_parat: getFieldValue('agreement_parat'),
        agreement_parat_date: getFieldValue('agreement_parat_date'),
        payout_amount: getFieldNumber('payout_amount'),
        payout_date: getFieldValue('payout_date'),
        payout_remark: getFieldValue('payout_remark'),
        ap_parat: getFieldValue('ap_parat'),
        ap_parat_date: getFieldValue('ap_parat_date'),
        remark_payment: getFieldValue('remark_payment'),
        remark: getFieldValue('remark'),
        remark_1: getFieldValue('remark_1'),
        remark_2: getFieldValue('remark_2'),
        remark_3: getFieldValue('remark_3')
    });

    // Display error message in UI
    const showError = (message) => {
        if (errorContainer) {
            errorContainer.textContent = message;
            errorContainer.style.display = 'block';
        }
    };

    // Clear error message
    const clearError = () => {
        if (errorContainer) {
            errorContainer.textContent = '';
            errorContainer.style.display = 'none';
        }
    };

    // Handle form submission
    const handleSubmit = async (e) => {
        e.preventDefault();
        clearError();

        try {
            const response = await fetch(`${API_BASE_URL}/account-dataper`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                },
                body: JSON.stringify(getFormData())
            });

            const result = await response.json();

            if (response.ok) {
                showAlert('✅ Data submitted successfully');
                window.location.href = 'index.html';
            } else {
                showAlert(result.message || 'Failed to submit data');
            }
        } catch {
            showAlert('Network error occurred. Please try again.');
        }
    };

    // Handle cancel
    const handleCancel = () => {
        window.location.href = 'index.html';
    };

    // Attach event listeners
    submitBtn.addEventListener('click', handleSubmit);
    cancelBtn.addEventListener('click', handleCancel);
});