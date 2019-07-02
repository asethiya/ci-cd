var Couchbase = require("couchbase");
var Express = require("express");
var BodyParser = require("body-parser");
var UUID = require("uuid");

var app = Express();
var N1qlQuery = Couchbase.N1qlQuery;
var bucket = (new Couchbase.Cluster("couchbase://" + process.env.COUCHBASE_HOST)).openBucket(process.env.COUCHBASE_BUCKET, process.env.COUCHBASE_BUCKET_PASSWORD);

app.use(BodyParser.json());

app.get("/", function(request, response) {
    response.send("Try using the `/get` or `/save` endpoints!");
});

app.get("/get", function(request, response) {
    var query = N1qlQuery.fromString("SELECT `" + bucket._name + "`.* FROM `" + bucket._name + "`");
    bucket.query(query, function(error, result) {
        if(error) {
            return response.status(500).send(error);
        }
        response.send(result);
    });
});

app.post("/save", function(request, response) {
    bucket.insert(UUID.v4(), request.body, function(error, result) {
        if(error) {
            return response.status(500).send(error);
        }
        response.send(result);
    });
});

var server = app.listen(process.env.APPLICATION_PORT || 3000, function() {
    console.log("Listening on port " + server.address().port + "...");
});