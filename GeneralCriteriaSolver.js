class GeneralCriteriaSolver {
    constructor({ columnsInfo, generalCriteriaInfo }) {
        this.columnsInfo = columnsInfo
        this.generalCriteriaInfo = generalCriteriaInfo
    }

    standartizedColumn(row, i) {
        const constrains = this.generalCriteriaInfo.constrains
        const columnConstrain = constrains[i]
        if (!columnConstrain) return console.error('Can not standartize row ', i)
        return (row[i] - columnConstrain[0]) / (columnConstrain[1] - columnConstrain[0])
    }

    calculateCriteria(row) {
        let res = 0
        for (let i = 0; i < row.length; i++) {
            if (this.columnsInfo[i] == 'max') {
                res += this.generalCriteriaInfo.weights[i] * this.standartizedColumn(row, i)
            } else if (this.columnsInfo[i] == 'min') {
                res += -this.generalCriteriaInfo.weights[i] * this.standartizedColumn(row, i)
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

        console.log('General criterias:')
        rows.forEach((row, i) => {
            console.log(row, ' -- criteria: ', Number(criterias[i].toFixed(2)))
        })
        return row
    }
}

module.exports = GeneralCriteriaSolver
