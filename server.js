var PORT = process.env.PORT || 80;
let express = require('express');
var request = require('request');
let app = express();
let server = app.listen(PORT)

app.use(express.static('public'));

console.log("Socket server is running. localhost:" + PORT)

let socket = require('socket.io');
let io = socket(server);

let seq_count = 0;

io.sockets.on('connection', newConnection);

function newConnection(socket) {
    console.log('connection:', socket.id);

    socket.on('send_to_zoom', sendToZoom)
    function sendToZoom(data) {
        var url = data.url;
        url += '&seq=' + seq_count + '&lang=' + data.lang;
        var options = {
            method: 'POST',
            url: url,
            headers: {
                'Content-Type': 'text/plain'
            },
            body: data.text

        };
        console.log(options);
        function callback(error, response, body) {
            if (!error && response.statusCode == 200) {
                socket.emit('sent_to_zoom', body);
            }
            else {
                console.log("Error " + response.statusCode);
            }
        }
        request(options, callback);
        seq_count++;
    }
}

