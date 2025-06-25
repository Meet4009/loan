const token = localStorage.getItem("token");
if (!token) {
    console.error("❌ No token found");
    window.location.href = "index.html"

}
// Fetch Role List Data

fetch("https://loantest.innovatixtechnologies.com/account/example-app/public/api/role-list", {
    method: "GET",
    headers: {
        "Accept": "application/json",
        "Authorization": `Bearer ${token}`
    }
})
    .then(response => {
        console.log("response", response);
        if (!response.ok) {
            throw new Error("Network response was not OK");
        }
        return response.json();

    })
    .then(data => {
    const tbody = document.querySelector("#tech-companies-1 tbody");
    tbody.innerHTML = ""; 

    data.data.forEach((item, index) => {
        let formattedDate = "N/A";
        
        if (item.created_at) { 
            try {
                const createdDate = new Date(item.created_at);
                if (!isNaN(createdDate)) {
                    formattedDate = createdDate.toLocaleString('en-US', {
                        year: 'numeric',
                        month: 'short',
                        day: 'numeric',
                        hour: '2-digit',
                        minute: '2-digit',
                        hour12: true
                    });
                }
            } catch (error) {
                console.error("Date parsing error:", error);
            }
        }

        const row = `
            <tr>
                <td>${item.name}</td>
                <td>${formattedDate}</td>
                <td>
                    <div class="button-items">
                        <button type="button" class="btn btn-outline-info btn-icon-circle-sm update-btn" data-id="${item.id}"><i class="fa-solid fa-pen"></i></button>
                        <button type="button" class="btn btn-outline-danger btn-icon-circle-sm delete-btn" data-id="${item.id}"><i class="fa-solid fa-trash"></i></button>
                    </div>
                </td>
            </tr>
        `;
        tbody.innerHTML += row;
    });
        // 🔴 Add click listeners to all delete buttons
        document.querySelectorAll('.delete-btn').forEach(button => {
            button.addEventListener('click', () => {
                const id = button.getAttribute('data-id');
                console.log("🗑️ Deleting ID:", id);

                if (confirm("Are you sure you want to delete this data?")) {
                    fetch(`https://loantest.innovatixtechnologies.com/account/example-app/public/api/role-delete/${id}`, {
                        method: 'DELETE',
                        headers: {
                            "Accept": "application/json",
                            "Authorization": `Bearer ${localStorage.getItem('token')}`
                        }
                    })
                        .then(res => res.json())
                        .then(result => {
                            if (result.success || result.message.includes("deleted")) {
                                button.closest('tr').remove(); // remove row from UI
                                console.log("Staff member deleted successfully");
                            } else {
                                console.log("Delete failed: " + result.message);
                            }
                        })
                        .catch(err => {
                            console.error('Delete error:', err);
                            console.log("Error deleting data.");
                        });
                }
            });
        })
        // 🔵 Add click listeners to all update buttons
        document.querySelectorAll('.update-btn').forEach(button => {
            button.addEventListener('click', () => {
                const id = button.getAttribute('data-id');
                window.location.href = `update-role.html?id=${id}`;
            });
        });
    });


