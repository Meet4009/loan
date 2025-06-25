// resetPassword.js
document.addEventListener("DOMContentLoaded", function () {
    document.getElementById("forgotForm").addEventListener("submit", function (e) {
        e.preventDefault(); // Prevent page reload

        const email = document.getElementById("userEmail").value;

        fetch("https://loantest.innovatixtechnologies.com/account/example-app/public/api/forgot-password-direct", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${localStorage.getItem("token")}`,
            },
            body: JSON.stringify({ email: email }),
        })
            .then(res => res.json())
            .then(data => {
                if (data.status) {
                    alert("✅ " + data.message + "\nYour password: " + data.password);
                } else {
                    alert("❌ Email not found");
                }
            })
            .catch(err => {
                console.error("Error:", err);
                alert("❌ Something went wrong");
            });
    });
});