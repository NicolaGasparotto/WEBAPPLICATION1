# Lab 08 -> API for a FilmLibrary Server

- First thing to do:

    npm i express 
    npm i morgan
    npm i dayjs
    npm i sqlite3

- API project structure:

    - test.http: to test the GET, POST, PUT, DELETE requests to the server with url (and body)
    - server.js: (is the equivalent of index.js of the prof. example) -> is used to implement the GET, POST...
    - film.js:   is used to implement the Film class 
    - dao-films.js: is used to implement the DAO class for Film class -> implements the methods to interact with the database.db file
    - database.db: is the database file

- API ACTIONS:

    - GET /api/'filter' returns the list of all films THAT BELONGS TO THE SPECIFIC FILTER in the database
                        (filters are: 'all', 'favorite', 'bestRated', 'unseen', 'lastmonth')

    - GET /api/films/:id returns the film with the given id (if exists)
    
    - POST /api/films adds a new film to the database
    
    - PUT /api/films/:id updates all the params passed, in the film with the given id (if exists)
    
    - DELETE /api/films/:id deletes the film with the given id (if exists)
