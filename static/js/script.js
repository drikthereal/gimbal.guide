var csvURL = 'https://docs.google.com/spreadsheets/d/e/2PACX-1vQmNnMRfkOUy3KGfHGaDJ7vBPG1UYVQiPWpxDKLlLCHyOsXd1PsEah_SHInbNx49D_UclLlVPgGFiZo/pub?gid=0&single=true&output=csv';

function getCsvRows(csv, callback) {
    var rows = csv.split('\n'), html = '<table>';
    $.each(rows, function(i, row) {
        html += getRowHtml(row);
    });
    html += '</table>';
    callback(html);
}

function getRowHtml(row) {
    var cols = row.split(','), html = '<tr>';
    $.each(cols, function(i, col) {
        html += '<td>' + col + '</td>';
    });
    html += '</tr>';
    return html;
}

if (window.location.pathname === '/') {
    $.get(csvURL, function(csv) {
        getCsvRows(csv, function(html) {
            $('body').append(html);
        });
    });
}
