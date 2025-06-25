const token = localStorage.getItem("token");
if (!token) {
    // Optionally redirect to login page
    window.location.href = '../login.html';
}

async function loadAgentCostData() {
    const tableBody = document.querySelector('#cost-table-body');
    const tableFoot = document.querySelector('#cost-table-footer');

    try {
        const urlParams = new URLSearchParams(window.location.search);
        const id = urlParams.get('id');
        if (!id) {
            console.error('No ID provided in URL parameters');
            return;
        }
        const response = await fetch(`https://loantest.innovatixtechnologies.com/account/example-app/public/api/other-cost/admin/${id}`, {
            method: 'GET',
            headers: {
                'Authorization': `Bearer ${token}`,
                'Content-Type': 'application/json'
            }
        });
        const data = await response.json();

        console.log("data", data);
        

        const costDetails = data.cost_details;

        // Clear any existing rows
        tableBody.innerHTML = '';
        tableFoot.innerHTML = '';

        // Populate table tableBody
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
window.onload = loadAgentCostData;
