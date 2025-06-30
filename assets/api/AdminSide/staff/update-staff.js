document.addEventListener('DOMContentLoaded', function () {
    const urlParams = new URLSearchParams(window.location.search);
    const id = urlParams.get('id');

    if (!id) {
        showAlert('No ID provided in URL parameters', 'error');
        return;
    }
    const token = localStorage.getItem('token');
    if (!token) {
        showAlert("Please log in again.", "error");
        window.location.href = 'index.html';
        return;
    }

    // Fetch existing data
    fetch(`https://loantest.innovatixtechnologies.com/account/example-app/public/api/staff/show/${id}`, {
        method: 'GET',
        headers: {
            'Authorization': `Bearer ${token}`,
            'Accept': 'application/json'
        }
    })
        .then(response => {
            if (!response.ok) {
                showAlert(`faild to fatch data`, "error");
                return Promise.reject();
            }
            if (response.headers.get('content-length') === '0') {
                showAlert('Empty response received', "error");
                return Promise.reject();
            }
            return response.json();
        })
        .then(response => {
            if (!response || !response.data) {
                showAlert('Invalid data structure received', "error");
                return;
            }

            const data = response.data;
            // Populate form fields with existing data
            try {
                document.getElementById("name").value = data.name;
                document.getElementById("email").value = data.email;
                document.getElementById("role").value = data.role;
                document.getElementById("password").value = data.password;
            } catch (err) {
                showAlert('Error populating form', "error");
            }
        })
        .catch(error => {
            showAlert(`Error loading data`, "error");
        });

    // fetching role list
    const roleSelect = document.getElementById('role')

    fetch('https://loantest.innovatixtechnologies.com/account/example-app/public/api/role-list', {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
        }
    })
        .then(response => response.json())
        .then(response => {
            const newRoles = response.data

            newRoles.forEach(item => {
                roleSelect.add(new Option(item.name, item.name));
            });
        })
        .catch(error => {
            showAlert("Error Occured while loading roles", "error");
        })

    // Handle form submission
    document.getElementById('updateStaff').addEventListener('click', function (e) {
        e.preventDefault();
        const formData = {
            id: id, // Add the ID field
            name: document.getElementById("name").value,
            email: document.getElementById("email").value,
            role: document.getElementById("role").value,
            password: document.getElementById("password").value,
        };

        // Update fetch request with better error handling
        fetch(`https://loantest.innovatixtechnologies.com/account/example-app/public/api/staff-update/${id}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`,
                'Accept': 'application/json'
            },
            body: JSON.stringify(formData)
        })
            .then(response => response.json())
            .then(data => {
                if (data.message) {
                    showAlert('Data updated successfully', 'success');
                    window.location.href = 'staff.html';
                } else {
                    showAlert('Failed to update data', 'error');
                }
            })
            .catch(error => {
                showAlert(`Error updating data`, "error");
            });
    });
});

