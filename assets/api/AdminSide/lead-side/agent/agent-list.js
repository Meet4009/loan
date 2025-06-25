// ✅ Check auth token and redirect if missing
const token = localStorage.getItem('token');
if (!token) {
    window.location.href = '../../index.html';
}

document.addEventListener("DOMContentLoaded", fetchAgentList);

// ✅ Fetch agent list with async/await
async function fetchAgentList() {
    const tbody = document.querySelector('#agent-list tbody');
    tbody.innerHTML = '';

    try {
        const response = await fetch(
            "https://loantest.innovatixtechnologies.com/account/example-app/public/api/agent-list-admin",
            {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${token}`,
                },
            }
        );

        const result = await response.json();
        const agents = result.data;

        if (result.message === "Data fetched successfully" && Array.isArray(agents) && agents.length) {
            renderAgentList(agents);
        } else {
            tbody.innerHTML = '<tr><td colspan="16">No agent data found.</td></tr>';
        }

    } catch (error) {
        console.error("❌ Error fetching agent list:", error);
        tbody.innerHTML = '<tr><td colspan="16">Failed to load agent list.</td></tr>';
    }
}

// ✅ Render agent list efficiently
function renderAgentList(data) {
    const tbody = document.querySelector('#agent-list tbody');

    const rows = data.map(agent => `
        <tr>
            <td>${sanitize(agent.id)}</td>
            <td>${sanitize(agent.date)}</td>
            <td>
                <div class="button-items">
                    <button type="button" class="btn btn-outline-info btn-icon-circle-sm" data-action="update" data-id="${agent.id}">
                        <i class="fa-solid fa-pen"></i>
                    </button>
                    <button type="button" class="btn btn-outline-danger btn-icon-circle-sm" data-action="delete" data-id="${agent.id}">
                        <i class="fa-solid fa-trash"></i>
                    </button>
                </div>
            </td>
            <td>${sanitize(agent.agent_name)}</td>
            <td>${sanitize(agent.party_name)}</td>
            <td>${sanitize(agent.party_mono)}</td>
            <td>${sanitize(agent.property_name)}</td>
            <td>${sanitize(agent.builder_name)}</td>
            <td>${sanitize(agent.reference)}</td>
            <td>${sanitize(agent.party_profile)}</td>
            <td>${sanitize(agent.document)}</td>
            <td>${sanitize(agent.document_check)}</td>
            <td>${sanitize(agent.bank)}</td>
            <td>
                <button type="button" class="btn btn-outline-primary waves-effect show-cost-btn" data-id="${agent.id}">
                    ${Number(agent.cost).toLocaleString()}
                </button>
            </td>
            <td>
                <button type="button" class="btn btn-outline-primary waves-effect show-follow-up-btn" data-id="${agent.id}">
                    ${agent.follow_up?.length > 0 ? 'More' : 'None'}
                </button>
            </td>
            <td>
                ${renderStatusButton(agent.dropdown)}
            </td>
        </tr>
    `).join('');

    tbody.innerHTML = rows;

    // ✅ Delegate all clicks on the table
    tbody.addEventListener('click', handleTableClick);
}

// ✅ Handle all button clicks with event delegation
async function handleTableClick(e) {
    const btn = e.target.closest('button');
    if (!btn) return;

    const id = btn.dataset.id;
    const action = btn.dataset.action;

    if (action === 'update') {
        window.location.href = `update-agent.html?id=${id}`;
    } else if (action === 'delete') {
        if (confirm("Are you sure you want to delete this data?")) {
            try {
                const response = await fetch(
                    `https://loantest.innovatixtechnologies.com/account/example-app/public/api/agent-delete-admin/${id}`,
                    {
                        method: 'DELETE',
                        headers: {
                            "Accept": "application/json",
                            "Authorization": `Bearer ${token}`,
                        }
                    }
                );
                const result = await response.json();
                if (result.message.includes("deleted successfully")) {
                    btn.closest('tr').remove();
                } else {
                    alert("Failed to delete agent.");
                }
            } catch (err) {
                console.error("❌ Delete error:", err);
            }
        }
    } else if (btn.classList.contains('show-cost-btn')) {
        window.location.href = `agent-cost.html?id=${id}`;
    } else if (btn.classList.contains('show-follow-up-btn')) {
        window.location.href = `agent-followup.html?id=${id}`;
    }
}

// ✅ Render dropdown status button with correct style
function renderStatusButton(status) {
    const classes = {
        'Done': 'success',
        'Pending': 'primary',
        'Hold': 'warning',
        'Reject': 'danger'
    };
    const btnClass = classes[status] || 'secondary';
    return `<button type="button" class="btn btn-outline-${btnClass}">${sanitize(status)}</button>`;
}

// ✅ Basic HTML sanitizer
function sanitize(text) {
    return text != null ? String(text).replace(/[<>&"'`]/g, char => ({
        '<': '&lt;', '>': '&gt;', '&': '&amp;',
        '"': '&quot;', "'": '&#39;', '`': '&#96;'
    }[char])) : '';
}
