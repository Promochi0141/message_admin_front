const ws = new WebSocket('wss://message-5f58d4568d1f.herokuapp.com/');

ws.onopen = () => {
    console.log('WebSocket 接続が確立されました');
};

ws.onmessage = (event) => {
    const messages = JSON.parse(event.data);
    const messageList = document.getElementById('messageList');
    messageList.innerHTML = '';
    messages.forEach(message => {
        const li = document.createElement('li');
        li.textContent = `ID ${message.id} : ${message.contents}`;
        messageList.appendChild(li);
    });
    console.log(messages);
};

ws.onclose = () => {
    console.log('WebSocket 接続が閉じられました');
};

function createMessage() {
    const contents = document.getElementById('newMessageContent').value;
    ws.send(JSON.stringify({ action: 'create', id: null, contents: contents }));
}

function updateMessage() {
    const id = document.getElementById('updateMessageId').value;
    const contents = document.getElementById('updateMessageContent').value;
    ws.send(JSON.stringify({ action: 'update', id: id, contents: contents }));
}

function deleteMessage() {
    const id = document.getElementById('deleteMessageId').value;
    ws.send(JSON.stringify({ action: 'delete', id: id }));
}