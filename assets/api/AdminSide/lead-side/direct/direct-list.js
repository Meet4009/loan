document.addEventListener('DOMContentLoaded', () => {
    const token = localStorage.getItem('token');
    if (!token) {
        window.location.href = '../../index.html';
        return;
    }

    const tableBody = document.querySelector('#lead-list-1 tbody');
    if (!tableBody) {
        console.error("❌ Table body not found!");
        return;
    }

    // Utility: Create status button based on status text
    const createStatusButton = (status) => {
        const statusMap = {
            Done: 'success',
            Pending: 'primary',
            Hold: 'warning',
            Reject: 'danger'
        };
        const btnClass = statusMap[status] || 'secondary';
        return `<button type="button" class="btn btn-outline-${btnClass}">${status}</button>`;
    };

    // Load and render table rows
    const loadData = async () => {
        try {
            const response = await fetch(
                'https://loantest.innovatixtechnologies.com/account/example-app/public/api/form-show-admin',
                {
                    method: 'GET',
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `Bearer ${token}`
                    }
                }
            );

            const res = await response.json();

            if (res.message !== "Data fetched successfully") {
                console.error("❌ Unexpected response:", res);
                return;
            }

            tableBody.innerHTML = ''; // Clear existing rows

            res.data.forEach(row => {
                const tr = document.createElement('tr');
                tr.innerHTML = `
                    <td>${row.id}</td>
                    <td>${row.date}</td>
                    <td>
                        <div class="button-items">
                            <button type="button" class="btn btn-outline-info btn-icon-circle-sm direct-data-update" data-id="${row.id}">
                                <i class="fa-solid fa-pen"></i>
                            </button>
                            <button type="button" class="btn btn-outline-danger btn-icon-circle-sm lead-row-delete-btn" data-id="${row.id}">
                                <i class="fa-solid fa-trash"></i>
                            </button>
                        </div>
                    </td>
                    <td>${row.party_name}</td>
                    <td>${row.party_mono}</td>
                    <td>${row.property_name}</td>
                    <td>${row.builder_name}</td>
                    <td>${row.reference}</td>
                    <td>${row.party_profile}</td>
                    <td>${row.document}</td>
                    <td>${row.document_check}</td>
                    <td>${row.bank}</td>
                    <td>
                        <div class="button-items">
                            <button type="button" class="btn btn-outline-primary show-cost-btn" data-id="${row.id}">
                                ${row.cost.toLocaleString()}
                            </button>
                        </div>
                    </td>
                    <td>
                        <div class="button-items">
                            <button type="button" class="btn btn-outline-primary show-follow-up-btn" data-id="${row.id}">
                                ${row.follow_up.length > 0 ? "More" : "None"}
                            </button>
                        </div>
                    </td>
                    <td>
                        <div class="button-items">
                            ${createStatusButton(row.status)}
                        </div>
                    </td>
                `;
                tableBody.appendChild(tr);
            });

        } catch (err) {
            console.error("❌ Error fetching data:", err);
        }
    };

    // Event delegation for delete, edit, cost, and follow-up actions
    tableBody.addEventListener('click', async (e) => {
        const target = e.target.closest('button');
        if (!target) return;

        const id = target.getAttribute('data-id');

        if (target.classList.contains('lead-row-delete-btn')) {
            if (confirm("Are you sure you want to delete this data?")) {
                try {
                    const response = await fetch(
                        `https://loantest.innovatixtechnologies.com/account/example-app/public/api/form-delete/admin/${id}`,
                        {
                            method: 'DELETE',
                            headers: {
                                "Accept": "application/json",
                                "Authorization": `Bearer ${token}`
                            }
                        }
                    );
                    const result = await response.json();
                    if (result.message.includes("deleted successfully")) {
                        target.closest('tr').remove();
                    } else {
                        alert("❌ Failed to delete data.");
                        console.error(result);
                    }
                } catch (err) {
                    console.error("❌ Error deleting data:", err);
                }
            }

        } else if (target.classList.contains('direct-data-update')) {
            window.location.href = `update-direct-lead.html?id=${id}`;

        } else if (target.classList.contains('show-cost-btn')) {
            window.location.href = `party-cost.html?id=${id}`;

        } else if (target.classList.contains('show-follow-up-btn')) {
            window.location.href = `party-followup.html?id=${id}`;
        }
    });

    // Load data on page ready
    loadData();
});
