//  get profile 
document.addEventListener("DOMContentLoaded", async function () {
    const token = localStorage.getItem('token'); // 🔁 Replace with your actual Bearer token
    if (!token) {
        window.location.href = "../index.html"; // Redirect to login page
        return;
    }

    try {
        const response = await fetch("https://loantest.innovatixtechnologies.com/account/example-app/public/api/profile", {
            method: "GET",
            headers: {
                "Authorization": `Bearer ${token}`
            }
        });

        const result = await response.json();

        if (response.ok && result.status) {
            const user = result.user;

            // Update DOM elements
            document.getElementById("user-name").textContent = user.name;
            document.getElementById("user-email").textContent = user.email;

            document.getElementById("detail-name").textContent = user.name;
            document.getElementById("detail-email").textContent = user.email;
            document.getElementById("detail-mobile").textContent = user.mobile_number;
        } else {
            console.error(result);
        }
    } catch (error) {
        console.error("Error fetching profile data:", error);
    }
});

document.addEventListener('DOMContentLoaded', function () {
    // Edit button click handler
    document.getElementById('edit-profile-btn').addEventListener('click', function () {
        // Get current user data from displayed profile
        const name = document.getElementById('detail-name').textContent.trim();
        const email = document.getElementById('detail-email').textContent.trim();
        const mobile = document.getElementById('detail-mobile').textContent.trim();

        // Pre-populate form fields
        document.getElementById('ufullName').value = name !== 'N/A' ? name : '';
        document.getElementById('uemail').value = email !== 'N/A' ? email : '';
        document.getElementById('umobile').value = mobile !== 'N/A' ? mobile : '';

    });
});

// Function to load profile data
async function loadProfileData() {
    const token = localStorage.getItem('token');
    try {
        const response = await fetch("https://loantest.innovatixtechnologies.com/account/example-app/public/api/profile", {
            method: "GET",
            headers: {
                "Authorization": `Bearer ${token}`
            }
        });

        const result = await response.json();

        if (response.ok && result.status) {
            const user = result.user;
            document.getElementById("user-name").textContent = user.name;
            document.getElementById("user-email").textContent = user.email;
            document.getElementById("detail-name").textContent = user.name;
            document.getElementById("detail-email").textContent = user.email;
            document.getElementById("detail-mobile").textContent = user.mobile_number;
        }
    } catch (error) {
        console.error("Error loading profile:", error);
    }
}

// Update profile functionality
document.getElementById("updateProfileForm").addEventListener("submit", async function (e) {
    e.preventDefault();

    const token = localStorage.getItem("token");
    const name = document.getElementById("ufullName").value;
    const email = document.getElementById("uemail").value;
    const mobile = document.getElementById("umobile").value;

    const bodyData = {
        name,
        email,
        mobile_number: mobile
    };

    try {
        const response = await fetch("https://loantest.innovatixtechnologies.com/account/example-app/public/api/update-profile", {
            method: "PUT",
            headers: {
                "Authorization": `Bearer ${token}`,
                "Content-Type": "application/json"
            },
            body: JSON.stringify(bodyData)
        });

        const result = await response.json();

        if (response.ok) {
            // Reload profile data after successful update
            await loadProfileData();
            $('#updateProfileModal').modal('hide');
            console.log("Profile updated successfully!");
            window.location.reload(); // Reload the page to reflect changes
        } else {
            console.log("❌ Failed to update: " + (result.message || "Unknown error"));
        }
    } catch (error) {
        console.error("Network Error:", error);
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
            window.location.href = "/index.html"; // 🔁 Change to your login page path
        } else {
            console.error(result);
        }
    } catch (error) {
        console.error(error);
    }
});


// Delete profile
document.addEventListener("DOMContentLoaded", function () {
    document.getElementById("delete-profile-btn").addEventListener("click", function () {
        if (confirm("Are you sure you want to delete your profile? This action cannot be undone.")) {
            fetch("https://loantest.innovatixtechnologies.com/account/example-app/public/api/delete-profile", {
                method: "DELETE",
                headers: {
                    "Authorization": `Bearer ${localStorage.getItem("token")}`,
                    "Content-Type": "application/json"
                }
            })
                .then(response => response.json())
                .then(data => {
                    if (data.status) {
                        console.log("Profile deleted successfully.");
                        // Optionally redirect to login or homepage
                        localStorage.removeItem("token"); // Clear the token
                        window.location.href = "/index.html"; // change this to your redirect URL
                    } else {
                        console.log("Failed to delete profile.");
                    }
                })
                .catch(error => {
                    console.error("Error deleting profile:", error);
                });
        }
    });
});




