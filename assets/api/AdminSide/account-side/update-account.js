document.addEventListener('DOMContentLoaded', async () => {
    const urlParams = new URLSearchParams(window.location.search);
    const id = urlParams.get('id');

    if (!id) return;

    const token = localStorage.getItem('token');
    if (!token) {
        window.location.href = "../index.html";
        return;
    }

    const apiBase = "https://loantest.innovatixtechnologies.com/account/example-app/public/api";

    // Helper: set form field by ID
    const setValue = (id, value) => {
        const el = document.getElementById(id);
        if (el) el.value = value ?? "";
    };

    // Helper: set dropdown option by text
    const setSelectByText = (selectId, text) => {
        const select = document.getElementById(selectId);
        if (!select) return;
        [...select.options].forEach(option => {
            if (option.text === text) select.value = option.value;
        });
    };

    // Fetch existing data
    try {
        const res = await fetch(`${apiBase}/account/admin/${id}`, {
            headers: {
                'Authorization': `Bearer ${token}`,
                'Accept': 'application/json'
            }
        });

        if (!res.ok) throw new Error(`HTTP error: ${res.status}`);
        const { data } = await res.json();
        if (!data) throw new Error('No data received');

        // Fill form
        setSelectByText("bank", data.bank);
        [
            "file_no", "date", "f_number", "mo_no", "party_name", "project_name",
            "product", "bhl_to", "top_up", "total", "total_fees", "ap_1",
            "remark_payment", "ap_1_date", "status", "pf", "remark", "pf_parat",
            "pf_parat_date", "payment_2", "payment_2_date", "payment_3", "payment_3_date",
            "kasar", "payment_baki", "morgej_parat", "morgej_parat_date",
            "m_cal", "m_diff", "stamp", "agreement_parat", "agreement_parat_date",
            "payout_amount", "payout_date", "payout_remark",
            "ap_parat", "ap_parat_date", "remark_1", "remark_2", "remark_3"
        ].forEach(field => setValue(field, data[field]));

    } catch (err) {
        console.error("Failed to fetch data:", err);
        alert("Failed to load data.");
    }

    // Handle form update
    document.getElementById('updateAccData').addEventListener('click', async (e) => {
        e.preventDefault();

        // Collect form data dynamically
        const formData = { id };
        [
            "bank", "file_no", "date", "f_number", "mo_no", "party_name",
            "project_name", "product", "bhl_to", "top_up", "total", "total_fees",
            "ap_1", "remark_payment", "ap_1_date", "status", "pf", "remark",
            "pf_parat", "pf_parat_date", "payment_2", "payment_2_date",
            "payment_3", "payment_3_date", "kasar", "payment_baki",
            "morgej_parat", "morgej_parat_date", "m_cal", "m_diff",
            "stamp", "agreement_parat", "agreement_parat_date",
            "payout_amount", "payout_date", "payout_remark",
            "ap_parat", "ap_parat_date", "remark_1", "remark_2", "remark_3"
        ].forEach(field => formData[field] = document.getElementById(field)?.value || '  -  ' );

        try {
            const res = await fetch(`${apiBase}/account-edit/admin/${id}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`,
                    'Accept': 'application/json'
                },
                body: JSON.stringify(formData)
            });

            const result = await res.json();

            if (result.message === 'Data updated successfully') {
                window.location.href = "index.html";
            } else {
                alert(result.message || "Failed to update data");
            }

        } catch (err) {
            console.error("Update failed:", err);
            alert("Error updating data.");
        }
    });

    // Cancel button
    document.getElementById("cancelUpdate").addEventListener("click", () => {
        window.location.href = "index.html";
    });
});


