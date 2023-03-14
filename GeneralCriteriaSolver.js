class GeneralCriteriaSolver {
    constructor({ columnsInfo, generalCriteriaInfo }) {
        this.columnsInfo = columnsInfo
        this.generalCriteriaInfo = generalCriteriaInfo
    }

    calculateCriteria(row) {
        let res = 0
        for (let i = 0; i < row.length; i++) {
            if (this.columnsInfo[i] == 'max') {
                res += this.generalCriteriaInfo.weights[i] * row[i]
            } else if (this.columnsInfo[i] == 'min') {
                res += (1 - this.generalCriteriaInfo.weights[i]) * row[i]
            }
        }
        return res
    }

    solve(rows) {
        if (rows.length == 0) return
        const criterias = []
        rows.forEach((row) => {
            criterias.push(this.calculateCriteria(row))
        })
        let bestValue = criterias[0]
        let row = rows[0]
        for (let i = 1; i < criterias.length; i++) {
            if (criterias[i] > bestValue) {
                bestValue = criterias[i]
                row = rows[i]
            }
        }
        return row
    }
}

module.exports = GeneralCriteriaSolver
