var csvURL = 'https://docs.google.com/spreadsheets/d/e/2PACX-1vQmNnMRfkOUy3KGfHGaDJ7vBPG1UYVQiPWpxDKLlLCHyOsXd1PsEah_SHInbNx49D_UclLlVPgGFiZo/pub?gid=0&single=true&output=csv';

function makeTable(tableData, tableCols) {
    $('#data-table').tabulator({
        data: tableData,
        columns: tableCols
    });
}

if (window.location.pathname === '/') {
    var keys = [], data = [], tableCols = [];
    $.get(csvURL, function(csv) {
        var rows = csv.split('\n');
        $.each(rows, function(rowIdx, row) {
            var cols = row.split(',');
            if (rowIdx === 0) {
                keys = cols;
            } else {
                var colObj = {};
                $.each(cols, function(colIdx, col) {
                    var key = keys[colIdx];
                    colObj[key] = col;
                    tableCols.push({title: key.charAt(0).toUpperCase() + key.slice(1), field: key});
                });
                data.push(colObj);
            }
        });
        if (data) {
            makeTable(data, tableCols);
        }
    });
}
