global.express = require('express');
global.app = module.exports = express();

// var app = express();
var server = app.listen(3000);
var io = require('socket.io').listen(server);

global.router = express.Router();
var cors = require('cors')
app.use(cors())

global.publicdir = __dirname;
app.use(express.static(__dirname + '/application/public/usersImgCollection'));
app.use(express.static(__dirname + '/application/public/productImages'));
//global.configHolder = require('./configurations/DependencyInclude.js');

var multipart = require('connect-multiparty');

global.multipartMiddleware = multipart();


// default enviornment if it is not specified.
process.env.NODE_ENV = process.env.NODE_ENV || 'development';

global.configHolder = require('./configurations/DependencyInclude.js');


//application middlwares
require('./application-middlewares/AppMiddlewares');

Layers = require('./application-utilities/layers').Express;
var wiring = require('./configurations/UrlMapping');
new Layers(app, router, __dirname + '/application/controller-service-layer', wiring);

app.get('/', (req, res) => res.send("Service is running"));
// var Stomp = require('stomp-client');
// var destination = '/queue/someQueueName';
// var client = new Stomp('127.0.0.1', 61613, 'user', 'pass');

// client.connect(function (sessionId) {
//     client.subscribe(destination, function (body, headers) {
//         console.log('This is the body of a message on the subscribed queue:', body);
//     });

//     client.publish(destination, 'Oh herrow');

// });


app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Methods", "GET,HEAD,OPTIONS,POST,PUT");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, Authorization");
    next();
});


// var http = require('http').Server(app);
// var io = require('socket.io')(http);


// socket io
io.on('connection', function(socket) {
    console.log('User connected');
    // socket.on('disconnect', function() {
    //     console.log('User disconnected');
    // });
    socket.on('All-Messages', function(msg) {
        console.log("All-Messages :" + msg);
        // io.emit('new-message', { message: data });
    });
});

io.on('connection', function(socket) {
    socket.on('chat message', function(chatData) {
        console.log('message: ' + JSON.stringify(chatData));

        var chatData = new domain.Chat({
            "from": chatData.from.id,
            "fromName": chatData.from.name,
            "toName": chatData.to.name,
            "message": chatData.content,
            "to": chatData.to.id,
            "communication_Direction": chatData.communication_Direction
        });

        chatData.save((err, chatDetails) => {
            console.log("chat saved", chatDetails, err)
        });
        io.emit('chat message', chatData);
    });
});



configHolder.Bootstrap.initApp();