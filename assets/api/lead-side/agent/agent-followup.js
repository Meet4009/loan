
const token = localStorage.getItem("token");
if (!token) {
    showAlert("Please log in again.", "error");
    // Optionally redirect to login page
    window.location.href = '../login.html';
}
async function loadFollowUpData() {
    const tableBody = document.querySelector('#agent-follow-up-table tbody');

    try {
        const urlParams = new URLSearchParams(window.location.search);
        const id = urlParams.get('id');
        if (!id) {
            console.error('No ID provided in URL parameters');
            return;
        }
        const response = await fetch(`https://loantest.innovatixtechnologies.com/account/example-app/public/api/agent-follow-ups/${id}`, {
            method: 'GET',
            headers: {
                'Authorization': `Bearer ${token}`,
                'Content-Type': 'application/json'
            }
        });
        const result = await response.json();

        const followUps = result.data;

        // Clear previous rows if any
        tableBody.innerHTML = '';

        // Loop and add rows
        followUps.forEach(item => {
            console.log('Follow-up item:', item); // Debugging line to check the item structure

            const row = `
                    <tr>
                        <td>${item.builder_id}</td>
                        <td>${item.start_date}</td>
                        <td>${item.end_date}</td>
                        <td>${item.property}</td>
                        <td>${item.description}</td>
                    </tr>
                `;
            tableBody.innerHTML += row;
        });

    } catch (error) {
        console.error('Error loading follow-up data:', error);
        tableBody.innerHTML = '<tr><td colspan="6">Failed to load follow-up data.</td></tr>';
    }
}

// Call on page load
window.onload = function () {
    loadFollowUpData(); // Follow-up
};
