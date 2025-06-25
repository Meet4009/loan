document.addEventListener('DOMContentLoaded', function () {
    // Get role ID from URL and validate token
    const urlParams = new URLSearchParams(window.location.search);
    const id = urlParams.get('id');
    console.log(id);
    
    const token = localStorage.getItem('token');
    console.log(token);

    if (!id) {
        console.error('❌ No ID provided in URL parameters');
        window.location.href = 'roles.html';
        return;
    }

    if (!token) {
        console.error('❌ No token found');
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
        console.log('📥 Fetched role data:', response);

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
        console.error('❌ Error loading role:', error);
        console.log(`Error loading role data: ${error.message}`);
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

        console.log('📤 Sending update data:', formData.name);

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
            console.log('✅ Update successful:', result);
            console.log('Role updated successfully');
            window.location.href = 'roles.html';
        })
        .catch(error => {
            console.error('❌ Update failed:', error);
            console.log(`Failed to update role: ${error.message}`);
        });
    });

    // Handle cancel button
    document.getElementById('cancelBtn')?.addEventListener('click', function() {
        window.location.href = 'roles.html';
    });
});