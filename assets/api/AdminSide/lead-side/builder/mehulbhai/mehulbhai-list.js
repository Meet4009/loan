document.addEventListener("DOMContentLoaded", function () {

    const token = localStorage.getItem("token");
    if (!token) {
        showAlert("Please log in again.", "error");
        window.location.href = "index.html" // Redirect if no token
        return;
    }
    const tbody = document.querySelector("#builder-list-table tbody");

    fetch("https://loantest.innovatixtechnologies.com/account/example-app/public/api/builder-list-admin", {
        method: "GET",
        headers: {
            "Authorization": `Bearer ${token}`,
            "Accept": "application/json",
            "Content-Type": "application/json"
        }
    })
        .then(async response => {
            // Log the raw response for debugging
            const rawResponse = await response.text();

            try {
                // Try to parse the response as JSON
                const data = JSON.parse(rawResponse);
                if (!response.ok) {
                    showAlert("faild to fatch data", "error");
                    return Promise.reject();
                }
                return data;
            } catch (e) {
                showAlert("JSON Parse Error", "error");
                return Promise.reject();
            }
        })
        .then(response => {
            tbody.innerHTML = ""; // Clear existing rows if any

            // Ensure we have an array to work with
            const data = Array.isArray(response) ? response : response.data;

            if (!Array.isArray(data)) {
                showAlert('Expected an array of builders', 'error');
                return;
            }

            data.forEach((item) => {
                const row = `
                    <tr>
                        <td>${item.id || ' - '}</td>
                        <td>${item.date || ' - '}</td>
                        <td>
                            <div class="button-items">
                                <button type="button" class="btn btn-outline-info btn-icon-circle-sm builder-data-update" data-id="${item.id}"><i class="fa-solid fa-pen"></i></button>
                                <button type="button" class="btn btn-outline-danger btn-icon-circle-sm builder-row-delete-btn" data-id="${item.id}"><i class="fa-solid fa-trash"></i></button>
                            </div>
                        </td>
                        <td>${item.builder_name || ' - '}</td>
                        <td>${item.party_name || ' - '}</td>
                        <td>${item.party_mono || ' - '}</td>
                        <td>${item.property_name || ' - '}</td>
                        <td>${item.reference || ' - '}</td>
                        <td>${item.party_profile || ' - '}</td>
                        <td>${item.document || ' - '}</td>
                        <td>${item.document_check || ' - '}</td>
                        <td>${item.bank || ' - '}</td>
                        <td>
                            <div class="button-items">
                                <button type="button" class="btn btn-outline-primary waves-effect waves-light show-cost-btn" data-id="${item.id}">
                                    ${item.cost ? item.cost.toLocaleString() : ' 0 '}
                                </button>
                            </div>
                        </td>
                        <td>
                            <div class="button-items">
                                <button type="button" class="btn btn-outline-primary waves-effect waves-light show-follow-up-btn" data-id="${item.id}">
                                    ${item.follow_up.length > 0 ? "More" : "None"}
                                </button>
                            </div>
                        </td>
                        <td>
                            <div class="button-items">
                                ${item.dropdown === 'Done'
                        ? `<button type="button" class="btn btn-outline-success">${item.dropdown}</button>`
                        : item.dropdown === 'Pending'
                            ? `<button type="button" class="btn btn-outline-primary">${item.dropdown}</button>`
                            : item.dropdown === 'Hold'
                                ? `<button type="button" class="btn btn-outline-warning">${item.dropdown}</button>`
                                : item.dropdown === 'Reject'
                                    ? `<button type="button" class="btn btn-outline-danger">${item.dropdown}</button>`
                                    : `<button type="button" class="btn btn-outline-secondary">${item.dropdown}</button>`
                    }
                            </div>
                        </td>
                    </tr>
                `;
                tbody.insertAdjacentHTML("beforeend", row);
            });

            // Add click listeners to delete buttons
            document.querySelectorAll('.builder-row-delete-btn').forEach(button => {
                button.addEventListener('click', () => {
                    const id = button.getAttribute('data-id');
                    showConfirm("Are you sure you want to delete this data?", () => {
                        fetch(`https://loantest.innovatixtechnologies.com/account/example-app/public/api/builder-delete-admin/${id}`, {
                            method: 'DELETE',
                            headers: {
                                "Accept": "application/json",
                                "Authorization": `Bearer ${localStorage.getItem('token')}`
                            }
                        })
                            .then(res => res.json())
                            .then(result => {
                                if (result.message === "Data and related follow-ups deleted successfully") {
                                    showAlert("Deleted successfully", "success");
                                    setTimeout(() => {
                                        window.location.reload();
                                    }, 1000);
                                } else {
                                    showAlert("Delete failed.", "error");
                                }
                            })
                            .catch(err => {
                                showAlert("Error deleting data.", "error");
                            });
                    });
                });
            })
            // 🔴 Add click listeners to all cost buttons
            document.querySelectorAll('.show-cost-btn').forEach(button => {
                button.addEventListener('click', () => {
                    const id = button.getAttribute('data-id');
                    window.location.href = `../builder-party-cost.html?id=${id}`;
                });
            });
            // 🔴 Add click listeners to all follow-up buttons
            document.querySelectorAll('.show-follow-up-btn').forEach(button => {
                button.addEventListener('click', () => {
                    const id = button.getAttribute('data-id');
                    window.location.href = `../builder-party-followup.html?id=${id}`;
                });
            });
            // Add click listeners to edit buttons
            document.querySelectorAll('.builder-data-update').forEach(button => {
                button.addEventListener('click', () => {
                    const id = button.getAttribute('data-id');
                    window.location.href = `update_mehul_builder.html?id=${id}`;
                });
            });
        })
        .catch(error => {
            showAlert("Error fetching data: ", "error");
            tbody.innerHTML = `<tr><td colspan="15" class="text-center">Error loading data. Please check your connection and try again. (${error.message})</td></tr>`;

            // If token is invalid, redirect to login
            if (error.message && (error.message.includes("401") || error.message.includes("403"))) {
                localStorage.removeItem("token");
                window.location.href = "index.html"
            }
        });
});

