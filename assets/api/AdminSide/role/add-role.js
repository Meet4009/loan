document.addEventListener("DOMContentLoaded", function () {
    const token = localStorage.getItem('token');
    if (!token) {
        window.location.href = 'index.html';
        return;
    }

    document.getElementById('sub-btn').addEventListener('click', function (e) {
        e.preventDefault();

        const name = document.getElementById('name').value;
        const addCheck = document.getElementById('addCheck').checked;
        const updateCheck = document.getElementById('updateCheck').checked;
        const delCheck = document.getElementById('deleteCheck').checked;
        const dataCheck = document.getElementById('dataCheck').checked;

        console.log(dataCheck);
        

        const data = {
            name: name,
            permissions: [
                {
                    module_name: "account",
                    can_add: addCheck,
                    can_update: updateCheck,
                    can_delete: delCheck,
                    can_show_data: dataCheck
                }
            ]
        };


        fetch('https://loantest.innovatixtechnologies.com/account/example-app/public/api/role', {
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
                console.log(responseData.message || "Form submitted successfully!");
                window.location.href = 'roles.html';
            })
            .catch(error => {
                console.error('Error:', error);
                console.log("There was an error submitting the form.");
            });
    });
});
