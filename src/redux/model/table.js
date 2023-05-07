export function updateTable(table, size) {
    if (size[0] > table.length) {
        for (let i = table.length; i < size[0]; i++) {
            table.push(new Array(size[1]).fill(0));
        }
    } else {
        table.splice(size[0]);
    }

    for (let i = 0; i < table.length; i++) {
        if (size[1] > table[i].length) {
            for (let j = table[i].length; j < size[1]; j++) {
                table[i].push(0);
            }
        } else {
            table[i].splice(size[1]);
        }
    }
}
