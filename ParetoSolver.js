const { columnDominates, columnIsComparable } = require('./Utils.js')

class ParetoSolver {
    constructor(columnsInfo) {
        this.columnsInfo = columnsInfo
    }

    paretoDominates(row1, row2) {
        if (row1.length != row2.length)
            throw new Error('Pareto domination failes: length of rows should be equal')
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
            if (!rows.some((row) => this.paretoDominates(row, rows[i]))) {
                paretoRows.push(rows[i])
            }
        }
        return paretoRows
    }
}

module.exports = ParetoSolver
