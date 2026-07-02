function setIEGrid(el, num_columns, i) {
    $(el).css({
        '-ms-grid-column': (i % num_columns + 1).toString(),
        '-ms-grid-row': (parseInt(i / num_columns) + 1).toString()
    });
}