module.exports.columnDominates = (row1, row2, columnIndex, columnsInfo) => {
    if (columnsInfo[columnIndex] == 'max') {
        return row1[columnIndex] > row2[columnIndex]
    } else if (columnsInfo[columnIndex] == 'min') {
        return row1[columnIndex] < row2[columnIndex]
    }
    return false
}

module.exports.applyLowBorders = (rows, lowBorders, columnsInfo) => {
    return rows.filter((row) => {
        return row.every((rowItem, index) => {
            if (columnsInfo[index] == 'max') {
                return rowItem >= lowBorders[index]
            } else if (columnsInfo[index] == 'min') {
                return rowItem <= lowBorders[index]
            }
            return true
        })
    })
}

module.exports.findRowByBest = (rows, columnsInfo, compareColumnIndex) => {
    if (rows.length == 0) return
    let chosenRow = rows[0]
    let bestValue = rows[0][compareColumnIndex]
    if (columnsInfo[compareColumnIndex] == 'max') {
        rows.forEach((row, index) => {
            if (row[compareColumnIndex] > bestValue) {
                bestValue = row[compareColumnIndex]
                chosenRow = row
            }
        })
    } else if (columnsInfo[compareColumnIndex] == 'min') {
        rows.forEach((row, index) => {
            if (row[compareColumnIndex] < bestValue) {
                bestValue = row[compareColumnIndex]
                chosenRow = row
            }
        })
    }
    return chosenRow
}
