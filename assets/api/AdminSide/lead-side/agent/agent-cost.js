// Redirect if token is missing
const token = localStorage.getItem('token');
if (!token) {
    window.location.href = '../../index.html';
}

// Load agent cost data
async function loadAgentCostData() {
    const tableBody = document.querySelector('#agent-cost-table tbody');
    const tableFoot = document.querySelector('#agent-cost-table tfoot');

    // Clear table early in case of re-fetch or errors
    tableBody.innerHTML = '';
    tableFoot.innerHTML = '';

    const urlParams = new URLSearchParams(window.location.search);
    const id = urlParams.get('id');

    if (!id) {
        showAlert('❌ No ID found in URL parameters');
        tableBody.innerHTML = '<tr><td colspan="2">No agent ID provided.</td></tr>';
        return;
    }

    try {
        const response = await fetch(`https://loantest.innovatixtechnologies.com/account/example-app/public/api/agent-cost/admin/${id}`, {
            method: 'GET',
            headers: {
                'Authorization': `Bearer ${token}`,
                'Content-Type': 'application/json'
            }
        });

        if (!response.ok) {
            showAlert(`Server responded with status ${response.status}`);
            tableBody.innerHTML = '<tr><td colspan="2">Failed to load data.</td></tr>';
            return;
        }

        const { cost_details, total_cost } = await response.json();

        if (!cost_details || typeof cost_details !== 'object') {
            showAlert('Invalid cost details received.');
            tableBody.innerHTML = '<tr><td colspan="2">Failed to load data.</td></tr>';
            return;
        }

        // Build rows efficiently
        const rows = Object.entries(cost_details)
            .map(([key, value]) => `
                <tr>
                    <td>${formatLabel(key)}</td>
                    <td>₹${formatCurrency(value)}</td>
                </tr>
            `)
            .join('');

        tableBody.innerHTML = rows;

        // Footer with total
        tableFoot.innerHTML = `
            <tr>
                <th>Total</th>
                <th>₹${formatCurrency(total_cost)}</th>
            </tr>
        `;

    } catch (error) {
        showAlert('❌ Error fetching cost data');
        tableBody.innerHTML = '<tr><td colspan="2">Failed to load data.</td></tr>';
    }
}

// Utility: format label
function formatLabel(key) {
    return key.replace(/_/g, ' ').toUpperCase();
}

// Utility: format value safely
function formatCurrency(value) {
    const num = parseFloat(value);
    return isNaN(num) ? '0.00' : num.toFixed(2);
}

// Load on page ready
window.addEventListener('DOMContentLoaded', loadAgentCostData);
