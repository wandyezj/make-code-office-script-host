function main(workbook: ExcelScript.Workbook) {
    //#region intents
    const intent = {
        getWorksheets(): ExcelScript.Worksheet[] {
            return workbook.getWorksheets();
        },

        createWorksheet() {
            workbook.addWorksheet();
        },

        deleteWorksheet(worksheet: ExcelScript.Worksheet) {
            worksheet.delete();
        },

        getWorksheetName(worksheet: ExcelScript.Worksheet): string {
            return worksheet.getName();
        },

        log(message: string) {
            console.log(message);
        },
    }
    //#endregion intents

    // This is the code that comes out of Make Code
    //#region script
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
    //#endregion script

}