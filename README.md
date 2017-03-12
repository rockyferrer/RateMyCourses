## Dear Marker

- Since chrome does not allow loading of local files, we have copied out header bar into each file for now.

- We have used Bootstrap, some jQuery, and some AngularJS

#Installation

### Scraper

At the time of writing this the scraper only pulls courses.

The scraper loads data into the MongoDB instance from the Cobalt API.

Run `npm install` from inside `scraper`. You may also need to run `npm install` in the root of the repo.

Make sure you have mongo running. You can change the MongoDB path inside of `scraper.js`.

Run `node scraper.js` (while inside `scraper/`) to scrape the data. See console for errors. 

You will need to do `Ctrl-C` to exit the scraper once it is done.

Use `use Team23-RateMyCourses` and then `db.courses.find().pretty()` to confirm the data was loaded.
