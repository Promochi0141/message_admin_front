const wsDelay = new WebSocket('wss://delaytime-062c8ba9590d.herokuapp.com/');

wsDelay.onopen = () => {
    console.log('サーバーに接続しました');
};

wsDelay.onmessage = (event) => {
    const data = JSON.parse(event.data);
    // dataは{id : 1 , time : 0}のようなオブジェクト型になる
    console.log('受信:', data);
    const messagesDiv = document.getElementById('wsMessages');
    messagesDiv.innerHTML = `<p>ID: ${data.id}, 現在の遅延: ${data.time}分</p>`;
};

wsDelay.onclose = () => {
    console.log('サーバーとの接続が切断されました');
};

wsDelay.onerror = (error) => {
    console.error('エラー:', error);
};

document.getElementById('wsMessageForm').addEventListener('submit', (event) => {
    event.preventDefault();
    const id = document.getElementById('wsId').value;
    const time = document.getElementById('wsTime').value;
    const message = JSON.stringify({ id: parseInt(id), time: parseInt(time) });
    wsDelay.send(message);
    console.log('送信:', message);
});