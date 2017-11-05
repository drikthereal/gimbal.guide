var csvURL = 'https://docs.google.com/spreadsheets/d/e/2PACX-1vQmNnMRfkOUy3KGfHGaDJ7vBPG1UYVQiPWpxDKLlLCHyOsXd1PsEah_SHInbNx49D_UclLlVPgGFiZo/pub?gid=0&single=true&output=csv';
$.get(csvURL, function(csv) {
    var rows = csv.split('\n');
    $.each(rows, function(i, row) {
        var cols = row.split(',');
        console.info(cols);
    });
});
