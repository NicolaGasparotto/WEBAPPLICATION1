import { addFilm, editFilm } from '../API';
import FilmForm from './FilmForm';
import { useLocation, useNavigate } from 'react-router-dom';
import Film from '../film';

function AddFilmPage(){
    const navigate = useNavigate() ;
    
    const handleAdd = async (film) => {
        await addFilm(film.title, film.watchdate, film.author, film.rating, film.favorite);
        navigate('/') ;
    }

    return <>
        <FilmForm
          addFilm= {handleAdd}
          cancel={() => navigate('/')} />
    </>
    ;
}

function EditFilmPage(){
    
    const navigate = useNavigate() ;
    const location  = useLocation() ;

    let editedFilm = undefined ;
    let filmId = undefined;
    if(location.state) {
        editedFilm = location.state ;
        filmId = editedFilm.id ;
        editedFilm = new Film(editedFilm.id, editedFilm.title, editedFilm.favorite, editedFilm.watchdate, editedFilm.rating) ;
    }
    
    const handleEdit = async (film) => {
        await editFilm(filmId, film.title, film.watchdate, film.author, film.rating, film.favorite);
        navigate('/') ;
    }

    return <>
        <FilmForm key={filmId} 
          film={editedFilm}
          editFilm={handleEdit}
          cancel={() => navigate('/')} />
    </>
    ;
}

export { AddFilmPage, EditFilmPage } ;