(async () => {
    const token = localStorage.getItem("token");
    if (!token) {
        window.location.href = "../index.html";
        return;
    }

    const API_BASE = "https://loantest.innovatixtechnologies.com/account/example-app/public/api";
    const tbody = document.querySelector("#tech-companies-1 tbody");

    try {
        const response = await fetch(`${API_BASE}/account-list-admin`, {
            method: "GET",
            headers: {
                "Accept": "application/json",
                "Authorization": `Bearer ${token}`
            }
        });

        if (!response.ok) {
            console.error("❌ Failed to fetch:", response.status, response.statusText);
            return;
        }

        const data = await response.json();
        tbody.innerHTML = ""; // clear old rows

        data.data.forEach(item => {
            tbody.insertAdjacentHTML('beforeend', renderRow(item));
        });

    } catch (err) {
        console.error("❌ Error:", err);
    }

    function renderRow(item) {
        return `
        <tr>
            <td>${item.bank || ' - '}</td>
            <td>${item.file_no || ' - '}</td>
            <td>${item.date || ' - '}</td>
            <td>
            <div class="button-items">
                <button type="button" class="btn btn-outline-info btn-icon-circle-sm update-btn" data-id="${item.id}">
                    <i class="fa-solid fa-pen"></i>
                </button>
                <button type="button" class="btn btn-outline-danger btn-icon-circle-sm delete-btn" data-id="${item.id}">
                    <i class="fa-solid fa-trash"></i>
                </button>
            </div>
        </td>
        <td>${item.f_number || ' - '}</td>
        <td>${item.mo_no || ' - '}</td>
        <td>${item.party_name || ' - '}</td>
        <td>${item.project_name || ' - '}</td>
        <td>${item.product || ' - '}</td>
        <td>${item.bhl_to || ' - '}</td>
        <td>${item.top_up || ' - '}</td>
        <td>${item.total || ' - '}</td>
        <td>${item.total_fees || ' - '}</td>
        <td>${item.ap_1 || ' - '}</td>
        <td>${item.ap_1_date || ' - '}</td>
        <td>
            <div class="button-items">
                ${renderStatusButton(item.status)}
            </div>
        </td>
        <td>${item.pf || ' - '}</td>
        <td>${item.pf_parat || ' - '}</td>
        <td>${item.pf_parat_date || ' - '}</td>
        <td>${item.remark || ' - '}</td>
        <td>${item.remark_payment || ' - '}</td>
        <td>${item.payment_2 || ' - '}</td>
        <td>${item.payment_2_date || ' - '}</td>
        <td>${item.payment_3 || ' - '}</td>
        <td>${item.payment_3_date || ' - '}</td>
        <td>${item.kasar || ' - '}</td>
        <td>${item.payment_baki || ' - '}</td>
        <td>${item.morgej_parat || ' - '}</td>
        <td>${item.morgej_parat_date || ' - '}</td>
        <td>${item.m_cal || ' - '}</td>
        <td>${item.m_diff || ' - '}</td>
        <td>${item.stamp || ' - '}</td>
        <td>${item.agreement_parat || ' - '}</td>
        <td>${item.agreement_parat_date || ' - '}</td>
        <td>${item.payout_date || ' - '}</td>
        <td>${item.payout_amount || ' - '}</td>
        <td>${item.payout_remark || ' - '}</td>
        <td>${item.ap_parat || ' - '}</td>
        <td>${item.ap_parat_date || ' - '}</td>
        <td>${item.remark_1 || ' - '}</td>
        <td>${item.remark_2 || ' - '}</td>
        <td>${item.remark_3 || ' - '}</td>
        </tr>
        `;
    }

    function renderStatusButton(status) {
        const map = {
            completed: "success",
            pending: "primary",
            processing: "warning",
            reject: "danger"
        };
        const btnClass = map[status] || "secondary";
        return `<button type="button" class="btn btn-outline-${btnClass}">${status}</button>`;
    }


    document.querySelectorAll('.update-btn').forEach(btn => {
        btn.addEventListener('click', () => {
            const id = btn.dataset.id;
            window.location.href = `update-account.html?id=${id}`;
        });
    });

    document.querySelectorAll('.delete-btn').forEach(button => {
        button.addEventListener('click', () => {
            const id = button.getAttribute('data-id');

            showConfirm("Are you sure you want to delete this data?", () => {
                fetch(`${API_BASE}/account-delete/admin/${id}`, {
                    method: 'DELETE',
                    headers: {
                        "Accept": "application/json",
                        "Authorization": `Bearer ${localStorage.getItem('token')}`
                    }
                })
                    .then(res => {
                        if (!res.ok) throw new Error("Failed to delete");
                        return res.json();
                    })
                    .then(() => {
                        button.closest('tr').remove();
                        showAlert("Deleted successfully!", "success");
                    })
                    .catch(() => {
                        showAlert("❌ Failed to delete record", "error");
                    });
            });
        });
    });
})();
