const express = require('express');
const morgan = require("morgan");
const axios = require("axios");
const cron = require("cron").CronJob;



var cache = [];
fs = require("fs");

const app = express();

app.use(morgan("dev"));
const api = "8730e0e";

app.get("/", function (request, response) {

    var query = request.query;

    //The request isn't cached
    if (!getFromCache(Object.keys(query)[0])) {
        if (!!request.query.i) {
            axios.get("http://www.omdbapi.com/?apikey="+api+"&i="+query.i)
                .then(apiCallback)
                .catch(function (err) {
                    console.log(err);
                });
        }
        else if (!!request.query.t) {
            axios.get("http://www.omdbapi.com/?apikey="+api+"&t="+query.t.replace(" ","\%20"))
                .then(apiCallback)
                .catch(function (err) {
                    console.log(err);
                });
        }
        else {
            response.status(400).send("Invalid search parameter");
        }

        function apiCallback(data) {
            addToCache(Object.keys(query)[0],data.data);
            response.status(200).send(data.data);
            response.end();
        }
    }
    //It's already cached
    else {
        response.status(200).send(getFromCache(Object.keys(query)[0]));
        response.end();
    }
});

//Returns an element from the cache if it's present, or null if not
function getFromCache(query) {
    for (var i = 0; i < cache.length; i++) {
        if (cache[i].query == query) return cache[i].data;
    }
    return null;
}

function addToCache(query, data) {
    //Don't add it if it's already there
    if (!getFromCache(query)) {
        cache.push({query: query, data: data});
    }
}


//refresh the cache every day at midnight
var dailyTask = new cron("* * 00 * *", function () {
    cache = [];
})


// When making calls to the OMDB API make sure to append the '&apikey=8730e0e' parameter

module.exports = app;