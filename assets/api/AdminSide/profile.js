//  get profile 
document.addEventListener("DOMContentLoaded", async function () {
    const token = localStorage.getItem('token'); // 🔁 Replace with your actual Bearer token
    if (!token) {
        window.location.href = "../index.html"; // Redirect to login page
        return;
    }

    try {
        const response = await fetch("https://loantest.innovatixtechnologies.com/account/example-app/public/api/admin-profile", {
            method: "GET",
            headers: {
                "Authorization": `Bearer ${token}`
            }
        });

        const result = await response.json();
        // console.log(result.admin[0].email);

        if (response.ok && result.status) {
            const username = result.admin[0].email.split('@')[0];
            const userEmail = result.admin[0].email


            // Update DOM elements
            document.getElementById("username1").textContent = username;
            document.getElementById("username2").textContent = username;
            document.getElementById("user-email").textContent = userEmail;

            // document.getElementById("detail-name").textContent = user.name;
            // document.getElementById("detail-email").textContent = userEmail;
            // document.getElementById("detail-mobile").textContent = user.mobile_number;
        } else {
            console.error(result);
        }
    } catch (error) {
        console.error("Error fetching profile data:", error);
    }
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
            // ✅ Optional: Clear token from localStorage or cookies if stored
            localStorage.removeItem("token");
            // ✅ Redirect to login page
            window.location.href = "index.html"; // 🔁 Change to your login page path
        } else {
            console.error(result);
        }
    } catch (error) {
        console.error(error);
    }
});

