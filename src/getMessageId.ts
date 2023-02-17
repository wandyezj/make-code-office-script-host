let messageCount = 0;
export function getMessageId() {
    messageCount++;
    return messageCount.toString();
    //return Math.floor(Math.random()*1000000).toString();
}
