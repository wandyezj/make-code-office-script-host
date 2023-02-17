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