document.addEventListener('DOMContentLoaded', function () {
    const urlParams = new URLSearchParams(window.location.search);
    const id = urlParams.get('id');

    if (!id) {

        console.error('No ID provided in URL parameters');
        return;
    }
    const token = localStorage.getItem('token');
    if (!token) {
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
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            if (response.headers.get('content-length') === '0') {
                throw new Error('Empty response received');
            }
            return response.json();
        })
        .then(response => {
            console.log('Raw API response:', response);

            if (!response || !response.data) {
                throw new Error('Invalid data structure received');
            }

            const data = response.data;
            // Populate form fields with existing data
            try {
                document.getElementById("name").value = data.name;
                document.getElementById("email").value = data.email;
                document.getElementById("role").value = data.role;
                document.getElementById("password").value = data.password;
            } catch (err) {
                console.error('Error populating form:', err);
                throw err;
            }
        })
        .catch(error => {
            console.error('Error:', error);
            console.log(`Error loading data: ${error.message}`);
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
            console.log("Error Occured", error);
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

        console.log('Sending form data:', formData); // Debug log

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
                console.log('Server response:', data);
                if ('Data updated successfully') {
                    console.log('Data updated successfully');
                    window.location.href = 'staff.html';
                } else {
                    throw new Error(data.message || 'Failed to update data');
                }
            })
            .catch(error => {
                console.error('Error updating data:', error);
                console.log(`Error updating data: ${error.message}`);
            });
    });
});
