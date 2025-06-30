document.addEventListener('DOMContentLoaded', function () {
    const urlParams = new URLSearchParams(window.location.search);
    const id = urlParams.get('id');
    if (!id) {
        return;
    }
    const token = localStorage.getItem('token');
    if (!token) {
        showAlert("Please log in again.", "error");
        window.location.href = '../index.html';
        return;
    }
    // Fetch existing data
    fetch(`https://loantest.innovatixtechnologies.com/account/example-app/public/api/loginside-show/${id}`, {
        method: 'GET',
        headers: {
            'Authorization': `Bearer ${token}`,
            'Accept': 'application/json'
        }
    })
        .then(response => {
            if (!response.ok) {
                showAlert("faild to fatch data", "error");
                return Promise.reject();
            }
            if (response.headers.get('content-length') === '0') {
                showAlert('Empty response received', "error");
                return Promise.reject();
            }
            return response.json();
        })
        .then(response => {

            if (!response || !response.data) {
                showAlert('Invalid data structure received', "error");
                return;
            }

            const sessionbutton = document.querySelector('#sensionToggle');
            const slider = document.getElementById('sensionLabel');

            const data = response.data;
            try {
                document.getElementById("date").value = data.date;
                document.getElementById("party_name").value = data.party_name;
                document.getElementById("property_name").value = data.property_name;
                document.getElementById("area").value = data.area;
                document.getElementById("mo_no").value = data.mo_no;
                document.getElementById('company_no').value = data.company_number
                document.getElementById("product").value = data.product;
                document.getElementById("loan").value = data.loan;
                document.getElementById("docu").value = data.docu;
                document.getElementById("chaque").value = data.chaque;
                document.getElementById("ap").value = data.ap;
                document.getElementById("st").value = data.st;
                document.getElementById("hi").value = data.hi;
                document.getElementById("b").value = data.b;
                document.getElementById("tcr_vr").value = data.tcr_vr;
                document.getElementById("fi").value = data.fi;
                document.getElementById("submit").value = data.submit;
                document.getElementById("mitesh").value = data.mitesh;
                document.getElementById("book").value = data.book;
                document.getElementById("hg").value = data.hg;
                document.getElementById("remark").value = data.remark;
                document.getElementById("hed").value = data.hed;
                document.getElementById("refrence").value = data.refrence;
                document.getElementById("builder_name").value = data.builder_name;
                document.getElementById("rlf").value = data.rlf

                if (data.session === 1) {
                    sessionbutton.checked = true;
                    document.getElementById("sensionValue").value = "true";
                    slider.textContent = 'Yes';
                }
                else {
                    sessionbutton.checked = false;
                    document.getElementById("sensionValue").value = "false";
                    slider.textContent = 'No';
                }

            } catch (err) {
                showAlert('Error populating form', "error");
            }
        })
        .catch(error => {
            showAlert('Error fetching data', "error");
        });

    // Handle form submission
    document.getElementById('updateLoginData').addEventListener('click', async function (e) {
        e.preventDefault();

        const sensionValue = document.querySelector('#sensionValue')?.value === "true" ? true : false

        const formData = {
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
            submit: document.getElementById("submit")?.value,
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

        // Update fetch request with better error handling
        fetch(`https://loantest.innovatixtechnologies.com/account/example-app/public/api/loginside/${id}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`,
                'Accept': 'application/json'
            },
            body: JSON.stringify(formData)
        })
            .then(response => response.json())
            .then(data => {
                if (data.message === 'Data updated successfully') {
                    showAlert('Data updated successfully!', 'success');
                    setTimeout(() => {
                        window.location.href = 'index.html';
                    }, 1200);
                } else {
                    showAlert('Failed to update data', "error");
                }
            })
            .catch(error => {
                showAlert('Error updating data', "error");
            });
    });
});
document.getElementById("cancelLoginBtn").addEventListener("click", function () {
    window.location.href = "index.html";
});

