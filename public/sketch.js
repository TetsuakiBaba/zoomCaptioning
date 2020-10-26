var socket;

function setup() {
    // graphics stuff:
    noCanvas();
    socket = io.connect(window.location.origin);
    socket.on('sent_to_zoom', (data) => {
        console.log(data);
    });

    select("#button_send").mouseClicked(sendTextToZoom);
}

function sendTextToZoom() {

    var url = document.getElementById('textarea_captioning_url').value;
    var msg = document.getElementById('text').value;
    var lang = document.getElementById('lang').value;
    var data = {
        url: url,
        text: msg,
        lang: lang
    }

    console.log(data);
    socket.emit('send_to_zoom', data);
}

