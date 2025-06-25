// ✅ Check token once & redirect if missing
const token = localStorage.getItem("token");
if (!token) {
    window.location.href = "../index.html";
}

document.addEventListener("DOMContentLoaded", () => {
    const today = new Date();
    const firstDay = new Date(today.getFullYear(), today.getMonth(), 2);
    const lastDay = new Date(today.getFullYear(), today.getMonth() + 1, 1);

    const formatDate = (date) => date.toISOString().split("T")[0];
    const startDate = formatDate(firstDay);
    const endDate = formatDate(lastDay);

    document.getElementById("startDate").value = startDate;
    document.getElementById("endDate").value = endDate;

    // Load current month report
    fetchMonthlyReport(startDate, endDate);
});

// ✅ Reusable API base
const API_BASE = "https://loantest.innovatixtechnologies.com/account/example-app/public/api";

// ✅ Fetch & render monthly report
async function fetchMonthlyReport(startDate, endDate) {
    const url = new URL(`${API_BASE}/monthly-report/admin`);
    url.searchParams.append("start_date", startDate);
    url.searchParams.append("end_date", endDate);

    const tbody = document.querySelector("#monthly-report tbody");
    tbody.innerHTML = "";

    try {
        const response = await fetch(url, {
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`,
            },
        });

        if (!response.ok) throw new Error(`HTTP ${response.status}`);

        const result = await response.json();
        const data = result.data || [];

        data.forEach((item) => {
            tbody.insertAdjacentHTML("beforeend", renderRow(item));
        });

        attachEventListeners();
    } catch (err) {
        console.error("❌ Failed to fetch report:", err);
        alert("Error loading report. Please try again.");
    }
}

// ✅ Render a single row
function renderRow(item) {
    return `
    <tr>
        ${renderCell(item.bank)}
        ${renderCell(item.file_no)}
        ${renderCell(item.date)}
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
        ${renderCell(item.f_number)}
        ${renderCell(item.mo_no)}
        ${renderCell(item.party_name)}
        ${renderCell(item.project_name)}
        ${renderCell(item.product)}
        ${renderCell(item.bhl_to)}
        ${renderCell(item.top_up)}
        ${renderCell(item.total)}
        ${renderCell(item.total_fees)}
        ${renderCell(item.ap_1)}
        ${renderCell(item.ap_1_date)}
        <td><div class="button-items">${renderStatusButton(item.status)}</div></td>
        ${renderCell(item.pf)}
        ${renderCell(item.pf_parat)}
        ${renderCell(item.pf_parat_date)}
        ${renderCell(item.remark)}
        ${renderCell(item.remark_payment)}
        ${renderCell(item.payment_2)}
        ${renderCell(item.payment_2_date)}
        ${renderCell(item.payment_3)}
        ${renderCell(item.payment_3_date)}
        ${renderCell(item.kasar)}
        ${renderCell(item.payment_baki)}
        ${renderCell(item.morgej_parat)}
        ${renderCell(item.morgej_parat_date)}
        ${renderCell(item.m_cal)}
        ${renderCell(item.m_diff)}
        ${renderCell(item.stamp)}
        ${renderCell(item.agreement_parat)}
        ${renderCell(item.agreement_parat_date)}
        ${renderCell(item.payout_date)}
        ${renderCell(item.payout_amount)}
        ${renderCell(item.payout_remark)}
        ${renderCell(item.ap_parat)}
        ${renderCell(item.ap_parat_date)}
        ${renderCell(item.remark_1)}
        ${renderCell(item.remark_2)}
        ${renderCell(item.remark_3)}
    </tr>`;
}

// ✅ Short helper for <td>
const renderCell = (val) => `<td>${val || '  -  ' }</td>`;

// ✅ Smart status button
function renderStatusButton(status = "") {
    const map = {
        completed: "success",
        pending: "primary",
        processing: "warning",
        reject: "danger",
    };
    const btnClass = map[status] || "secondary";
    return `<button type="button" class="btn btn-outline-${btnClass}">${status}</button>`;
}

// ✅ Attach update/delete events
function attachEventListeners() {
    document.querySelectorAll(".update-btn").forEach((btn) =>
        btn.addEventListener("click", () => {
            window.location.href = `update-account.html?id=${btn.dataset.id}`;
        })
    );

    document.querySelectorAll(".delete-btn").forEach((btn) =>
        btn.addEventListener("click", () => handleDelete(btn))
    );
}

// ✅ Handle delete with confirmation
async function handleDelete(btn) {
    const id = btn.dataset.id;
    if (!confirm("Are you sure you want to delete this record?")) return;

    try {
        const res = await fetch(`${API_BASE}/account-delete/admin/${id}`, {
            method: "DELETE",
            headers: {
                Accept: "application/json",
                Authorization: `Bearer ${token}`,
            },
        });

        if (!res.ok) throw new Error(`HTTP ${res.status}`);

        btn.closest("tr").remove();
    } catch (err) {
        console.error("❌ Delete failed:", err);
        alert("Failed to delete. Please try again.");
    }
}

// ✅ Filter: new date range
document.querySelector(".apply-filter").addEventListener("click", () => {
    const startDate = document.getElementById("startDate").value;
    const endDate = document.getElementById("endDate").value;
    fetchMonthlyReport(startDate, endDate);
});
