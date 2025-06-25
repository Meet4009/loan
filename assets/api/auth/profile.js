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

// Add CSS for custom alerts and modal
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
    .custom-modal {
        position: fixed;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        background: white;
        padding: 20px;
        border-radius: 5px;
        z-index: 2000;
        box-shadow: 0 4px 8px rgba(0,0,0,0.2);
        text-align: center;
        max-width: 300px;
    }
    .custom-modal button {
        margin: 10px;
        padding: 8px 16px;
        border: none;
        border-radius: 3px;
        cursor: pointer;
        color: white;
    }
    .custom-modal .btn-yes {
        background: #dc3545;
    }
    .custom-modal .btn-no {
        background: #6c757d;
    }
`;
document.head.appendChild(style);

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

// Custom confirm modal
const showConfirm = (message, onYes, onNo) => {
    const modal = document.createElement('div');
    modal.className = 'custom-modal';
    modal.innerHTML = `
        <div style="margin-bottom: 10px;">${message}</div>
        <button class="btn-yes">Yes</button>
        <button class="btn-no">No</button>
    `;
    document.body.appendChild(modal);
    modal.querySelector('.btn-yes').onclick = () => {
        modal.remove();
        if (onYes) onYes();
    };
    modal.querySelector('.btn-no').onclick = () => {
        modal.remove();
        if (onNo) onNo();
    };
};

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
        showAlert("Error loading profile.", "error");
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
            await loadProfileData();
            $('#updateProfileModal').modal('hide');
            showAlert("Profile updated successfully!", "success");
            setTimeout(() => window.location.reload(), 1200);
        } else {
            showAlert(result.message || "❌ Failed to update.", "error");
        }
    } catch (error) {
        showAlert("Network Error while updating profile.", "error");
    }
});

// Logout functionality
document.getElementById("logout-btn").addEventListener("click", async function () {
    const token = localStorage.getItem("token");
    try {
        const response = await fetch("https://loantest.innovatixtechnologies.com/account/example-app/public/api/logout", {
            method: "POST",
            headers: {
                "Authorization": `Bearer ${token}`
            }
        });

        const result = await response.json();

        if (response.ok) {
            localStorage.removeItem("token");
            showAlert("Logged out successfully!", "success");
            setTimeout(() => window.location.href = "/index.html", 1200);
        } else {
            showAlert(result.message || "Logout failed.", "error");
        }
    } catch (error) {
        showAlert("Logout error.", "error");
    }
});

// Delete profile
document.addEventListener("DOMContentLoaded", function () {
    document.getElementById("delete-profile-btn").addEventListener("click", function () {
        showConfirm("Are you sure you want to delete your profile? This action cannot be undone.", () => {
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
                        showAlert("Profile deleted successfully.", "success");
                        localStorage.removeItem("token");
                        setTimeout(() => window.location.href = "/index.html", 1200);
                    } else {
                        showAlert("Failed to delete profile.", "error");
                    }
                })
                .catch(() => {
                    showAlert("Error deleting profile.", "error");
                });
        });
    });
});




