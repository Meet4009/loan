document.addEventListener("DOMContentLoaded", () => {
    const token = localStorage.getItem("token");
    if (!token) {
        window.location.href = "../../../index.html";
        return;
    }

    const tbody = document.querySelector("#builder-list-table tbody");
    const apiBase = "https://loantest.innovatixtechnologies.com/account/example-app/public/api";

    const statusButton = (status) => {
        const styles = {
            "Done": "success",
            "Pending": "primary",
            "Hold": "warning",
            "Reject": "danger"
        };
        const style = styles[status] || "secondary";
        return `<button type="button" class="btn btn-outline-${style}">${status}</button>`;
    };

    // ✅ Fetch builder list
    fetch(`${apiBase}/builder-index-list-admin`, {
        method: "GET",
        headers: {
            "Authorization": `Bearer ${token}`,
            "Accept": "application/json"
        }
    })
        .then(async response => {
            const raw = await response.text();
            try {
                const json = JSON.parse(raw);
                if (!response.ok) throw new Error(json.message || response.statusText);
                return json.data || [];
            } catch (e) {
                console.error("JSON parse error:", e, "Raw response:", raw);
                throw new Error("Invalid JSON from server");
            }
        })
        .then(data => {
            tbody.innerHTML = ""; // Clear any rows

            if (!Array.isArray(data) || !data.length) {
                tbody.innerHTML = `<tr><td colspan="15" class="text-center">No data found.</td></tr>`;
                return;
            }

            const rows = data.map(item => `
                <tr data-id="${item.id}">
                    <td>${item.id}</td>
                    <td>${item.date}</td>
                    <td>
                        <div class="button-items">
                            <button type="button" class="btn btn-outline-info btn-icon-circle-sm action-edit"><i class="fa-solid fa-pen"></i></button>
                            <button type="button" class="btn btn-outline-danger btn-icon-circle-sm action-delete"><i class="fa-solid fa-trash"></i></button>
                        </div>
                    </td>
                    <td>${item.builder_name}</td>
                    <td>${item.party_name}</td>
                    <td>${item.party_mono}</td>
                    <td>${item.property_name}</td>
                    <td>${item.reference}</td>
                    <td>${item.party_profile}</td>
                    <td>${item.document}</td>
                    <td>${item.document_check}</td>
                    <td>${item.bank}</td>
                    <td>
                        <button type="button" class="btn btn-outline-primary action-cost">
                            ${Number(item.cost).toLocaleString()}
                        </button>
                    </td>
                    <td>
                        <button type="button" class="btn btn-outline-primary action-followup">
                            ${item.follow_up?.length > 0 ? "More" : "None"}
                        </button>
                    </td>
                    <td>
                        ${statusButton(item.dropdown)}
                    </td>
                </tr>
            `).join("");
            tbody.innerHTML = rows;
        })
        .catch(error => {
            console.error("Fetch error:", error);
            tbody.innerHTML = `<tr><td colspan="15" class="text-center">Error loading data: ${error.message}</td></tr>`;
            if (error.message.includes("401") || error.message.includes("403")) {
                localStorage.removeItem("token");
                window.location.href = "index.html"
            }
        });

    // ✅ Use event delegation for all buttons
    tbody.addEventListener('click', (e) => {
        const row = e.target.closest('tr');
        const id = row?.dataset.id;
        if (!id) return;

        if (e.target.closest('.action-delete')) {
            if (confirm("Are you sure you want to delete this data?")) {
                fetch(`${apiBase}/builder-delete-admin/${id}`, {
                    method: 'DELETE',
                    headers: {
                        "Accept": "application/json",
                        "Authorization": `Bearer ${token}`
                    }
                })
                    .then(res => res.json())
                    .then(result => {
                        console.log("Delete response:", result);
                        if (result.message?.includes("deleted")) {
                            row.remove();
                        } else {
                            alert("Delete failed: " + (result.message || "Unknown error"));
                        }
                    })
                    .catch(err => {
                        console.error("Delete error:", err);
                        alert("Error deleting data.");
                    });
            }
        }

        else if (e.target.closest('.action-cost')) {
            window.location.href = `../builder-party-cost.html?id=${id}`;
        }

        else if (e.target.closest('.action-followup')) {
            window.location.href = `../builder-party-followup.html?id=${id}`;
        }

        else if (e.target.closest('.action-edit')) {
            window.location.href = `update-kamlesh-builder.html?id=${id}`;
        }
    });

});
