var express = require('express')
var app = express();

app.use(function (req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});

app.set('port', (process.env.PORT || 5000));

app.get('/', function (request, response, next) {
    var EOF = "<br />";
    var explanation = "The methods are:" + EOF +
        "GET <a href='/email/new'>/email/new</a>&nbsp;&nbsp;&nbsp;&nbsp;-> To check if there is new email" + EOF +
        "GET <a href='/email/1234'>/email/:id</a>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;-> To retrieve the email information" + EOF +
        "POST /email&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;-> To send an email" + EOF + EOF + EOF +
        "The existing email id are: 1234, 2345, 3456 and 4567. If you retrieve a different id it will be generated randomly";

    response.send(explanation);
});

app.get('/hello/:name', function (request, response, next) {
    response.send("Hello " + request.params.name + '! This is a server response');
});

app.listen(app.get('port'), function () {
    console.log("Node app is running at localhost:" + app.get('port'))
});
