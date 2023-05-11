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

 