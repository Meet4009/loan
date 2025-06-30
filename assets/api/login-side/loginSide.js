const token = localStorage.getItem("token");
if (!token) {
    showAlert("Please log in again.", "error");
    window.location.href = "../index.html"; // Redirect if no token
}
document.addEventListener("DOMContentLoaded", function () {
    fetch("https://loantest.innovatixtechnologies.com/account/example-app/public/api/loginside-list", {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${localStorage.getItem("token")}`
        }
    })
        .then(response => response.json())
        .then(result => {
            const data = result.data;

            const tableBody = document.querySelector("#tech-companies-1 tbody");

            data.forEach((item, index) => {
                const row = document.createElement("tr");

                row.innerHTML = `
                <td>${item.id || index + 1}</td>
                <td>${item.date || " - "}</td>
                <td>${item.party_name || " - "}</td>
                <td>${item.property_name || " - "}</td>
                <td>    
                    <div class="button-items">
                        <button type="button" class="btn btn-outline-info btn-icon-circle-sm update-login-list-btn" data-id="${item.id}"><i class="fa-solid fa-pen"></i></button>
                        <button type="button" class="btn btn-outline-danger btn-icon-circle-sm delete-login-list-btn" data-id="${item.id}"><i class="fa-solid fa-trash"></i></button>
                    </div>
                </td>
                <td>${item.area || " - "}</td>
                <td>${item.mo_no || " - "}</td>
                <td>${item.company_number || " - "}</td>
                <td>${item.product || " - "}</td>
                <td>${item.loan || " - "}</td>
                <td>${item.docu || " - "}</td>
                <td>${item.chaque || " - "}</td>
                <td>${item.ap || " - "}</td>
                <td>${item.st || " - "}</td>
                <td>${item.hi || " - "}</td>
                <td>${item.b || " - "}</td>
                <td>${item.tcr_vr || " - "}</td>
                <td>${item.fi || " - "}</td>
                <td>${item.submit || " - "}</td>
                <td>${item.mitesh || " - "}</td>
                <td>${item.book || " - "}</td>
                <td>${item.hg || " - "}</td>
                <td>${item.remark || " - "}</td>
                <td>${item.hed || " - "}</td>
                <td>${item.refrence || " - "}</td>
                <td>${item.builder_name || " - "}</td>
                <td>${item.rlf || " - "}</td>
                <td>${item.session == 1 ? "Yes" : "No" || " - "}</td>
            `;
                tableBody.appendChild(row);
            });

            // Add click listeners to all delete buttons
            document.querySelectorAll('.delete-login-list-btn').forEach(button => {
                button.addEventListener('click', () => {
                    const id = button.getAttribute('data-id');
                    showConfirm("Are you sure you want to delete this data?", () => {
                        fetch(`https://loantest.innovatixtechnologies.com/account/example-app/public/api/loginside-delete/${id}`, {
                            method: 'DELETE',
                            headers: {
                                "Accept": "application/json",
                                "Authorization": `Bearer ${localStorage.getItem('token')}`
                            }
                        })
                            .then(response => {
                                if (response.ok) {
                                    showAlert("Data deleted successfully!", "success");
                                    setTimeout(() => window.location.reload(), 1200);
                                } else {
                                    showAlert("Failed to delete data.", "error");
                                }
                            })
                            .catch(() => {
                                showAlert("Error deleting data.", "error");
                            });
                    });
                });
            });
            // update button functionality
            document.querySelectorAll('.update-login-list-btn').forEach(button => {
                button.addEventListener('click', () => {
                    const id = button.getAttribute('data-id');
                    window.location.href = `../login-side/update-login.html?id=${id}`;
                });
            });

        })
        .catch(() => {
            showAlert("Error fetching data.", "error");
        });
});