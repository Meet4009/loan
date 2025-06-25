document.addEventListener("DOMContentLoaded", () => {
    const urlParams = new URLSearchParams(window.location.search);
    const id = urlParams.get('id');

    if (!id) {
        console.error('No ID provided in URL parameters');
        return;
    }

    const token = localStorage.getItem('token');
    if (!token) {
        window.location.href = '../../index.html';
        return;
    }

    fetchFollowUpData(id, token);
});

async function fetchFollowUpData(id, token) {
    const apiUrl = `https://loantest.innovatixtechnologies.com/account/example-app/public/api/follow-up-list/admin/${id}`;

    try {
        const response = await fetch(apiUrl, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${token}`,
            },
        });

        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }

        const result = await response.json();

        if (result.message === "Follow-up data fetched successfully" && Array.isArray(result.data) && result.data.length > 0) {
            const tableBody = document.querySelector("#party-follow-up-table tbody");
            if (!tableBody) {
                console.error("Table body not found!");
                return;
            }

            tableBody.innerHTML = ""; // Clear old rows

            result.data.forEach(item => {
                tableBody.insertAdjacentHTML("beforeend", `
                    <tr data-id="${item.id}">
                        <td>${item.form_id}</td>
                        <td>
                            <span class="display-value">${item.start_date}</span>
                            <input type="date" class="form-control edit-input" value="${item.start_date}" style="display:none">
                        </td>
                        <td>
                            <span class="display-value">${item.end_date}</span>
                            <input type="date" class="form-control edit-input" value="${item.end_date}" style="display:none">
                        </td>
                        <td>
                            <span class="display-value">${item.property}</span>
                            <input type="text" class="form-control edit-input" value="${item.property}" style="display:none">
                        </td>
                        <td>
                            <span class="display-value">${item.description}</span>
                            <input type="text" class="form-control edit-input" value="${item.description}" style="display:none">
                        </td>
                    </tr>
                `);
            });
        } else {
            console.warn("No follow-up data found.");
        }
    } catch (error) {
        console.error("Error fetching follow-up data:", error);
    }
}
