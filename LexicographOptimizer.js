const { findRowByBest } = require('./Utils.js')

class LexicographOptimizer {
    constructor({ columnsInfo, lexicographicOptimization }) {
        this.columnsInfo = columnsInfo
        this.lexicographicOptimization = lexicographicOptimization
    }

    solve(rows) {
        let newRows = []
        rows.forEach((row) => newRows.push([...row]))

        let currentCriteria = 0
        while (newRows.length > 1) {
            const critIndex = this.lexicographicOptimization.sortedCriterias[currentCriteria]
            const bestRow = findRowByBest(newRows, this.columnsInfo, critIndex)
            newRows = newRows.filter((row) => row[critIndex] == bestRow[critIndex])
            currentCriteria++
        }

        return newRows[0]
    }
}

module.exports = LexicographOptimizer
