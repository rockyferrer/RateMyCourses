# RateMyCourses(UofT)

## Installation

### Scraper

The scraper loads course data into the MongoDB instance from the Cobalt API.

Run `npm install` from inside `scraper/`. You may also need to run `npm install` in the root of the repo.

Make sure you have mongo running. You can change the MongoDB path inside of `scraper.js`.

Run `node scraper.js` (while inside `scraper/`) to scrape the data. See console for errors. 

You will need to do `Ctrl-C` to exit the scraper once it is done.

Use `use Team23-RateMyCourses` and then `db.courses.find().pretty()` in the MongoDB console to confirm the data was loaded.


## Features

### Users

Users can register through the login portal. User passwords are salted and hashed before being stored in our database. When a user wishes to login their password is hashed with the same salt and the output is compared to what is in the database.

### Course Listings

We have utilized the power of the CobaltAPI to grab all courses, departments, and faculties at UofT. Pages are dynamically generated for every course. 
### Ratings


