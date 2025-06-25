const token = localStorage.getItem("token");
if (!token) {
    window.location.href = "../index.html"; // Redirect if no token
}

// Custom alert style and function
const style = document.createElement('style');
style.textContent = `
    .custom-alert {
        position: fixed;
        top: 20px;
        left: 50%;
        transform: translateX(-50%) translateY(-10px);
        z-index: 1000;
        padding: 15px 20px;
        border-radius: 5px;
        min-width: 200px;
        max-width: 300px;
        color: white;
        font-family: Arial, sans-serif;
        font-size: 14px;
        box-shadow: 0 2px 5px rgba(0,0,0,0.2);
        opacity: 0;
        transition: opacity 0.3s ease, transform 0.3s ease;
    }
    .custom-alert.show {
        opacity: 1;
        transform: translateX(-50%) translateY(0);
    }
    .custom-alert.success {
        background-color: #28a745;
    }
    .custom-alert.error {
        background-color: #dc3545;
    }
`;
document.head.appendChild(style);

const showAlert = (message, type = 'error') => {
    const alertDiv = document.createElement('div');
    alertDiv.className = `custom-alert ${type}`;
    alertDiv.textContent = message;
    document.body.appendChild(alertDiv);
    setTimeout(() => alertDiv.classList.add('show'), 10);
    setTimeout(() => {
        alertDiv.classList.remove('show');
        setTimeout(() => alertDiv.remove(), 300);
    }, 3000);
};

document.addEventListener("DOMContentLoaded", function () {
    document.querySelector('#loginForm').addEventListener('submit', async function (e) {
        e.preventDefault(); // prevent default form submission

        const sensionValue = document.querySelector('#sensionValue')?.value === "true" ? true : false
        


        const data = {
            date: document.getElementById("date")?.value,
            hi: document.getElementById("hi")?.value,
            party_name: document.getElementById("party_name")?.value,
            property_name: document.getElementById("property_name")?.value,
            area: document.getElementById("area")?.value,
            mo_no: document.getElementById("mo_no")?.value,
            company_number: document.getElementById("company_no")?.value,
            product: document.getElementById("product")?.value,
            loan: document.getElementById("loan")?.value,
            docu: document.getElementById("docu")?.value,
            chaque: document.getElementById("chaque")?.value,
            ap: document.getElementById("ap")?.value,
            st: document.getElementById("st")?.value,
            b: document.getElementById("b")?.value,
            tcr_vr: document.getElementById("tcr_vr")?.value,
            fi: document.getElementById("fi")?.value,
            submit: document.getElementById("submitValue")?.value,
            mitesh: document.getElementById("mitesh")?.value,
            book: document.getElementById("book")?.value,
            hg: document.getElementById("hg")?.value,
            remark: document.getElementById("remark")?.value,
            hed: document.getElementById("hed")?.value,
            refrence: document.getElementById("refrence")?.value,
            builder_name: document.getElementById("builder_name")?.value,
            rlf: document.getElementById("rlf")?.value,
            session: sensionValue
        };

        try {
            const response = await fetch("https://loantest.innovatixtechnologies.com/account/example-app/public/api/loginside-data", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${token}`
                },
                body: JSON.stringify(data)
            });
            const result = await response.json();

            if (response.ok) {
                showAlert('✅ Data inserted successfully!', 'success');
                setTimeout(() => {
                    window.location.href = "index.html";
                }, 1200);
            } else {
                showAlert(result.message || "❌ Failed to insert.", "error");
            }
        } catch (err) {
            showAlert("❌ Error occurred while inserting data.", "error");
        }
    });
});
document.getElementById("cancelLoginBtn").addEventListener("click", function () {
    window.location.href = "index.html";
});

