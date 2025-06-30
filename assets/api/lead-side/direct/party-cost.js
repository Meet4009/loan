const token = localStorage.getItem("token");
if (!token) {
    showAlert("Please log in again.", "error");
    // Optionally redirect to login page
    window.location.href = '../login.html';
}

document.addEventListener('DOMContentLoaded', function () {
    const tableBody = document.querySelector('#party-cost-table tbody');
    const tableFooter = document.querySelector('#party-cost-table tfoot ');

    // Validate DOM elements
    if (!tableBody || !tableFooter) {
        showAlert('Required table elements not found', 'error');
        return;
    }

    const urlParams = new URLSearchParams(window.location.search);
    const id = urlParams.get('id');
    if (!id) {
        showAlert('No ID provided in URL parameters', 'error');
        return;
    }
    fetch(`https://loantest.innovatixtechnologies.com/account/example-app/public/api/cost/${id}`, {
        headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json'
        }
    })
        .then(response => {
            if (!response.ok) {
                showAlert(`faild to fatch data`, 'error');
                return Promise.reject();
            }
            return response.json();
        })
        .then(data => {
            if (!data || !data.cost_details) {
                showAlert('Invalid data received from server', 'error');
                return;
            }

            // Clear any existing table rows
            tableBody.innerHTML = '';
            tableFooter.textContent = '0/-'; // Set default value

            const costDetails = data.cost_details;

            // Cost type mapping (for display names)
            const costTypes = {
                pf: "PF",
                rm: "RM",
                stemp: "Stamp Paper",
                tcvr: "TCR-VR",
                c_astiment: "C.Astiment",
                ework: "E.Woek",
                b_astiment: "Astiment",
                vahivat: "Vahivat",
                loan_fees: "Loan Fees",
                astiment: "Astiment" // in case it's separate
            };

            // Populate table rows
            for (let key in costDetails) {
                const costType = costTypes[key] || key;
                const amount = Number(costDetails[key]).toLocaleString('en-IN') + '/-';

                const row = `
                    <tr>
                        <td>${costType}</td>
                        <td>${amount}</td>
                    </tr>
                `;
                tableBody.insertAdjacentHTML('beforeend', row);
            }

            // Update total only if it exists
            if (data.total_cost !== undefined) {
                tableFooter.innerHTML = `<tr><td><b>Total Cost</b></td><td>${Number(data.total_cost).toLocaleString('en-IN')}/-</td></tr>`;
            }
        })
        .catch(error => {
            showAlert('Error loading cost details', 'error');
            if (tableBody) {
                tableBody.innerHTML = '<tr><td colspan="2">Failed to load cost details</td></tr>';
            }
            if (tableFooter) {
                tableFooter.textContent = '0/-';
            }
        });
});

