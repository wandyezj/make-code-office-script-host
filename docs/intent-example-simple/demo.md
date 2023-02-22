# Intent Example Simple

Demo

1. [Load Make Code Playground](https://makecode.com/playground)
1. Copy contents of [blocks.ts](./blocks.ts)
    ```typescript
    //% icon="\uf0a4"
    namespace intent {
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
    }
    ```
1. Observe Block

    ![](./block.png)
1. Swap to the JavaScript Code View
1. Observe Code [script.ts](./script.ts)
    ```typescript
    intent.createOnWorksheetRangeConditionalFormatContainsText(
    "Sheet1",
    "A1",
    "hi",
    "#FF0000",
    "#000000",
    false,
    false
    )
    ```
1. Swap back to block view, note how the code can translate back to a block
1. Observe how this can be used in and Office Script given output code and definition for the intent block [office-script.ts](./office-script.ts)
    ```typescript
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
    ```
1. copy contents of [office-script.ts](./office-script.ts) into a new script in the Automate Editor and click run. 
