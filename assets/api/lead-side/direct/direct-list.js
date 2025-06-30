
document.addEventListener('DOMContentLoaded', () => {
    fetch('https://loantest.innovatixtechnologies.com/account/example-app/public/api/form-show', {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${localStorage.getItem('token')}`
        }
    })
        .then(response => response.json())
        .then(res => {
            if (res.message === "Data fetched successfully") {
                const tableBody = document.querySelector('#lead-list-1 tbody');
                if (!tableBody) {
                    showAlert("Table body not found!", "error");
                    return;
                }

                tableBody.innerHTML = '';

                res.data.forEach(row => {
                    
                    const tr = document.createElement('tr');
                    tr.innerHTML = `
                        <td>${row.id || ' - '}</td>
                        <td>${row.date || ' - '}</td>
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
                        <td>${row.party_name || ' - '}</td>
                        <td>${row.party_mono || ' - '}</td>
                        <td>${row.property_name || ' - '}</td>
                        <td>${row.builder_name || ' - '}</td>
                        <td>${row.reference || ' - '}</td>
                        <td>${row.party_profile || ' - '}</td>
                        <td>${row.document || ' - '}</td>
                        <td>${row.document_check || ' - '}</td>
                        <td>${row.bank || ' - '}</td>
                        <td>
                            <div class="button-items">
                                <button type="button" class="btn btn-outline-primary waves-effect waves-light show-cost-btn" data-id="${row.id}">
                                    ${row.cost.toLocaleString()}
                                </button>
                            </div>
                        </td>
                        <td>
                            <div class="button-items">
                                <button type="button" class="btn btn-outline-primary waves-effect waves-light show-follow-up-btn" data-id="${row.id}">
                                    ${row.follow_up.length > 0 ? "More" : "None"}
                                </button>
                            </div>
                        </td>
                        <td>
                            <div class="button-items">
                                ${row.status === 'Done'
                            ? `<button type="button" class="btn btn-outline-success">${row.status}</button>`
                            : row.status === 'Pending'
                                ? `<button type="button" class="btn btn-outline-primary">${row.status}</button>`
                                : row.status === 'Hold'
                                    ? `<button type="button" class="btn btn-outline-warning">${row.status}</button>`
                                    : row.status === 'Reject'
                                        ? `<button type="button" class="btn btn-outline-danger">${row.status}</button>`
                                        : `<button type="button" class="btn btn-outline-secondary">${row.status}</button>`
                        }
                            </div>
                        </td>
                    `;
                    tableBody.appendChild(tr);
                });
                // Add click listeners to all delete buttons
                document.querySelectorAll('.lead-row-delete-btn').forEach(button => {
                    button.addEventListener('click', () => {
                        const id = button.getAttribute('data-id');
                        showConfirm("Are you sure you want to delete this data?", () => {
                            fetch(`https://loantest.innovatixtechnologies.com/account/example-app/public/api/form-delete/${id}`, {
                                method: 'DELETE',
                                headers: {
                                    "Accept": "application/json",
                                    "Authorization": `Bearer ${localStorage.getItem('token')}`
                                }
                            })
                                .then(res => res.json())
                                .then(result => {
                                    if (result.message === "Data and related follow-ups deleted successfully") {
                                        button.closest('tr').remove();
                                        showAlert("Data deleted successfully!", "success");
                                    } else {
                                        showAlert("Delete failed.", "error");
                                    }
                                })
                                .catch(() => {
                                    showAlert("Error deleting data.", "error");
                                });
                        });
                    });
                })

                // Add click listeners to all cost buttons
                document.querySelectorAll('.show-cost-btn').forEach(button => {
                    button.addEventListener('click', () => {
                        const id = button.getAttribute('data-id');
                        window.location.href = `../lead-side/party-cost.html?id=${id}`;
                    });
                });

                // Add click listeners to edit buttons
                document.querySelectorAll('.direct-data-update').forEach(button => {
                    button.addEventListener('click', () => {
                        const id = button.getAttribute('data-id');
                        window.location.href = `../../lead-side/update-direct-lead.html?id=${id}`;
                    });
                });

                // Add click listeners to all follow-up buttons
                document.querySelectorAll('.show-follow-up-btn').forEach(button => {
                    button.addEventListener('click', () => {
                        const id = button.getAttribute('data-id');
                        window.location.href = `../lead-side/party-followup.html?id=${id}`;
                    });
                });
            }
        })
        .catch(() => {
            showAlert('Error fetching data.', 'error');
        });
});

