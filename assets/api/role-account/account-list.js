(async () => {
    const API_BASE_URL = "https://loantest.innovatixtechnologies.com/account/example-app/public/api";
    const token = localStorage.getItem("token");
    const userRole = localStorage.getItem("userRole");

    if (!token) {
        showAlert("Please log in again.", "error");
        window.location.href = "../index.html";
        return;
    }

    const tbody = document.querySelector("#tech-companies-1 tbody");

    try {
        const response = await fetch(`${API_BASE_URL}/account-listper`, {
            method: "GET",
            headers: {
                "Accept": "application/json",
                "Authorization": `Bearer ${token}`
            }
        });

        if (!response.ok) {
            showAlert("Failed to load data", "error");
            return;
        }

        const { data } = await response.json();
        tbody.innerHTML = ""; // Clear existing rows

        data.forEach(item => {
            tbody.insertAdjacentHTML("beforeend", renderTableRow(item));
        });

        attachButtonEventListeners();

    } catch (err) {
        showAlert("Error loading data", "error");
    }

    function renderTableRow(item) {
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
        const statusMap = {
            completed: "success",
            pending: "primary",
            processing: "warning",
            reject: "danger"
        };
        const btnClass = statusMap[status] || "secondary";
        return `<button type="button" class="btn btn-outline-${btnClass}">${status}</button>`;
    }

    function attachButtonEventListeners() {
        document.querySelectorAll(".update-btn").forEach(button => {
            button.addEventListener("click", () => handleRoleBasedAction(userRole, button.dataset.id, "update"));
        });

        document.querySelectorAll(".delete-btn").forEach(button => {
            button.addEventListener("click", () => handleRoleBasedAction(userRole, button.dataset.id, "delete", button));
        });

        document.querySelectorAll("#add-data").forEach(button => {
            button.addEventListener("click", () => handleRoleBasedAction(userRole, null, "add"));
        });
    }
})();

async function handleRoleBasedAction(role, id, action, button = null) {
    try {
        const response = await fetch("https://loantest.innovatixtechnologies.com/account/example-app/public/api/role-list", {
            method: "GET",
            headers: {
                "Content-Type": "application/json"
            }
        });

        if (!response.ok) {
            showAlert(`Failed to fetch roles: ${response.status}`, "error");
            return;
        }

        const { data } = await response.json();
        const matchedRole = data.find(item => item.name === role);

        if (!matchedRole) {
            showAlert("Role not found", "error");
            return;
        }

        switch (action) {
            case "add":
                handleAddAccount(matchedRole);
                break;
            case "update":
                handleUpdateAccount(matchedRole, id);
                break;
            case "delete":
                await handleDeleteAccount(matchedRole, id, button);
                break;
            default:
                showAlert("Invalid action", "error");
        }
    } catch (error) {
        showAlert("Failed to load roles", "error");
    }
}

function handleAddAccount(role) {
    if (role.permissions[0].can_add === 0) {
        showAlert("You don't have permission to add data", "error");
        return;
    }
    window.location.href = "adddata.html";
}

function handleUpdateAccount(role, id) {
    if (role.permissions[0].can_update === 0) {
        showAlert("You don't have permission to update data", "error");
        return;
    }
    window.location.href = `update-account.html?id=${id}`;
}

async function handleDeleteAccount(role, id, button) {
    if (role.permissions[0].can_delete === 0) {
        showAlert("You don't have permission to delete data", "error");
        return;
    }

    const API_BASE_URL = "https://loantest.innovatixtechnologies.com/account/example-app/public/api";
    const token = localStorage.getItem("token");

    if (!id) {
        showAlert("ID is undefined or invalid", "error");
        return;
    }
    if (!token) {
        showAlert("Please log in again.", "error");
        return;
    }

    const doDelete = async () => {
        try {
            const response = await fetch(`${API_BASE_URL}/account/${id}`, {
                method: "DELETE",
                headers: {
                    "Accept": "application/json",
                    "Authorization": `Bearer ${token}`
                }
            });

            if (response.ok) {
                button.closest("tr").remove(); // Remove row dynamically
                showAlert("Record deleted successfully", "success");
            } else {
                const errorData = await response.json();
                showAlert(`Failed to delete record`, "error");
            }
        } catch (error) {
            showAlert(`Error: ${error.message}`, "error");
        }
    };

    if (typeof showConfirm === "function") {
        showConfirm("Are you sure you want to delete this data?", doDelete);
    } else {
        if (confirm("Are you sure you want to delete this data?")) {
            await doDelete();
        }
    }
}
