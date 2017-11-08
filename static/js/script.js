var csvURL = 'https://docs.google.com/spreadsheets/d/e/2PACX-1vQmNnMRfkOUy3KGfHGaDJ7vBPG1UYVQiPWpxDKLlLCHyOsXd1PsEah_SHInbNx49D_UclLlVPgGFiZo/pub?gid=0&single=true&output=csv';
var mutators = {
    compatibility: function(val) {
        return val.split(';').join('<br>');
    }
};

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
                $.each(keys, function(colIdx, key) {
                    tableCols.push({
                        title: key.charAt(0).toUpperCase() + key.slice(1), 
                        field: key,
                        formatter: 'html',
                        mutator: mutators[key]
                    });
                });
            } else {
                var colObj = {};
                $.each(cols, function(colIdx, col) {
                    colObj[keys[colIdx]] = col;
                });
                data.push(colObj);
            }
        });
        if (data) {
            makeTable(data, tableCols);
        }
    });
}
