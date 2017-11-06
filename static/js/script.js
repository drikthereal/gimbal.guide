var csvURL = 'https://docs.google.com/spreadsheets/d/e/2PACX-1vQmNnMRfkOUy3KGfHGaDJ7vBPG1UYVQiPWpxDKLlLCHyOsXd1PsEah_SHInbNx49D_UclLlVPgGFiZo/pub?gid=0&single=true&output=csv';

if (window.location.pathname === '/') {
    var keys = [];
    $.get(csvURL, function(csv) {
        var rows = csv.split('\n');
        $.each(rows, function(rowIdx, row) {
            var cols = row.split(',');
            if (rowIdx === 0) {
                keys = cols;
            } else {
                var colObj = {};
                $.each(cols, function(colIdx, col) {
                    colObj[keys[colIdx]] = col;
                });
                console.info(rowIdx, colObj);
            }
        });
    });
}
