// Redirect if token is missing
const token = localStorage.getItem('token');
if (!token) {
    window.location.href = '../../index.html';
}

async function loadFollowUpData() {
    const tableBody = document.querySelector('#agent-follow-up-table tbody');

    // Clear any previous rows immediately
    tableBody.innerHTML = '';

    const urlParams = new URLSearchParams(window.location.search);
    const id = urlParams.get('id');

    if (!id) {
        showAlert('❌ No ID found in URL parameters');
        tableBody.innerHTML = '<tr><td colspan="6">No agent ID provided.</td></tr>';
        return;
    }

    try {
        const response = await fetch(`https://loantest.innovatixtechnologies.com/account/example-app/public/api/agent-follow-ups/admin/${id}`, {
            method: 'GET',
            headers:
                {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json'
                }
        });

        if (!response.ok) {
            showAlert(`Server error: ${response.status}`);
            tableBody.innerHTML = '<tr><td colspan="6">Failed to load follow-up data.</td></tr>';
            return;
        }

        const { data: followUps } = await response.json();

        if (!Array.isArray(followUps) || followUps.length === 0) {
            tableBody.innerHTML = '<tr><td colspan="6">No follow-up data available.</td></tr>';
            return;
        }

        // Build rows efficiently
        const rows = followUps.map(item => `
            <tr>
                <td>${sanitize(item.builder_id)}</td>
                <td>${sanitize(item.property_name)}</td>
                <td>${sanitize(item.start_date)}</td>
                <td>${sanitize(item.property)}</td>
                <td>${sanitize(item.end_date)}</td>
                <td>${sanitize(item.description)}</td>
            </tr>
        `).join('');

        tableBody.innerHTML = rows;

    } catch (error) {
        showAlert('❌ Error loading follow-up data');
        tableBody.innerHTML = '<tr><td colspan="6">Failed to load follow-up data.</td></tr>';
    }
}

// Simple text sanitizer to avoid accidental script injection
function sanitize(text) {
    return text != null ? String(text).replace(/[<>&"'`]/g, char => ({
        '<': '&lt;', '>': '&gt;', '&': '&amp;',
        '"': '&quot;', "'": '&#39;', '`': '&#96;'
    }[char])) : '';
}

// Load on DOM ready
window.addEventListener('DOMContentLoaded', loadFollowUpData);
