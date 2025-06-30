// Replace with your actual Bearer token received from login
const token = localStorage.getItem("token");
if (!token) {
    showAlert("Please log in again.", "error");
    // Optionally redirect to login page
    window.location.href = "../index.html";

}
// Fetch Account List Data

fetch("https://loantest.innovatixtechnologies.com/account/example-app/public/api/account-list-show-admin", {
    method: "GET",
    headers: {
        "Accept": "application/json",
        "Authorization": `Bearer ${token}`
    }
})
    .then(response => {
        if (!response.ok) {
            showAlert("Network response was not OK", "error");
            return Promise.reject();
        }
        return response.json();
    })
    .then(data => {

        const tbody = document.querySelector("#login-acc-list tbody");
        tbody.innerHTML = ""; // Clear any old rows

        data.data.forEach((item, index) => {
            const row = `
                <tr>
                    <td>${item.id}</td>
                    <td>${item.bank}</td>
                    <td>${item.file_no}</td>
                    <td>${item.date}</td>
                    <td>${item.f_number}</td>
                    <td>${item.mo_no}</td>
                    <td>${item.party_name}</td>
                    <td>${item.project_name}</td>
                    <td>${item.product}</td>
                    <td>${item.bhl_to}</td>
                    <td>${item.top_up}</td>
                    <td>${item.total}</td>
                    <td>${item.total_fees}</td>
                    <td>${item.ap_1}</td>
                    <td>${item.ap_1_date}</td>
                    <td>
                        <div class="button-items">
                            ${item.status === 'completed'
                    ? `<button type="button" class="btn btn-outline-success">${item.status}</button>`
                    : item.status === 'pending'
                        ? `<button type="button" class="btn btn-outline-primary">${item.status}</button>`
                        : item.status === 'processing'
                            ? `<button type="button" class="btn btn-outline-warning">${item.status}</button>`
                            : item.status === 'reject'
                                ? `<button type="button" class="btn btn-outline-danger">${item.status}</button>`
                                : `<button type="button" class="btn btn-outline-secondary">${item.status}</button>`
                }
                        </div>
                    </td>
                    <td>${item.pf}</td>
                    <td>${item.pf_parat}</td>
                    <td>${item.pf_parat_date}</td>
                    <td>${item.remark}</td>
                    <td>${item.remark_payment}</td>
                    <td>${item.payment_2}</td>
                    <td>${item.payment_2_date}</td>
                    <td>${item.payment_3}</td>
                    <td>${item.payment_3_date}</td>
                    <td>${item.kasar}</td>
                    <td>${item.payment_baki}</td>
                    <td>${item.morgej_parat}</td>
                    <td>${item.morgej_parat_date}</td>
                    <td>${item.agreement_parat}</td>
                    <td>${item.agreement_parat_date}</td>
                    <td>${item.m_date}</td>
                    <td>${item.m_cal}</td>
                    <td>${item.m_diff}</td>
                    <td>${item.stamp}</td>
                    <td>${item.payout_date}</td>
                    <td>${item.payout_amount}</td>
                    <td>${item.payout_remark}</td>
                    <td>${item.ap_parat}</td>
                    <td>${item.ap_parat_date}</td>
                    <td>${item.remark_1}</td>
                    <td>${item.remark_2}</td>
                    <td>${item.remark_3}</td>
                    </tr>
                    `;
            tbody.innerHTML += row;
        });
    })
    .catch(error => {
        showAlert("Error fetching account list", "error");
    });
