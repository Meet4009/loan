document.addEventListener("DOMContentLoaded", function () {

    const token = localStorage.getItem("token");
    if (!token) {
        window.location.href = "index.html" // Redirect if no token
        return;
    }
    const tbody = document.querySelector("#builder-list-table tbody");

    // Add custom alert styles and functions
    const style = document.createElement('style');
    style.textContent = `
        .custom-alert {
            position: fixed;
            top: 20px;
            left: 50%;
            transform: translateX(-50%) translateY(-10px);
            z-index: 1000;
            padding: 15px 20px;
            border-radius: 5px;
            min-width: 200px;
            max-width: 300px;
            color: white;
            font-family: Arial, sans-serif;
            font-size: 14px;
            box-shadow: 0 2px 5px rgba(0,0,0,0.2);
            opacity: 0;
            transition: opacity 0.3s ease, transform 0.3s ease;
        }
        .custom-alert.show {
            opacity: 1;
            transform: translateX(-50%) translateY(0);
        }
        .custom-alert.success {
            background-color: #28a745;
        }
        .custom-alert.error {
            background-color: #dc3545;
        }
        .custom-modal {
            position: fixed;
            top: 50%;
            left: 50%;
            transform: translate(-50%, -50%);
            background: white;
            padding: 20px;
            border-radius: 5px;
            z-index: 2000;
            box-shadow: 0 4px 8px rgba(0,0,0,0.2);
            text-align: center;
            max-width: 300px;
        }
        .custom-modal button {
            margin: 10px;
            padding: 8px 16px;
            border: none;
            border-radius: 3px;
            cursor: pointer;
            color: white;
        }
        .custom-modal .btn-yes {
            background: #dc3545;
        }
        .custom-modal .btn-no {
            background: #6c757d;
        }
    `;
    document.head.appendChild(style);

    const showAlert = (message, type = 'error') => {
        const alertDiv = document.createElement('div');
        alertDiv.className = `custom-alert ${type}`;
        alertDiv.textContent = message;
        document.body.appendChild(alertDiv);
        setTimeout(() => alertDiv.classList.add('show'), 10);
        setTimeout(() => {
            alertDiv.classList.remove('show');
            setTimeout(() => alertDiv.remove(), 300);
        }, 3000);
    };

    const showConfirm = (message, onYes, onNo) => {
        const modal = document.createElement('div');
        modal.className = 'custom-modal';
        modal.innerHTML = `
            <div style="margin-bottom: 10px;">${message}</div>
            <button class="btn-yes">Yes</button>
            <button class="btn-no">No</button>
        `;
        document.body.appendChild(modal);
        modal.querySelector('.btn-yes').onclick = () => {
            modal.remove();
            if (onYes) onYes();
        };
        modal.querySelector('.btn-no').onclick = () => {
            modal.remove();
            if (onNo) onNo();
        };
    };

    fetch("https://loantest.innovatixtechnologies.com/account/example-app/public/api/builder-index-list", {
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
                    throw new Error(`HTTP error! status: ${response.status}`);
                }
                return data;
            } catch (e) {
                showAlert("JSON Parse Error", "error");
                throw new Error("Invalid JSON response from server");
            }
        })
        .then(response => {
            tbody.innerHTML = ""; // Clear existing rows if any

            // Ensure we have an array to work with
            const data = Array.isArray(response) ? response : response.data;

            if (!Array.isArray(data)) {
                throw new Error('Expected an array of builders');
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
                        fetch(`https://loantest.innovatixtechnologies.com/account/example-app/public/api/builder-delete/${id}`, {
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
                    window.location.href = `../lead-side/builder-party-cost.html?id=${id}`;
                });
            });
            // 🔴 Add click listeners to all follow-up buttons
            document.querySelectorAll('.show-follow-up-btn').forEach(button => {
                button.addEventListener('click', () => {
                    const id = button.getAttribute('data-id');
                    window.location.href = `../lead-side/builder-party-followup.html?id=${id}`;
                });
            });
            // Add click listeners to edit buttons
            document.querySelectorAll('.builder-data-update').forEach(button => {
                button.addEventListener('click', () => {
                    const id = button.getAttribute('data-id');
                    window.location.href = `../lead-side/update-kamlesh-builder.html?id=${id}`;
                });
            });
        })
        .catch(error => {
            showAlert("Error fetching data: " + error.message, "error");
            tbody.innerHTML = `<tr><td colspan="15" class="text-center">Error loading data. Please check your connection and try again. (${error.message})</td></tr>`;

            // If token is invalid, redirect to login
            if (error.message.includes("401") || error.message.includes("403")) {
                localStorage.removeItem("token");
                window.location.href = "index.html"
            }
        });
});

