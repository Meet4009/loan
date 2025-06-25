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

        // Show alert
        setTimeout(() => alertDiv.classList.add('show'), 10);

        // Auto-remove after 3 seconds
        setTimeout(() => {
            alertDiv.classList.remove('show');
            setTimeout(() => alertDiv.remove(), 300);
        }, 3000);
    };

    const form = document.querySelector('#register-tab-pane form');
    form.addEventListener('submit', async (e) => {
        e.preventDefault();

        // Collect form values
        const bodyData = {
            name: document.getElementById('rfullname').value,
            email: document.getElementById('remailid').value,
            password: document.getElementById('rpassword').value,
            mobile_number: document.getElementById('rmobile_number').value,
            role: document.getElementById('rrole').value
        };

        try {
            const response = await fetch('https://loantest.innovatixtechnologies.com/account/example-app/public/api/registration', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(bodyData)
            });

            const result = await response.json();

            if (response.ok) {
                localStorage.setItem('token', result.token);
                document.querySelector('[data-bs-target="#login-tab-pane"]').click();
                form.reset();
                showAlert('Registration successful!', 'success');
            } else {
                showAlert(`Registration failed: ${result.message || 'Unknown error'}`, 'error');
            }
        } catch (error) {
            showAlert(`Network error: ${error.message}`, 'error');
        }
    });
});