# HOW IT WORKS:

There are two dir, one for the 'client', corresponding to the front-end react interface, 
and one for the 'server', corresponding to the back-end server storing, saving, and getting the information from a database.

CLIENT SIDE:
USUAL REACT APP + API.js 
- API.js is a file that contains all the functions that will be used to communicate with the server.
  it makes async function call with fecth to the api created in the server side, and it returns the response (don't know if in json format or not)

SERVER SIDE:
EXPRESS server.js file, with dao.js to communicate with the database

