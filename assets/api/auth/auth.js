// Registration form submission handler
document.addEventListener("DOMContentLoaded", function () {

    const roleSelect = document.getElementById('role');
    const existingRoles = Array.from(roleSelect.options);

    // fetch roles from the roles list API
    fetch('https://loantest.innovatixtechnologies.com/account/example-app/public/api/role-list', {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
        }
    })
        .then(response => response.json())
        .then(response => {
            
            const newRoles = response.data.filter(item =>
                !existingRoles.includes(item.name.toLowerCase())
            );

            // Add new roles that don't already exist
            newRoles.forEach(item => {
                roleSelect.add(new Option(item.name, item.name));
            });
        })
        .catch(error => {
            console.error('Error loading roles:', error)
        })


    document.querySelector('#register-tab-pane form').addEventListener('submit', async function (e) {
        e.preventDefault(); // prevent default form submission

        // Collect form values
        const name = document.getElementById('rfullname').value;
        const email = document.getElementById('remailid').value;
        const password = document.getElementById('rpassword').value;
        const mobile_number = document.getElementById('rmobile_number').value;
        const role = document.getElementById('rrole').value;


        // Prepare the data for API
        const bodyData = {
            name,
            email,
            password,
            mobile_number,
            role
        };

        try {
            const response = await fetch('https://loantest.innovatixtechnologies.com/account/example-app/public/api/registration', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    // Add other headers if needed
                },
                body: JSON.stringify(bodyData)
            });

            const result = await response.json();

            if (response.ok) {
                localStorage.setItem('token', result.token);
                // After successful registration, switch to login tab
                document.querySelector('[data-bs-target="#login-tab-pane"]').click();
                // Optional: Clear registration form
                e.target.reset();
            } else {
                alert('❌ Registration failed: ' + (result.message || 'Unknown error'));
            }
        } catch (error) {
            alert('❌ Network error: ' + error.message);
            console.error('Error:', error);
        }
    });
});

// Login form submission handler
document.addEventListener("DOMContentLoaded", function () {
    document.querySelector('#login-tab-pane form').addEventListener('submit', async function (e) {
        e.preventDefault(); // Prevent page reload

        // Get values from form

        const email = document.getElementById('email_id').value;
        const password = document.getElementById('password').value;
        const role = document.getElementById('role').value;

        // Build API URL with query params
        const url = `https://loantest.innovatixtechnologies.com/account/example-app/public/api/multi-login?email=${encodeURIComponent(email)}&password=${encodeURIComponent(password)}&role=${encodeURIComponent(role)}`;

        try {
            const res = await fetch(url, {
                method: 'GET',
            });

            const data = await res.json();

            if (res.ok) {
                // Optional: Save token
                localStorage.setItem('token', data.token);

                // Optional: Redirect after login
                if (data.user.role === 'account') {
                    window.location.href = '../account-side/index.html';
                } else if (data.user.role === 'login') {
                    window.location.href = '../login-side/index.html';
                } else if (data.user.role === 'lead') {
                    window.location.href = '../lead-side/index.html';
                } else {
                    window.location.href = '../account-side/index.html'; // Default fallback
                }
            } else {
                alert(`❌ Login failed: ${data.message || 'Invalid credentials'}`);
            }
        } catch (err) {
            alert('❌ Network error: ' + err.message);
            console.error(err);
        }
    });
});
