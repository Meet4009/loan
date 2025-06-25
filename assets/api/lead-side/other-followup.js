document.addEventListener("DOMContentLoaded", function () {
    const urlParams = new URLSearchParams(window.location.search);
    const id = urlParams.get('id');
    
    if (!id) {
        console.error('No ID provided in URL parameters');
        return;
    }
   
    fetchFollowUpData(id);
});
 
function fetchFollowUpData(id) {
    fetch(`https://loantest.innovatixtechnologies.com/account/example-app/public/api/otherfollowup-list/${id}`, {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${localStorage.getItem("token")}`,
        },
    })
        .then(response => response.json())
        .then(result => {
            if (result.message === "Follow-up data fetched successfully" && result.data.length > 0) {
                const tableBody = document.querySelector("#party-follow-up-table tbody");
                tableBody.innerHTML = ""; // Clear any existing rows
                
                result.data.forEach((item) => {
                    const row = `
                        <tr data-id="${item.id}">
                            <td>${item.builder_id}</td>
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
                    `;
                        tableBody.insertAdjacentHTML("beforeend", row);
                });
            } else {
                console.error("No data found or error in response.");
            }
        })
        .catch(error => {
            console.error("Error fetching follow-up data:", error);
        });
}