import { useParams, useNavigate } from "react-router-dom";
import FilmForm from './FilmForm';

function EditFilmPage(props){
    const { filmId } = useParams() ;
    const navigate = useNavigate() ;
    
    return <>
        <FilmForm key={filmId} 
          film={props.films.filter((f)=>(f.id == filmId))[0]}
          editFilm={(film) => {props.updateFilm(film)}}
          cancel={() => navigate('/')} />
    </>
    ;
}

export { EditFilmPage } ;