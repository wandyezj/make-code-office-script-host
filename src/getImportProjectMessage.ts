import { getMessageId } from "./getMessageId";

const pxtjson = {
    name: "TEST",
    dependencies: {
        core: "*",
    },
    description: "",
    files: [
        //"main.blocks",
        "main.ts",
        "README.md",
    ],
};
const fileMainBlocks = `<xml xmlns="http://www.w3.org/1999/xhtml">
<block type="pxt-on-start" id=",{,HjW]u:lVGcDRS_Cu|" x="0" y="0"></block>
</xml>`;

const fileMainTs = `
hare.onLand(function () {
    let x = 5;
    turtle.forward(1)
})
`;
export const project = {
    text: {
        //"main.blocks": fileMainBlocks,
        "main.ts": fileMainTs,
        "README.md": " ",
        "pxt.json": JSON.stringify(pxtjson),
    },
};
// const projects = [
//     {
//       "text": {
//         "main.blocks": "<xml xmlns=\"http://www.w3.org/1999/xhtml\">\n  <block type=\"pxt-on-start\" id=\",{,HjW]u:lVGcDRS_Cu|\" x=\"-247\" y=\"113\"></block>\n</xml>",
//         "main.ts": "\n",
//         "README.md": " ",
//         "pxt.json": "{\n    \"name\": \"Untitled\",\n    \"dependencies\": {\n        \"core\": \"*\"\n    },\n    \"description\": \"\",\n    \"files\": [\n        \"main.blocks\",\n        \"main.ts\",\n        \"README.md\"\n    ]\n}"
//       }
//     }];
export function getImportProjectMessage() {
    const message = {
        type: "pxteditor",
        id: getMessageId(),
        action: "importproject",
        project,
        filters: {},
        response: true,
    };
    return message;
}
