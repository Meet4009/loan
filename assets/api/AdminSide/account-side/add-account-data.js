document.addEventListener('DOMContentLoaded', () => {
    const token = localStorage.getItem("token");
    const apiUrl = "https://loantest.innovatixtechnologies.com/account/example-app/public/api/account-data-admin";

    const getValue = id => document.getElementById(id)?.value?.trim() || '  -  ' ;
    const getNumber = id => parseInt(getValue(id)) || 0;

    document.querySelector('#add_acc_data').addEventListener('submit', async (e) => {
        e.preventDefault();

        const bodyData = {
            bank: getValue("bank"),
            file_no: getValue("file_no"),
            date: getValue("date"),
            f_number: getValue("f_number"),
            mo_no: getValue("mo_no"),
            party_name: getValue("party_name"),
            project_name: getValue("project_name"),
            product: getValue("product"),
            bhl_to: getValue("bhl_to"),
            top_up: getNumber("top_up"),
            total_fees: getNumber("total_fees"),
            ap_1: getNumber("ap_1"),
            ap_1_date: getValue("ap_1_date"),
            status: getValue("status"),
            pf: getNumber("pf"),
            pf_parat: getNumber("pf_parat"),
            pf_parat_date: getValue("pf_parat_date"),
            payment_2: getNumber("payment_2"),
            payment_2_date: getValue("payment_2_date"),
            payment_3: getNumber("payment_3"),
            payment_3_date: getValue("payment_3_date"),
            kasar: getNumber("kasar"),
            morgej_parat: getNumber("morgej_parat"),
            morgej_parat_date: getValue("morgej_parat_date"),
            agreement_parat: getValue("agreement_parat"),
            agreement_parat_date: getValue("agreement_parat_date"),
            payout_amount: getNumber("payout_amount"),
            payout_date: getValue("payout_date"),
            payout_remark: getValue("payout_remark"),
            ap_parat: getValue("ap_parat"),
            ap_parat_date: getValue("ap_parat_date"),
            remark_payment: getValue("remark_payment"),
            remark: getValue("remark"),
            remark_1: getValue("remark_1"),
            remark_2: getValue("remark_2"),
            remark_3: getValue("remark_3")
        };

        try {
            const response = await fetch(apiUrl, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${token}`
                },
                body: JSON.stringify(bodyData)
            });

            const result = await response.json();

            if (response.ok) {
                // ✅ Success - redirect
                window.location.href = "index.html";
            } else {
                console.error("❌ Failed to insert:", result);
                alert(`Error: ${result.message || "Unknown error"}`);
            }

        } catch (error) {
            console.error("❌ Network Error:", error);
            alert("Network error occurred. Please try again.");
        }
    });

    document.getElementById("cancelAccBtn").addEventListener("click", () => {
        window.location.href = "index.html";
    });
});
