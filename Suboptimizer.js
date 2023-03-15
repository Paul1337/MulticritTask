const { applyLowBorders, findRowByBest } = require('./Utils.js')

class Suboptimizer {
    constructor({ columnsInfo, suboptimization }) {
        this.columnsInfo = columnsInfo
        this.suboptimization = suboptimization
    }

    solve(rows) {
        const narrowedRows = applyLowBorders(rows, this.suboptimization.lowBorders, this.columnsInfo)
        if (narrowedRows.length == 0) {
            console.log('No rows satisfy suboptimization narrowing')
            return
        }
        console.log('Suboptimization after narrowing: ', narrowedRows)
        return findRowByBest(narrowedRows, this.columnsInfo, this.suboptimization.mainCriteriaIndex)
    }
}

module.exports = Suboptimizer
