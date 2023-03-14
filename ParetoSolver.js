const { columnDominates } = require('./Utils.js')

class ParetoSolver {
    constructor(columnsInfo) {
        this.columnsInfo = columnsInfo
    }

    paretoDominates(row1, row2) {
        let hasBetterColumn = false
        for (let i = 0; i < row1.length; i++) {
            if (columnDominates(row2, row1, i, this.columnsInfo)) {
                return false
            } else if (columnDominates(row1, row2, i, this.columnsInfo)) {
                hasBetterColumn = true
            }
        }
        return hasBetterColumn
    }

    solve(rows) {
        const paretoRows = []
        for (let i = 0; i < rows.length; i++) {
            if (!rows.every((row, index) => index == i || this.paretoDominates(row, rows[i]))) {
                paretoRows.push(rows[i])
            }
        }
        return paretoRows
    }
}

module.exports = ParetoSolver
