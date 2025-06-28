document.addEventListener("DOMContentLoaded", () => {

    const roleSelect = document.getElementById('role');
    const existingRoles = Array.from(roleSelect.options).map(option => option.value.toLowerCase());

    // Fetch roles from API
    fetch('https://loantest.innovatixtechnologies.com/account/example-app/public/api/role-list', {
        method: 'GET',
        headers: { 'Content-Type': 'application/json' }
    })
        .then(response => response.json())
        .then(response => {
            const newRoles = response.data.filter(item => !existingRoles.includes(item.name.toLowerCase()));
            newRoles.forEach(item => roleSelect.add(new Option(item.name, item.name)));
        })
        .catch(error => showAlert(`Failed to load roles: ${error.message}`, 'error'));

    // Handle login form submission
    const form = document.querySelector('#login-tab-pane form');
    form.addEventListener('submit', async (e) => {
        e.preventDefault();

        const email = document.getElementById('email_id').value;
        const password = document.getElementById('password').value;
        const role = document.getElementById('role').value;

        const isSpecialRole = ['account', 'login', 'lead'].includes(role);
        const baseUrl = 'https://loantest.innovatixtechnologies.com/account/example-app/public/api/';
        const endpoint = isSpecialRole ? 'multi-login' : 'user-login';
        const url = `${baseUrl}${endpoint}?email=${encodeURIComponent(email)}&password=${encodeURIComponent(password)}&role=${encodeURIComponent(role)}`;

        try {
            const res = await fetch(url, {
                method: 'GET',
                headers: { 'Content-Type': 'application/json' }
            });

            const data = await res.json();

            if (res.ok) {
                localStorage.setItem('token', data.token);
                localStorage.setItem('userRole', data.user.role);

                if (isSpecialRole) {
                    const redirects = {
                        account: '../account-side/index.html',
                        login: '../login-side/index.html',
                        lead: '../lead-side/index.html'
                    };
                    window.location.href = redirects[data.user.role] || '../account-side/index.html';
                } else {
                    window.location.href = '../role-account/index.html';
                }
                showAlert('✅ Login successful!', 'success');
            } else {
                showAlert(`Login failed: ${data.message || 'Invalid credentials'}`, 'error');
            }
        } catch (error) {
            showAlert(`Network error: ${error.message}`, 'error');
        }
    });
});