const token = localStorage.getItem("token");
if (!token) {
    showAlert("Please log in again.", "error");
    // Optionally redirect to login page
    window.location.href = '../login.html';
}

async function loadPartyCostData() {
    const tableBody = document.querySelector('#party-cost-table tbody');
    const tableFoot = document.querySelector('#party-cost-table tfoot');

    try {
        const urlParams = new URLSearchParams(window.location.search);
        const id = urlParams.get('id');
        if (!id) {
            console.error('No ID provided in URL parameters');
            return;
        }
        const response = await fetch(`https://loantest.innovatixtechnologies.com/account/example-app/public/api/builder-cost/${id}`, {
            method: 'GET',
            headers: {
                'Authorization': `Bearer ${token}`,
                'Content-Type': 'application/json'
            }
        });
        const data = await response.json();

        const costDetails = data.cost_details;

        // Clear any existing rows
        tableBody.innerHTML = '';
        tableFoot.innerHTML = '';

        // Populate table body
        for (const [key, value] of Object.entries(costDetails)) {
            const row = `
                    <tr>
                        <td>${key.replace(/_/g, ' ').toUpperCase()}</td>
                        <td>₹${parseFloat(value).toFixed(2)}</td>
                    </tr>
                `;
            tableBody.innerHTML += row;
        }

        // Add total row in the footer
        const totalRow = `
                <tr>
                    <th>Total</th>
                    <th>₹${parseFloat(data.total_cost).toFixed(2)}</th>
                </tr>
            `;
        tableFoot.innerHTML = totalRow;

    } catch (error) {
        console.error('Error fetching cost data:', error);
        tableBody.innerHTML = '<tr><td colspan="2">Failed to load data.</td></tr>';
    }
}

// Call the function when the page loads
window.onload = loadPartyCostData;
