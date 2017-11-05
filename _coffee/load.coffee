csvURL = 'https://docs.google.com/spreadsheets/d/e/2PACX-1vQmNnMRfkOUy3KGfHGaDJ7vBPG1UYVQiPWpxDKLlLCHyOsXd1PsEah_SHInbNx49D_UclLlVPgGFiZo/pub?gid=0&single=true&output=csv';

export load = (cols) ->
    $.get(csvURL, (csv) ->
        rows = csv.split('\n')
        $.each(rows, (i, row) -> 
            cols = row.split(',')
            conosle.info('works', cols)
        )
    )
