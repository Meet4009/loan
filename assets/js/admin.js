
const generateRows = (account, index) => {
    return `<tr>
        <td>${account.username}</td>
        <td>${account.email}</td>
     </tr>`;
}

const API_URL = 'https://jsonplaceholder.typicode.com/users';

fetch(API_URL)
    .then(response => response.json())
    .then(data => {
        const tableBody = document.getElementById('cost-table');
        tableBody.innerHTML = data.map((account, i) => generateRows(account, i)).join('');
    })
    .catch(error => {
        console.log("Error Occured", error);
    });

