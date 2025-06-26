document.addEventListener('DOMContentLoaded', function () {
    // Get role ID from URL and validate token
    const urlParams = new URLSearchParams(window.location.search);
    const id = urlParams.get('id');
    console.log(id);

    const token = localStorage.getItem('token');
    console.log(token);

    if (!id) {

        showAlert('❌ No ID provided in URL parameters', 'error');

        window.location.href = 'roles.html';
        return;
    }

    if (!token) {
        showAlert('❌ No token found', 'error');
        window.location.href = 'index.html';
        return;
    }

    // Fetch existing role data
    fetch(`https://loantest.innovatixtechnologies.com/account/example-app/public/api/role-list/${id}`, {
        method: 'GET',
        headers: {
            'Authorization': `Bearer ${token}`,
            'Accept': 'application/json'
        }
    })
        .then(response => {
            if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
            return response.json();
        })
        .then(response => {
            if (!response || !response.data) {
                throw new Error('Invalid data structure received');
            }

            const data = response.data;
            // Populate form fields
            document.getElementById("name").value = data.name;

            // Set checkbox values
            if (data.permissions && data.permissions.length > 0) {
                const permissions = data.permissions[0];
                document.getElementById("addCheck").checked = permissions.can_add;
                document.getElementById("updateCheck").checked = permissions.can_update;
                document.getElementById("deleteCheck").checked = permissions.can_delete;
                document.getElementById("dataCheck").checked = permissions.can_show_data;
            }
        })
        .catch(error => {

            showAlert(`Error loading role: ${error.message}`, "error");

        });

    // Handle form submission
    document.getElementById('updateRole').addEventListener('click', function (e) {
        e.preventDefault();

        // Gather form data including permissions
        const formData = {
            name: document.getElementById("name").value,
            permissions: [{
                module_name: "account",
                can_add: document.getElementById("addCheck").checked,
                can_update: document.getElementById("updateCheck").checked,
                can_delete: document.getElementById("deleteCheck").checked,
                can_show_data: document.getElementById("dataCheck").checked
            }]
        };

        // Send update request
        fetch(`https://loantest.innovatixtechnologies.com/account/example-app/public/api/role-update/${id}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`,
                'Accept': 'application/json'
            },
            body: JSON.stringify(formData)
        })
            .then(response => {
                if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
                return response.json();
            })
            .then(result => {
                if (result && result.message) {
                    showAlert('Role updated successfully', 'success');
                    window.location.href = 'roles.html';
                }
            })
            .catch(error => {
                showAlert(`Failed to update role: ${error.message}`, "error");
            });
    });

    // Handle cancel button
    document.getElementById('cancelBtn')?.addEventListener('click', function () {
        window.location.href = 'roles.html';
    });
});