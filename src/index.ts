type MessageData = { type: "ready"; frameid: "editor" };

let messageCount = 0;
function getMessageId() {
    messageCount++;
    return messageCount.toString();
    //return Math.floor(Math.random()*1000000).toString();
}

function getImportProjectMessage() {
    const message = {
        type: "pxteditor",
        id: getMessageId(),
        action: "importproject",
        project: {
            text: {
                "main.blocks": `
                <xml xmlns="http://www.w3.org/1999/xhtml">
                    <block type="pxt-on-start" id=",{,HjW]u:lVGcDRS_Cu|" x="-247" y="113"></block>
                </xml>`,
                "main.ts": "\n",
                "README.md": " ",
                "pxt.json": `{
                    "name": "Untitled",
                    "dependencies": {
                        "core": "*"
                    },
                    "description":"",
                    "files": ["main.blocks", "main.ts","README.md"]
                }`,
            },
        },
        filters: {},
        response: true,
    };
    return message;
}

function post(iframe: HTMLIFrameElement, message: any) {
    console.log("message - post");
    console.log(message);
    const content = iframe.contentWindow;
    if (content) {
        content.postMessage(message, "*");
    } else {
        console.log("no content, can't can't post");
    }
}

let editor: HTMLIFrameElement;

function handleMessage(message: MessageEvent<MessageData>) {
    console.log("message - receive");
    console.log(message);
    const { data } = message;
    console.log(data);

    if (data.type === "ready") {
        // On ready, send importproject
        // data.frameid not always defined
        editor = document.getElementById("editor") as HTMLIFrameElement;
        if (editor) {
            //const message = getImportProjectMessage();
            //post(editor, message);
        }
    }
}

function clickButtonExport() {
    console.log("clickButtonExport");
    if (editor) {
        // workspacesave
        const message = {
            // What is pxt host verses pxt editor?
            type: "pxteditor",
            id: getMessageId(),
            action: "workspacesave",
            response: true,
        };
        post(editor, message);
    }
}

function setup() {
    window.addEventListener("message", handleMessage, false);

    const button = document.getElementById("button_export");
    if (button) {
        button.addEventListener("click", clickButtonExport);
    }
}

setup();
