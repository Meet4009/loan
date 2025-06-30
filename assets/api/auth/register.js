document.addEventListener("DOMContentLoaded", () => {

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
                showAlert(`Registration failed 'Unknown error'}`, 'error');
            }
        } catch (error) {
            showAlert(`Network error`, 'error');
        }
    });
});