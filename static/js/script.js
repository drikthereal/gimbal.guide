var csvURL = 'https://docs.google.com/spreadsheets/d/e/2PACX-1vQmNnMRfkOUy3KGfHGaDJ7vBPG1UYVQiPWpxDKLlLCHyOsXd1PsEah_SHInbNx49D_UclLlVPgGFiZo/pub?gid=0&single=true&output=csv';
var SPLIT_SEPARATOR = ';';

var mutators = {
    compatibility: function(val) {
        return val.split(SPLIT_SEPARATOR).join('<br>');
    }
};
var filters = {
    compatibility: 'like'
};

function makeTable(tableData, tableCols, filterOptions) {
    $('#data-table').tabulator({
        data: tableData,
        columns: tableCols,
        layout: 'fitDataFill'
    });
    console.info('filterOptions', filterOptions);
}

if (window.location.pathname === '/') {
    var keys = [], data = [], tableCols = [], filterKeys = Object.keys(filters), filterOptions = {};
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
                    var key = keys[colIdx];
                    colObj[key] = col;
                    if (filterKeys.indexOf(key) > -1) {
                        var newKeys = col.split(SPLIT_SEPARATOR);
                        $.each(newKeys, function (newKeyIdx, newKey) {
                            filterOptions[key] = filterOptions[key] || {};
                            filterOptions[key][newKey] = true;
                        });
                    }
                });
                data.push(colObj);
            }
        });
        if (data) {
            makeTable(data, tableCols, filterOptions);
        }
    });
}
