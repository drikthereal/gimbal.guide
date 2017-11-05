var csvURL = 'https://docs.google.com/spreadsheets/d/e/2PACX-1vQmNnMRfkOUy3KGfHGaDJ7vBPG1UYVQiPWpxDKLlLCHyOsXd1PsEah_SHInbNx49D_UclLlVPgGFiZo/pub?gid=0&single=true&output=csv';

function getCsvRows(csv, callback) {
    var rows = csv.split('\n');
    $.each(rows, function(i, row) {
        var cols = row.split(',');
        callback(i, cols);
    });
}

function processCsvRow(rowId, cols) {
    console.info(rowId, cols);
}

if (window.location.pathname === '/') {
    $.get(csvURL, function(csv) {
        getCsvRows(csv, processCsvRow);
    });
}
