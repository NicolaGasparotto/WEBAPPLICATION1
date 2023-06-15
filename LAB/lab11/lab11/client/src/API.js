
import Film from './film.js';

const APIURL = 'http://localhost:3000/api'

async function listFilms(filter) {
    try {
        const response = await fetch(APIURL+`/${filter}`);
        if (response.ok) {
            const films = await response.json(); // return a json object
            return films.map( (f) => new Film(f.id, f.title, f.favorite, f.watchdate, f.rating) );
        } else {
            // if response is not OK
            const message = await response.text() ;
            throw new Error("Application error: "+message) ;
        }
    } catch (error) {
        throw new Error("Network error: "+error.message)
    }
}

async function deleteFilm(filmId) {
    try {
        const response = await fetch(APIURL + `/film/${filmId}`, {
            method: 'DELETE'
        });

        if (response.ok) {
            return true;
        } else {
            // if response is not OK
            const message = await response.text();
            throw new Error("Application error: " + message);
        }
    } catch (error) {
        throw new Error("Network error: " + error.message)
    }
}

async function addFilm ( title, watchdate, author, rating, favorite = false ) {
    try {
        const response = await fetch(APIURL + '/add', {
            method: 'POST',
            headers: {
                'Content-Type': "application/json"
            },
            body: JSON.stringify({
                "title": title,
                "watchdate": watchdate,
                "author": author,
                "rating": rating,
                "favorite": favorite
            })
        });
        if (response.ok) {
            return true;
        } else {
            const message = response.text();
            throw new Error("Application error: " + message);
        }
    } catch (err) {
        throw new Error("Network error: " + err.message);
    }

}

async function editFilm ( filmId, title, watchdate, author, rating, favorite = false ) {
    try {
            const response = await fetch(APIURL + `/edit/${filmId}`, {
            method: 'PUT',
            headers: {
                'Content-Type': "application/json"
            },
            body: JSON.stringify({
                "title": title,
                "watchdate": watchdate,
                "author": author,
                "rating": rating,
                "favorite": favorite
            })
        });
        if (response.ok) {
            return true;
        } else {
            const message = response.text();
            throw new Error("Application error: " + message);
        }
    } catch (err) {
        throw new Error("Network error: " + err.message);
    }

}

export { listFilms, deleteFilm, addFilm, editFilm };