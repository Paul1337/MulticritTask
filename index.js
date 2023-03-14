const readXlsxFile = require('read-excel-file/node')
const fs = require('fs')
const path = require('path')

const ParetoSolver = require('./ParetoSolver.js')
const Suboptimizer = require('./Suboptimizer.js')
const LexicographOptimizer = require('./LexicographOptimizer.js')
const GeneralCriteriaSolver = require('./GeneralCriteriaSolver.js')
const { applyLowBorders } = require('./Utils.js')

function init() {
    dataBuffer = Buffer.from(fs.readFileSync(path.join(__dirname, 'data/input.xlsx')))

    const config = JSON.parse(fs.readFileSync(path.join(__dirname, 'data/config.json'), 'utf-8'))
    const paretoSolver = new ParetoSolver(config.columnsInfo)
    const suboptimizer = new Suboptimizer({
        columnsInfo: config.columnsInfo,
        suboptimization: config.suboptimization,
    })
    const lexicographicOptimizer = new LexicographOptimizer({
        columnsInfo: config.columnsInfo,
        lexicographicOptimization: config.lexicographicOptimization,
    })
    const generalCriteriaSolver = new GeneralCriteriaSolver({
        columnsInfo: config.columnsInfo,
        generalCriteriaInfo: config.generalCriteriaInfo,
    })

    readXlsxFile(dataBuffer).then((rows) => {
        const data = rows
            .slice(config.data.y0, config.data.y1 + 1)
            .map((row) => row.slice(config.data.x0, config.data.x1 + 1))

        // console.log(data)

        const paretoRows = paretoSolver.solve(data)
        console.log('Pareto rows:', paretoRows)

        const paretoNarrowed = applyLowBorders(paretoRows, config.lowBorders, config.columnsInfo)
        console.log('Pareto-narrowed:', paretoNarrowed)

        const suboptimizedRow = suboptimizer.solve(data)
        console.log('Suboptimization:', suboptimizedRow)

        const lexicogrRow = lexicographicOptimizer.solve(data)
        console.log('Lexicograph optimization:', lexicogrRow)

        const generalCriteriaResrow = generalCriteriaSolver.solve(data)
        console.log('General criteria result:', generalCriteriaResrow)
    })
}

init()
