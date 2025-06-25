// Immediately check token and redirect if not present
const token = localStorage.getItem("token");
if (!token) {
    window.location.href = "../../index.html";
}

// Reusable selector references
const tableBody = document.querySelector('#party-cost-table tbody');
const tableFoot = document.querySelector('#party-cost-table tfoot');

// Main loader function
async function loadPartyCostData() {
    const id = new URLSearchParams(window.location.search).get('id');
    if (!id) {
        console.error('No ID provided in URL parameters');
        return;
    }

    try {
        const response = await fetch(
            `https://loantest.innovatixtechnologies.com/account/example-app/public/api/builder-cost-admin/${id}`,
            {
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Accept': 'application/json'
                }
            }
        );

        if (!response.ok) {
            throw new Error(`Server responded with status ${response.status}`);
        }

        const { cost_details, total_cost } = await response.json();

        // Clear previous content
        tableBody.innerHTML = '';
        tableFoot.innerHTML = '';

        if (cost_details && typeof cost_details === 'object') {
            Object.entries(cost_details).forEach(([key, value]) => {
                const row = document.createElement('tr');
                row.innerHTML = `
                    <td>${formatKey(key)}</td>
                    <td>₹${formatNumber(value)}</td>
                `;
                tableBody.appendChild(row);
            });
        } else {
            tableBody.innerHTML = '<tr><td colspan="2">No cost details found.</td></tr>';
        }

        // Footer total
        const totalRow = document.createElement('tr');
        totalRow.innerHTML = `
            <th>Total</th>
            <th>₹${formatNumber(total_cost)}</th>
        `;
        tableFoot.appendChild(totalRow);

    } catch (error) {
        console.error('Error fetching cost data:', error);
        tableBody.innerHTML = '<tr><td colspan="2">Failed to load data.</td></tr>';
        tableFoot.innerHTML = '';
    }
}

// Utility: format key nicely
function formatKey(key) {
    return key.replace(/_/g, ' ').replace(/\b\w/g, l => l.toUpperCase());
}

// Utility: format number with 2 decimals
function formatNumber(value) {
    const num = parseFloat(value);
    return isNaN(num) ? '0.00' : num.toFixed(2);
}

// Init on page load
window.addEventListener('DOMContentLoaded', loadPartyCostData);
