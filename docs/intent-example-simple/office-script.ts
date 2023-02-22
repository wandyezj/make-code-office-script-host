function main(workbook: ExcelScript.Workbook) {
    //#region intents
    const intent =  {
        createOnWorksheetRangeConditionalFormatContainsText(
            sheetName: string,
            rangeAddress: string,
            text: string,
            fillColor: string,
            fontColor: string,
            bold: boolean,
            italic: boolean
            ) {
            const worksheet = workbook.getWorksheet(sheetName);
            const range = worksheet.getRange(rangeAddress);
            const cf = range.addConditionalFormat(ExcelScript.ConditionalFormatType.containsText).getTextComparison();

            cf.setRule({operator:ExcelScript.ConditionalTextOperator.contains, text:`${text}`});

            const format = cf.getFormat();
            const font = format.getFont();
            format.getFill().setColor(fillColor);
            font.setBold(bold);
            font.setItalic(italic);
            font.setColor(fontColor);
        }

    }
    //#endregion intents

    // This is the code that comes out of Make Code
    //#region script
    intent.createOnWorksheetRangeConditionalFormatContainsText("Sheet1", "A1", "hello", "#00FF00", "#FFFFFF", false, false)
    //#endregion script

}