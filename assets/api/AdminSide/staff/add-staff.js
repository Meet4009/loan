document.addEventListener("DOMContentLoaded", function () {
    const token = localStorage.getItem('token');
    if (!token) {
        window.location.href = 'index.html';
        return;
    }

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

    document.getElementById('sub-btn').addEventListener('click', function (e) {
        e.preventDefault();

        const name = document.getElementById('name').value;
        const email = document.getElementById('email').value;
        const role = document.getElementById('role').value;
        const password = document.getElementById('password').value;

        const data = {
            name: name,
            email: email,
            role: role,
            password: password
        };

        fetch('https://loantest.innovatixtechnologies.com/account/example-app/public/api/staff-insert', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            },
            body: JSON.stringify(data)
        })
            .then(response => response.json())
            .then(responseData => {
                console.log('Success:', responseData);
                console.log('Response message:', responseData.message);
                window.location.href = 'staff.html';
            })
            .catch(error => {
                console.error('Error:', error);
                console.log("There was an error submitting the form.");
            });
    });
});
