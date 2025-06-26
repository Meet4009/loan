// Function to fetch notification data
async function fetchNotificationData(startDate, endDate) {
    try {
        const url = new URL('https://loantest.innovatixtechnologies.com/account/example-app/public/api/form-notification');
        url.searchParams.append('start_date', startDate);
        url.searchParams.append('end_date', endDate);

        const response = await fetch(url, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${localStorage.getItem('token')}`
            }
        });

        const result = await response.json();
        const tbody = document.querySelector('#notification-table tbody');
        tbody.innerHTML = '';

        result.data.forEach((item, index) => {
            const row = document.createElement('tr');
            row.innerHTML = `
                <!-- <td>${index + 1}</td>-->
                <td>${item.follow_up_id}</td>
                <td>${item.source || ''}</td>
                <td>${item.start_date || ''}</td>
                <td>${item.end_date || ''}</td>
                <td>${item.property || ''}</td>
                <td>${item.description || ''}</td>
                <td>
                    <div class="button-items">
                        <button type="button" class="btn btn-outline-success waves-effect waves-light delete-follow-up" data-id="${item.follow_up_id}" data-source="${item.source}">
                            Complete
                        </button>
                    </div>
                </td>
            `;
            tbody.appendChild(row);
        });
        // 🔴 Add click listeners to all delete buttons
        document.querySelectorAll('.delete-follow-up').forEach(button => {
            button.addEventListener('click', () => {
                const id = button.getAttribute('data-id');
                const source = button.getAttribute('data-source').toLowerCase();

                showConfirm("Are you sure you want to Complete this follow up?", () => {
                    fetch(`https://loantest.innovatixtechnologies.com/account/example-app/public/api/delete/${source}/${id}`, {
                        method: 'DELETE',
                        headers: {
                            "Accept": "application/json",
                            "Authorization": `Bearer ${localStorage.getItem('token')}`
                        }
                    })
                        .then(res => res.json())
                        .then(result => {
                            if (result.message === "Follow-up deleted successfully.") {
                                button.closest('tr').remove(); // remove row from UI
                                showAlert("Follow-up completed!", "success");
                            } else {
                                showAlert("Delete failed.", "error");
                            }
                        })
                        .catch(err => {
                            showAlert("Delete error", "error");
                        });
                });
            });
        })
    } catch (error) {
        showAlert('Error fetching notifications', 'error');
    }
}

// Set default dates (current month)
document.addEventListener('DOMContentLoaded', function () {
    const today = new Date();
    const firstDay = new Date(today.getFullYear(), today.getMonth(), 2);
    const lastDay = new Date(today.getFullYear(), today.getMonth() + 1, 1);

    // Format dates for input fields
    const formatDate = (date) => date.toISOString().split('T')[0];

    document.getElementById('nstartDate').value = formatDate(firstDay);
    document.getElementById('nendDate').value = formatDate(lastDay);

    // Fetch data for current month
    fetchNotificationData(formatDate(firstDay), formatDate(lastDay));
});

// Handle filter button click
document.querySelector('.apply-notification-filter').addEventListener('click', function () {
    const startDate = document.getElementById('nstartDate').value;
    const endDate = document.getElementById('nendDate').value;

    if (!startDate || !endDate) {
        return;
    }

    fetchNotificationData(startDate, endDate);
});

