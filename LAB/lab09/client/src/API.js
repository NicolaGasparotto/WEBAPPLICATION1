
import Film from './film.js';

const APIURL = 'http://localhost:3000/api'

async function listFilms(filter) {
    try {
        const response = await fetch(APIURL+`/${filter}`);
        if (response.ok) {
            const films = await response.json();
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

export { listFilms };