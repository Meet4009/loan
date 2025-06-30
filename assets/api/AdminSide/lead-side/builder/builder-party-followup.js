const token = localStorage.getItem("token");
if (!token) {
    window.location.href = "../../index.html";
}

async function loadFollowUpData() {
    const tableBody = document.querySelector('#follow-up-table tbody');

    const id = new URLSearchParams(window.location.search).get('id');
    if (!id) {
        showAlert('No ID provided in URL parameters','error');
        return;
    }

    try {
        const response = await fetch(
            `https://loantest.innovatixtechnologies.com/account/example-app/public/api/builder-follow-up-list-admin/${id}`,
            {
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Accept': 'application/json'
                }
            }
        );

        if (!response.ok) {
            showAlert(`Server responded with status ${response.status}`);
            tableBody.innerHTML = '<tr><td colspan="5">Failed to load follow-up data.</td></tr>';
            return;
        }

        const { data: followUps } = await response.json();

        // Clear old rows
        tableBody.innerHTML = '';

        if (Array.isArray(followUps) && followUps.length > 0) {
            followUps.forEach(item => {
                const row = document.createElement('tr');
                row.innerHTML = `
                    <td>${sanitize(item.builder_id)}</td>
                    <td>${sanitize(item.start_date)}</td>
                    <td>${sanitize(item.end_date)}</td>
                    <td>${sanitize(item.property)}</td>
                    <td>${sanitize(item.description)}</td>
                `;
                tableBody.appendChild(row);
            });
        } else {
            tableBody.innerHTML = '<tr><td colspan="5">No follow-up data found.</td></tr>';
        }

    } catch (error) {
        showAlert('Error loading follow-up data');
        tableBody.innerHTML = '<tr><td colspan="5">Failed to load follow-up data.</td></tr>';
    }
}

// Utility: Basic sanitizer for HTML output
function sanitize(str) {
    return String(str ?? '').replace(/[&<>"']/g, function (m) {
        return ({
            '&': '&amp;',
            '<': '&lt;',
            '>': '&gt;',
            '"': '&quot;',
            "'": '&#39;'
        })[m];
    });
}

// Call when DOM ready
document.addEventListener('DOMContentLoaded', loadFollowUpData);
