import FilmForm from './FilmForm';
import { useNavigate } from 'react-router-dom';

function AddFilmPage(props){
    const navigate = useNavigate() ;
    return <>
        <FilmForm
          addFilm={(film) => {props.addFilm(film); }}
          cancel={() => navigate('/')} />
    </>
    ;
}

export { AddFilmPage } ;