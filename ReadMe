#Users with profiles backend

This backend is designed to provide functionality for managing user data stored in a **PostgreSQL** database. It allows creating, updating, deleting, and retrieving users, as well as filtering them by role.

The backend provides a RESTful API that accepts HTTP requests and communicates with the database to perform the requested actions. The API endpoints include:

_POST /users_ - creates a new user in the database
_PUT /users/:id_ - updates an existing user with the specified ID
_DELETE /users/:id_ - deletes the user with the specified ID from the database
_GET /users_- retrieves a list of all users in the database
_GET /users?role=:role_ - retrieves a list of users filtered by role

The database has a _Users_ table that contains the following columns:
id - a unique identifier for each user
username - the name of the user
email - the email address of the user
role - the role of the user (e.g., "admin", "editor", "guest")
datecreate - the date and time when the user was created
profileid - a unique identifier for connecting with profiles table

_Profiles_ table contains:
id - a unique identifier for each user
first_name - the first name of the user
last_name - the last name of the user
state - the gender of the user ("male", "female")

The backend uses the **pg** package to connect to the PostgreSQL database and execute SQL queries. It also uses the **Express framework** to create and manage the RESTful API endpoints.

Here is an example of JSON object for POST request to the /users endpoint:

```
"username": "brufo",
"firstName": "Berte",
"lastName": "Ruf",
"email": "brufo@bloomberg.com",
"state": "Female",
"role": "guest"
```
