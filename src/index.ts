import { getImportProjectMessage, project } from "./getImportProjectMessage";
import { getMessageId } from "./getMessageId";
import { post } from "./post";
type MessageData =
    | { type: "ready"; frameid: "editor" }
    | { type: "pxthost"; action: "workspacesync"; projects: object };

let editor: HTMLIFrameElement;

function handleMessage(message: MessageEvent<MessageData>) {
    console.log("message - receive");
    //console.log(message);
    const { data } = message;
    console.log(data);

    editor = document.getElementById("editor") as HTMLIFrameElement;

    if (data.type === "ready") {
        // On ready, send importproject
        // data.frameid not always defined

        if (editor) {
            const message = getImportProjectMessage();
            post(editor, message);
        }
    } else if (data.type === "pxthost" && data.action === "workspacesync") {
        // absolutely must be responded to! or the editor will not load
        // expecting to be some projects that are defined outside
        data.projects = [project];
        post(editor, data);
    }
}

function clickButtonExport() {
    console.log("clickButtonExport");

    // workspacesave
    const message = {
        // What is pxt host verses pxt editor?
        type: "pxthost",
        id: getMessageId(),
        action: "workspacesync",
        response: true,
    };
    post(editor, message);
}

function clickButtonImport() {
    console.log("clickButtonImport");

    // importproject
    const message = getImportProjectMessage();
    post(editor, message);
}

function addButton(id: string, handler: () => void) {
    const button = document.getElementById(id);
    if (button) {
        button.addEventListener("click", handler);
    }
}

function setup() {
    window.addEventListener("message", handleMessage, false);

    addButton("button_import", clickButtonImport);
    addButton("button_export", clickButtonExport);
}

setup();
