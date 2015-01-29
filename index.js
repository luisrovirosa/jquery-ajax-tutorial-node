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

app.get('/exchange/*', function (request, response, next) {

    var change = {"euro": 1, "dollar": 1.25, "pound": 0.8, "yen": 145};
    var params = request.query;
    var amountInEuro = params.amount / change[params.currency]

    var result = {}

    for (var key in change) {
        var currentChange = change[key];
        result[key] = currentChange * amountInEuro;
    }
    response.send(result);
});

Array.prototype.diff = function (a) {
    return this.filter(function (i) {
        return a.indexOf(i) < 0;
    });
};

app.post('/add', function (request, response, next) {
    var expectedParams = ['age-range', 'color', 'love', 'name'];
    var params = request.body;
    var missingParams = arr_diff(expectedParams, params);
    var result = {};
    if (!missingParams) {

        result = missingParams;
    } else {
        result = "Saved correctly";
    }
    response.send(params);
});

app.get('/sleep', function (request, response, next) {
    var rand = randomIntInc(0, 10);
    var txt;
    if (rand < 5) {
        response.status(400);
    } else {
        txt = 'OK';
    }
    setTimeout(function () {
        response.send(txt);
    }, 2000);
});

function arr_diff(a1, a2) {
    var a = [], diff = [];
    for (var i = 0; i < a1.length; i++)
        a[a1[i]] = true;
    for (var i = 0; i < a2.length; i++)
        if (a[a2[i]]) delete a[a2[i]];
        else a[a2[i]] = true;
    for (var k in a)
        diff.push(k);
    return diff;
}
app.listen(app.get('port'), function () {
    console.log("Node app is running at localhost:" + app.get('port'))
});

function randomIntInc(low, high) {
    return Math.floor(Math.random() * (high - low + 1) + low);
}
