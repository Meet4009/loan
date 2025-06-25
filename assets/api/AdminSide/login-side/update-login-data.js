document.addEventListener('DOMContentLoaded', function () {
    const urlParams = new URLSearchParams(window.location.search);
    const id = urlParams.get('id');
    if (!id) {
        return;
    }
    const token = localStorage.getItem('token');
    if (!token) {
        window.location.href = '../index.html';
        return;
    }
    // Add this fetch request right before the DOMContentLoaded event

    // Fetch existing data
    fetch(`https://loantest.innovatixtechnologies.com/account/example-app/public/api/loginside-show/admin/${id}`, {
        method: 'GET',
        headers: {
            'Authorization': `Bearer ${token}`,
            'Accept': 'application/json'
        }
    })
        .then(response => {
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            if (response.headers.get('content-length') === '0') {
                throw new Error('Empty response received');
            }
            return response.json();
        })
        .then(response => {

            if (!response || !response.data) {
                throw new Error('Invalid data structure received');
            }
            
            const yesRadio = document.querySelector('input[value="true"]');
            const noRadio = document.querySelector('input[value="false"]');

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
                    yesRadio.checked = true;
                    noRadio.checked = false;
                }
                else {
                    yesRadio.checked = false;
                    noRadio.checked = true;
                }
                
            } catch (err) {
                throw new Error('Error populating form:', err);
            }
        })
        .catch(error => {
            throw new Error('Error:', error);
        });

    // Handle form submission
    document.getElementById('updateLoginData').addEventListener('click', async function (e) {
        e.preventDefault();
        
        const sensionValue = document.querySelector('input[name="sension"]:checked').value == "true"

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
        
        // Update fetch request with better error handling
        fetch(`https://loantest.innovatixtechnologies.com/account/example-app/public/api/loginside/admin/${id}`, {
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
                    window.location.href = 'index.html';
                } else {
                    throw new Error(data.message || 'Failed to update data');
                }
            })

            .catch(error => {
                console.error('Error updating data:', error);
            });
    });
});
document.getElementById("cancelLoginBtn").addEventListener("click", function () {
    window.location.href = "index.html";
});
