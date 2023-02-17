export function post(iframe: HTMLIFrameElement, message: any) {
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
        console.log("no content, can't post");
    }
}
