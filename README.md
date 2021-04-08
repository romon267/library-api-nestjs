# Library backend API
This API is written in TypeScript with Nest.js framework.

# Endpoints

## Users

### Create:

***POST /users***

Create new user with data in following format:
```
  {
    "name": "John Doe",
    "abonnement": true | false
  }
```
"abonnement" value is optional, if not provided, default value "false" is set.

### Read:

***GET /users***

Returns the list of all users


***GET /users/:id***

Returns specific user found by 'id' parameter with list of his books

### Update:

***PATCH /users/:id***

Updates the user found by 'id' parameter with data in same format as create route.

Any field is optional, if none provided, old data will be saved.

### Delete:

***DELETE /users/:id***

Removes the user found by 'id' parameter.

### Specific endpoints:

***POST /users/abonnement/:id***

Sets the user's abonnement to boolean *true*.


***DELETE /users/abonnement/:id***

Sets the user's abonnement to boolean *false*.


***POST /users/:userId/:bookId***

- Adds the book found by 'bookId' to the user found by 'userId'.
- One book can be taken by one user only.
- User can't take more than 5 books.
- User can't take book if he has no abonnement.


***DELETE /users/:userId/:bookId***

Removes the book found by 'bookId' from the user found by 'userId'.

## Books

### Create:

***POST /books***

Create new book with data in following format:
```
  {
    "title": "John Doe",
    "author": "Book name"
  }
```

### Read:

***GET /books***

Returns list of books.

Has pagination with query parameters: **limit** and **offset**.


***GET /books/:id***

Returns book found by 'id'.

### Update:

***PATCH /books/:id***

Updates the book found by 'id' parameter with data in same format as create route.

Any field is optional, if none provided, old data will be saved.

### Delete:

***DELETE /books/:id***

Removes the book found by 'id' parameter.
