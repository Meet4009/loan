document.addEventListener('DOMContentLoaded', function () {
    const searchForm = document.getElementById('search-form');
    const searchInput = document.getElementById('table-search');

    // Prevent form submission
    searchForm.addEventListener('submit', function (e) {
        e.preventDefault();
    });

    // Live search as user types
    searchInput.addEventListener('keyup', function () {
        const searchText = this.value.toLowerCase();
        const table = document.getElementsByTagName('table')[0];
        const rows = table.getElementsByTagName('tr');

        // Loop through all table rows except header
        for (let i = 1; i < rows.length; i++) {
            let found = false;
            const cells = rows[i].getElementsByTagName('td');

            // Search through each cell in the row
            for (let j = 0; j < cells.length; j++) {
                const cellText = cells[j].textContent || cells[j].innerText;

                if (cellText.toLowerCase().indexOf(searchText) > -1) {
                    found = true;
                    break;
                }
            }

            // Show/hide row based on search match
            rows[i].style.display = found ? '' : 'none';
        }
    });

    // Clear search when 'x' is clicked
    searchInput.addEventListener('search', function () {
        if (this.value === '') {
            const table = document.getElementsByTagName('table')[0];
            const rows = table.getElementsByTagName('tr');

            // Show all rows
            for (let i = 1; i < rows.length; i++) {
                rows[i].style.display = '';
            }
        }
    });
});