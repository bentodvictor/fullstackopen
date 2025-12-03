# Full Stack Open - Part 13

## Using relational databases

> Helsinki University - Full Stack Open Course Part 13

# Exercise 13.1.

Create a GitHub repository for the application and create a new Fly.io or Heroku application for it, as well as a Postgres database. As mentioned here you might set up your database also somewhere else, and in that case the Fly.io or Heroku app is not needed.

Make sure you are able to establish a connection to the application database.

# Exercise 13.2.

On the command-line, create a blogs table for the application with the following columns:

- id (unique, incrementing id)
- author (string)
- url (string that cannot be empty)
- title (string that cannot be empty)
- likes (integer with default value zero)

Add at least two blogs to the database.

Save the SQL-commands you used at the root of the application repository in a file called commands.sql
Exercise 13.3.

Create a functionality in your application which prints the blogs in the database on the command-line, e.g. as follows:

```bash
$ node cli.js
Executing (default): SELECT * FROM blogs
Dan Abramov: 'On let vs const', 0 likes
Laurenz Albe: 'Gaps in sequences in PostgreSQL', 0 likes
```