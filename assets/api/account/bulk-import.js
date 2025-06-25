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
                const response = await fetch(`${baseUrl}import-csv`, {
                    method: 'POST',
                    headers: {
                        'Authorization': `Bearer ${token}`  
                    },
                    body: formData
                });

                const data = await response.json();
                if (response.ok) {
                    showAlert(`✅ ${data.message || 'CSV uploaded successfully!'}`, 'success');
                    setTimeout(() => {
                        window.location.href = 'index.html';
                    }, 1200);
                } else {
                    const errorMsg = data.errors?.length > 0 ? data.errors.join(', ') : data.message || 'Unknown error';
                    throw new Error(errorMsg);
                }
            } catch (error) {
                showAlert(`Upload failed: ${error.message}`, 'error');
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