// Login form submission handler
document.addEventListener("DOMContentLoaded", function () {
    document.querySelector('#login-tab-pane form').addEventListener('submit', async function (e) {
        e.preventDefault(); // Prevent page reload

        // Get values from form

        const email = document.getElementById('email_id').value;
        const password = document.getElementById('password').value;

        // Basic validation
        // if (!email || !password || !role || role === "Select your role") {
        //     alert("⚠️ Please fill in all fields.");
        //     return;
        // }

        // Build API URL with query params
        const url = `https://loantest.innovatixtechnologies.com/account/example-app/public/api/login?email=${encodeURIComponent(email)}&password=${encodeURIComponent(password)}`;

        try {
            const res = await fetch(url, {
                method: 'GET'
            });

            const data = await res.json();

            if (res.ok) {
                // Optional: Save token
                localStorage.setItem('token', data.token);
                window.location.href = '../admin-side/account-side/index.html';  // Direct admin redirect
            } else {
                showAlert(`Login failed: ${data.message || 'Invalid credentials'}`, 'error');
            }
        } catch (err) {
            showAlert('Login failed ', "error");
        }
    });
});

// reset password
document.getElementById("forgotForm").addEventListener("submit", function (e) {
    e.preventDefault(); // Prevent page reload

    const email = document.getElementById("userEmail").value;

    fetch("https://loantest.innovatixtechnologies.com/account/example-app/public/api/forgot-password-direct", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${localStorage.getItem("token")}`
        },
        body: JSON.stringify({ email: email })
    })
        .then(res => res.json())
        .then(data => {
            if (data.status) {
                showAlert("" + data.message + "\nYour password: " + data.password, "success");
            } else {
                showAlert("Email not found", "error");
            }
        })
        .catch(err => {
            showAlert("Something went wrong", "error");
        });
});

// Logout functionality
document.getElementById("logout-btn").addEventListener("click", async function () {
    const token = localStorage.getItem("token"); // 🔁 Replace with your actual Bearer token

    try {
        const response = await fetch("https://loantest.innovatixtechnologies.com/account/example-app/public/api/logout", {
            method: "POST",
            headers: {
                "Authorization": `Bearer ${token}`
            }
        });

        const result = await response.json();

        if (response.ok) {
            // Optional: Clear token from localStorage or cookies if stored
            localStorage.removeItem("token");
            // Redirect to login page
            window.location.href = "index.html"; // 🔁 Change to your login page path
        } else {
            showAlert(result.message || "Logout failed", "error");
        }
    } catch (error) {
        showAlert("Logout error", "error");
    }
});