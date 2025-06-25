
function exportToCSV(tableId, filename = "export.csv") {
    const table = document.getElementById(tableId);
    const rows = table.getElementsByTagName('tr');
    let csv = [];

    // get headers
    const headers = [];
    const headerCells = rows[0].getElementsByTagName('th');

    for (let i = 0; i < headerCells.length; i++) {
        headers.push(headerCells[i].textContent.trim());
    }

    csv.push(headers.join(','));

    for (let i = 1; i < rows.length; i++) {
        const row = rows[i];
        const cells = row.getElementsByTagName('td');
        const rowData = [];

        for (let j = 0; j < cells.length; j++) {
            // Clean the cell data and handle commas
            let cellData = cells[j].textContent.trim().replace(/"/g, '""');
            if (cellData.includes(',')) {
                cellData = `"${cellData}"`;
            }
            rowData.push(cellData);
        }

        csv.push(rowData.join(','));
    }

    // Create and download CSV file
    const csvContent = csv.join('\n');
    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const link = document.createElement('a');

    if (navigator.msSaveBlob) { // For IE
        navigator.msSaveBlob(blob, filename);
    } else {
        link.href = URL.createObjectURL(blob);
        link.setAttribute('download', filename);
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
    }
}

function exportToPDF(tableId, filename = 'export.pdf') {
    const { jsPDF } = window.jspdf;
    const doc = new jsPDF({ 
        orientation: 'landscape',
        unit: 'pt',
        format: [2000, 1000]
    }); 

    // Get the table element
    const table = document.getElementById(tableId);

    // AutoTable configuration
    doc.autoTable({
        html: table,
        startY: 30,
        styles: {
            fontSize: 10,
            cellPadding: 3,
            overflow: 'linebreak',
            halign: 'center',
            valign: 'middle',
            lineWidth: 0.5,
            minCellHeight: 10,
            cellPadding: 8,
            overflow: 'linebreak',
            halign: 'center',
            valign: 'middle',
            lineWidth: 0.5
        },
        bodyStyles: {
            minCellHeight: 40, // Specific height for body cells
            fontSize: 10,
            valign: 'middle'
        },
        columnStyles: (() => {
            const totalCols = 43;
            const pageWidth = doc.internal.pageSize.width - 60; // account for margins
            const colWidth = pageWidth / totalCols;

            return Array.from({ length: totalCols }).reduce((acc, _, i) => {
                acc[i] = { cellWidth: colWidth };
                return acc;
            }, {});
        })(),
        margin: { top: 30, right: 30, bottom: 30, left: 30 },
        headStyles: {
            minCellHeight: 20,
            fillColor: [12, 33, 58], // Dark blue header
            fontSize: 11,
            fontStyle: 'bold',
            textColor: [255, 255, 255],
            halign: 'center',
            valign: 'middle'
        },
        didDrawPage: function (data) {
            // Add header
            doc.setFontSize(14);
            doc.setTextColor(12, 33, 58);
            doc.text('Monthly Report', 40, 20);

            // Add page number
            doc.setFontSize(10);
            doc.text(
                `Page ${data.pageNumber}`,
                doc.internal.pageSize.width - 60,
                doc.internal.pageSize.height - 20
            );
        },
        didParseCell: function (data) {
            // Handle long text
            if (data.cell.text.length > 0) {
                const text = data.cell.text.join(' ');
                if (text.length > 30) {
                    data.cell.text = doc.splitTextToSize(text, data.cell.styles.cellWidth - 6);
                }
            }
        }
    });

    // Save the PDF
    doc.save(filename);
}

// Add event listeners when document is loaded
document.addEventListener('DOMContentLoaded', function () {
    // CSV Export button listener
    document.querySelector('.download-csv').addEventListener('click', function () {
        const today = new Date().toISOString().slice(0, 10);
        exportToCSV('monthly-report', `monthly_report_${today}.csv`);
    });

    // PDF Export button listener
    document.querySelector('.download-pdf').addEventListener('click', function () {
        const today = new Date().toISOString().slice(0, 10);
        exportToPDF('monthly-report', `monthly_report_${today}.pdf`);
    });
});