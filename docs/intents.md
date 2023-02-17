# Intents

Use an intent based editor that drops the script in main and then includes intent code

workbook can be referenced directly inside of intents

Supplied Blocks

Boolean toggles

```typescript
//% icon="\uf0a4"
namespace intent {
    
    /**
     * Rename a worksheet
     */
    //% block="rename worksheet $currentName| to $newName"
    export function renameWorksheetByName(currentName: string, newName: string) {}

    /**
     * Delete a worksheet, if the worksheet exists it is deleted.
     */
    //% block="delete worksheet $name"
    export function deleteWorksheetByName(name: string) {}

    /**
     * Recreates a worksheet deleting the original if it exists and replacing it with a blank one
     */
    //% block="recreate worksheet $name"
    export function recreateWorksheetByName(name: string) {}

    /**
     * Set a cell value
     */
    //% block="set sheet $sheetName cell $cellAddress to text value $value"
    export function setWorksheetCellTextValue(sheetName: string, cellAddress: string, value: string) {}


    /**
     * Set a cell value
     */
    //% block="set sheet $sheetName range $rangeAddress fill color $color"
    export function setWorksheetRangeFillColor(sheetName: string, rangeAddress: string, color: string) {}

    /**
     * Create Conditional Format on specific text
     */
    //% block="create conditional format on | sheet $sheetName cells $rangeAddress | format cells containing text $text with | fill-color $fillColor| color-text $fontColor| bold-text $bold| italic-text $italic"
    //% inlineInputMode=external
    //% sheetName.defl="Sheet1"
    //% rangeAddress.defl="A1"
    //% text.defl="hi"
    //% fillColor.defl="#FF0000"
    //% fontColor.defl="#000000"
    //% bold.defl=false
    //% italic.defl=false
    export function createOnWorksheetRangeConditionalFormatContainsText(
        sheetName: string,
        rangeAddress: string,
        text: string,
        fillColor: string,
        fontColor: string,
        bold: boolean,
        italic: boolean) {}

    // composition experiment

    //% block="sheet $sheetName range $rangeAddress"
    export function getWorksheetRange(sheetName: string, rangeAddress: string):Range;

    //% block="conditional format range $range containing text $text"
    export function createConditionalFormatContainingText(range: Range, text: string): TextConditionalFormat;

    //% block="set $format fill color $fillColor"
    //% fillColor.defl="#FF0000"
    export function setTextConditionalFormatFillColor(format: TextConditionalFormat, fillColor: string);
}
export class Range {}

export class TextConditionalFormat {}

```

```typescript
function main(workbook: ExcelScript.Workbook) {
    //#region intents
    const intent =  {
        renameWorksheetByName(currentName: string, newName: string) {
            workbook.getWorksheet(currentName).setName(newName);
        },

        deleteWorksheetByName(name: string) {
            const worksheet = workbook.getWorksheet(currentName);
            if (worksheet !== undefined) {
                worksheet.delete()
            }
        },

        recreateWorksheetByName(name: string) {
            const worksheet = workbook.getWorksheet(currentName);
            if (worksheet !== undefined) {
                worksheet.delete()
            }
            workbook.addWorksheet(name);
        },

        setWorksheetCellTextValue(sheetName: string, cellAddress: string, value: string) {
            const worksheet = workbook.getWorksheet(currentName);
            const range = worksheet.getRange(cellAddress);
            range.setValue(value);
        }

        setWorksheetRangeFillColor(sheetName: string, rangeAddress: string, color: string): void {
            workbook.getWorksheet(sheetName).getRange(rangeAddress).getFormat().getFill().setColor(color);
        }

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

            cf.setRule({operator:ExcelScript.ConditionalTextOperator.contains, text:`=${text}`});

            const format = cf.getFormat();
            const font = format.getFont();
            format.getFill().setColor(fillColor);
            font.setBold(bold);
            font.setItalic(italic);
            font.setColor(fontColor);
        }

        getWorksheetRange(sheetName: string, rangeAddress: string) {
            return workbook.getWorksheet(currentName).getRange(rangeAddress);
        }
    }
    //#endregion intents

    //#region script
    let rename = "rename"
    intent.deleteWorksheetByName(rename)
    intent.recreateWorksheetByName("Sheet1")
    intent.setWorksheetCellTextValue("Sheet1", "A1", "hello");
    intent.setWorksheetRangeFillColor("Sheet1", "B2", "green");
    intent.createOnWorksheetRangeConditionalFormatContainsText("Sheet1", "A1", "hello", "#00FF00", "#FFFFFF", false, false)
    intent.renameWorksheetByName("Sheet1", rename);
    //#endregion script

}

```


```text
enum Delimiters {
    Containing,
    NotContaining,
}

//% blockId="delimiter_conv" block="$value"
export function delimiters(value : Delimiters) : string {
    const map = new Map([
        [Delimiters.Containing, "ExcelScript.ConditionalTextOperator.contains"],
        [Delimiters.NotContaining, "ExcelScript.ConditionalTextOperator.notContains"]
    ]);
    const v = map.get(value);
    return v;
}


// enum
// text
// fill color
// font color
// bold italix, underline, strikethrough,


Highlight cells with specific text

Conditional Format
- fill color
- font italic, bold, strikethrough, color
- borders



delete worksheet
```

## how

## Scenarios

## single workbook

```typescript



```

## set worksheet name

## get worksheet range

## set range color

## set range bold

## set worksheet range color

