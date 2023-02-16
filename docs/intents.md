# Intents

Use an intent based editor that drops the script in main and then includes intent code

workbook can be referenced directly inside of intents

Supplied Blocks

```typescript
namespace intent {
    
}
```


```typescript
function main(workbook: ExcelScript.Workbook) {
    //#region intents
    const intent =  {
        renameWorksheet(currentName: string, newName: string) {
            workbook.getWorksheet(currentName).setName(newName);
        },

        setRangeFillColor(sheetName: string, rangeAddress: string, color: string): void {
            workbook.getWorksheet(sheetName).getRange(rangeAddress).getFormat().getFill().setColor(color);
        }
    }
    //#endregion intents

    //#region script
    const worksheet = intent.renameWorksheet("Sheet1", "rename");
    intent.setRangeFillColor("rename", "A1", "pink");
    //#endregion script

}

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

