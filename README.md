## Movie Finder Data

***DESCRIPTION***
This is a relatively simple interface to the OMDb. You can search for movies by their title, or, if you know their IMDb ID, get all kinds of information quickly. All data is returned in JSON format.

To speed up subsequent queries, all results are cached until either midnight the next day or the server crashes.


***USAGE***

Usage is a little more involved than the previous projects. After starting up the server (on the command line, cd into this folder and run `node ./index.js`), all data can be requested by sending GET requests to http://localhost:3000, with the following parameters:

* `{i: "[IMDb ID]"}` or

* `{t: "[Movie title]"}`