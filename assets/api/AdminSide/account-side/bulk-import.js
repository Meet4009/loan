
// bulk inport
const token = localStorage.getItem("token"); // Replace with actual token logic if needed
if (!token) {
    window.location.href = "../index.html";
}

document.addEventListener("DOMContentLoaded", function () {
    const fileInput = document.getElementById("fileUpload");
    const submitBtn = document.getElementById("submitCsv");

    submitBtn.addEventListener("click", function () {
        const file = fileInput.files[0];

        if (!file) {
            alert("Please select a CSV file before submitting.");
            return;
        }

        const formData = new FormData();
        formData.append("csv_file", file);

        fetch("https://loantest.innovatixtechnologies.com/account/example-app/public/api/import-csv/admin", {
            method: "POST",
            headers: {
                "Authorization": `Bearer ${token}`
            },
            body: formData
        })
            .then(response => response.json())
            .then(data => {
                if (data.message) {
                    alert(data.message);
                    window.location.href = "index.html"; // Redirect to list page
                } else {
                    alert("Upload completed with no message.");
                }

                if (data.errors && data.errors.length > 0) {
                    throw new Error("Errors:", data.errors);
                }
            })
            .catch(error => {
                throw new Error("Upload failed:", error);
            });
    });


    document.getElementById('cancelCsv').addEventListener('click', function () {
        window.location.reload();
    });
});
