document.addEventListener("DOMContentLoaded", () => {
    const token = localStorage.getItem('token');
    if (!token) {
        showAlert("Please log in again.", "error");
        window.location.href = '../index.html';
        return;
    }

    const baseUrl = 'https://loantest.innovatixtechnologies.com/account/example-app/public/api/';
    const fileInput = document.getElementById('fileUpload');
    const submitBtn = document.getElementById('submitCsv');
    const cancelBtn = document.getElementById('cancelCsv');

    // Handle CSV submission
    if (submitBtn && fileInput) {
        submitBtn.addEventListener('click', async () => {
            const file = fileInput.files[0];
            if (!file) {
                showAlert('Please select a CSV file before submitting.', 'error');
                return;
            }

            const formData = new FormData();
            formData.append('csv_file', file);

            try {
                const response = await fetch(`${baseUrl}import-csv/admin`, {
                    method: 'POST',
                    headers: {
                        'Authorization': `Bearer ${token}`
                    },
                    body: formData
                });

                const data = await response.json();
                if (response.ok) {
                    showAlert(`${data.message || 'CSV uploaded successfully!'}`, 'success');
                    setTimeout(() => {
                        window.location.href = 'index.html';
                    }, 1200);
                } else {
                    const errorMsg = data.errors?.length > 0 ? data.errors.join(', ') : data.message || 'Unknown error';
                    showAlert('Upload failed', 'error');
                }
            } catch (error) {
                showAlert('Upload failed: ', 'error');
            }
        });
    }

    // Handle cancel button
    if (cancelBtn) {
        cancelBtn.addEventListener('click', () => {
            window.location.href = 'index.html';
        });
    }
});