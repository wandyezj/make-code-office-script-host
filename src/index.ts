type MessageData = { type: "ready"; frameid: "editor" } | { type: "pxthost", action: "workspacesync"; projects: object};

let messageCount = 0;
function getMessageId() {
    messageCount++;
    return messageCount.toString();
    //return Math.floor(Math.random()*1000000).toString();
}

const project = {
    text: {
        "main.blocks": `<xml xmlns="http://www.w3.org/1999/xhtml">
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
};

const projects = [
    {
      "text": {
        "main.blocks": "<xml xmlns=\"http://www.w3.org/1999/xhtml\">\n  <block type=\"pxt-on-start\" id=\",{,HjW]u:lVGcDRS_Cu|\" x=\"-247\" y=\"113\"></block>\n</xml>",
        "main.ts": "\n",
        "README.md": " ",
        "pxt.json": "{\n    \"name\": \"Untitled\",\n    \"dependencies\": {\n        \"core\": \"*\"\n    },\n    \"description\": \"\",\n    \"files\": [\n        \"main.blocks\",\n        \"main.ts\",\n        \"README.md\"\n    ]\n}"
      }
    }];

function getImportProjectMessage() {
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

function post(iframe: HTMLIFrameElement, message: any) {
    console.log("message - post");
    console.log(message);
    if (iframe === undefined) {
        console.log("no iframe, can't post");
        return;
    }


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

    editor = document.getElementById("editor") as HTMLIFrameElement;

    if (data.type === "ready") {
        // On ready, send importproject
        // data.frameid not always defined
        
        if (editor) {
            //const message = getImportProjectMessage();
            //post(editor, message);
        }
    } else if (data.type === "pxthost" && data.action === "workspacesync") {
        // absolutely must be responsed to! or the editor will not load
        // expecting to be some projects that are defined outside
        data.projects = [project];
        post(editor, data)
    }
}

function clickButtonExport() {
    console.log("clickButtonExport");

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

function setup() {
    window.addEventListener("message", handleMessage, false);

    const button = document.getElementById("button_export");
    if (button) {
        button.addEventListener("click", clickButtonExport);
    }
}

setup();
