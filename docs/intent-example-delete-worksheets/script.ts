let sheets = intent.getWorksheets()
for (let sheet of sheets) {
    intent.log(intent.getWorksheetName(sheet))
}
intent.createWorksheet()
for (let sheet2 of sheets) {
    intent.deleteWorksheet(sheet2)
}
sheets = intent.getWorksheets()
for (let sheet3 of sheets) {
    intent.log(intent.getWorksheetName(sheet3))
}
