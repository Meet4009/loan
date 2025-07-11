const token = localStorage.getItem('token');
if (!token) {
    showAlert("Please log in again.", "error");
    window.location.href = '../../index.html';
    // No need to continue execution
}

document.addEventListener('DOMContentLoaded', () => {
    const tableBody = document.querySelector('#party-cost-table tbody');
    const tableFooter = document.querySelector('#party-cost-table tfoot');

    if (!tableBody || !tableFooter) {
        showAlert('Required table elements not found in the DOM.', "error");
        return;
    }

    const urlParams = new URLSearchParams(window.location.search);
    const id = urlParams.get('id');

    if (!id) {
        showAlert('No ID found in URL parameters.', "error");
        return;
    }

    const API_URL = `https://loantest.innovatixtechnologies.com/account/example-app/public/api/cost/admin/${id}`;

    fetch(API_URL, {
        headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json'
        }
    })
        .then(response => {
            if (!response.ok) {
                showAlert(`failed to fetch data`, 'error');
                tableBody.innerHTML = `
                <tr>
                    <td colspan="2" class="text-danger">Failed to load cost details</td>
                </tr>
            `;
                tableFooter.innerHTML = `
                <tr>
                    <td><b>Total Cost</b></td>
                    <td><b>0/-</b></td>
                </tr>
            `;
                return Promise.reject();
            }
            return response.json();
        })
        .then(data => {
            if (!data?.cost_details) {
                showAlert('Invalid or empty cost details received.', 'error');
                tableBody.innerHTML = `
                <tr>
                    <td colspan="2" class="text-danger">Failed to load cost details</td>
                </tr>
            `;
                tableFooter.innerHTML = `
                <tr>
                    <td><b>Total Cost</b></td>
                    <td><b>0/-</b></td>
                </tr>
            `;
                return;
            }

            // Reset table content
            tableBody.innerHTML = '';
            tableFooter.innerHTML = '';

            const costTypes = {
                pf: "PF",
                rm: "RM",
                stemp: "Stamp Paper",
                tcvr: "TCR-VR",
                c_astiment: "C. Astiment",
                ework: "E. Work",
                b_astiment: "B. Astiment",
                vahivat: "Vahivat",
                loan_fees: "Loan Fees",
                astiment: "Astiment"
            };

            Object.entries(data.cost_details).forEach(([key, value]) => {
                const type = costTypes[key] || key;
                const amount = `${Number(value).toLocaleString('en-IN')}/-`;

                const row = `
                <tr>
                    <td>${type}</td>
                    <td>${amount}</td>
                </tr>
            `;
                tableBody.insertAdjacentHTML('beforeend', row);
            });

            // Append total row if available
            const totalCost = data.total_cost !== undefined
                ? `${Number(data.total_cost).toLocaleString('en-IN')}/-`
                : '0/-';

            tableFooter.innerHTML = `
            <tr>
                <td><b>Total Cost</b></td>
                <td><b>${totalCost}</b></td>
            </tr>
        `;
        })
        .catch(() => {
            showAlert('Error fetching cost data', 'error');
            tableBody.innerHTML = `
            <tr>
                <td colspan="2" class="text-danger">Failed to load cost details</td>
            </tr>
        `;
            tableFooter.innerHTML = `
            <tr>
                <td><b>Total Cost</b></td>
                <td><b>0/-</b></td>
            </tr>
        `;
        });
});
