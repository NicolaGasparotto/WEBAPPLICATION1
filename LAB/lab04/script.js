'use strict';

const fillStar = `<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-star-fill" viewBox="0 0 16 16">
<path d="M3.612 15.443c-.386.198-.824-.149-.746-.592l.83-4.73L.173 6.765c-.329-.314-.158-.888.283-.95l4.898-.696L7.538.792c.197-.39.73-.39.927 0l2.184 4.327 4.898.696c.441.062.612.636.282.95l-3.522 3.356.83 4.73c.078.443-.36.79-.746.592L8 13.187l-4.389 2.256z"/>
</svg>`;

const emptyStar = `<svg class="empty-star" xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-star" viewBox="0 0 16 16">
<path d="M2.866 14.85c-.078.444.36.791.746.593l4.39-2.256 4.389 2.256c.386.198.824-.149.746-.592l-.83-4.73 3.522-3.356c.33-.314.16-.888-.282-.95l-4.898-.696L8.465.792a.513.513 0 0 0-.927 0L5.354 5.12l-4.898.696c-.441.062-.612.636-.283.95l3.523 3.356-.83 4.73zm4.905-2.767-3.686 1.894.694-3.957a.565.565 0 0 0-.163-.505L1.71 6.745l4.052-.576a.525.525 0 0 0 .393-.288L8 2.223l1.847 3.658a.525.525 0 0 0 .393.288l4.052.575-2.906 2.77a.565.565 0 0 0-.163.506l.694 3.957-3.686-1.894a.503.503 0 0 0-.461 0z"/>
</svg>`;

const filmLibrary = new FilmLibrary();

filmLibrary.addNewFilm(new Film(1, 'Pulp Finction', true, '03-17-2023', 5));
filmLibrary.addNewFilm(new Film(2, '21 Grams', true, '03-17-2023', 4));
filmLibrary.addNewFilm(new Film(5, 'Shrek', false, 'March 30, 2023', 3));
filmLibrary.addNewFilm(new Film(3, 'Star Wars', false));
filmLibrary.addNewFilm(new Film(4, 'Matrix', false));

function displayFilmTable(title, filmList){
    const table = document.getElementById('filmsTable');
    const tableBody = table.querySelector('tbody');

    for(const film of filmList){
        const heading = document.getElementById('filter-title');
        heading.innerText = title;

        const tr = document.createElement('tr');
        // adding all the column with specific element One by One
        const tdTitle = document.createElement('td');
        tdTitle.innerText = film.title;
        tdTitle.style.color = film.favorite ? 'red' : ''; 
        tr.appendChild(tdTitle);

        const tdFavorite = document.createElement('td');
        const ticked = film.favorite ? 'checked' : '';
        tdFavorite.innerHTML = `<span class="custom-control custom-checkbox col-md-1 col-3">
                                    <input type="checkbox" class="custom-control-input" id="check-f1" ${ticked}>
                                    <label class="custom-control-label" for="check-f1">Favorite</label>
                                </span>`;
        tr.appendChild(tdFavorite);

        const tdDate = document.createElement('td');
        tdDate.innerText = film.date != null ? film.date.format('MMMM DD, YYYY') : '';
        tr.appendChild(tdDate);

        const tdScore = document.createElement('td');
        const spanStars = document.createElement('span');
        spanStars.className ="rating text-end col-md-3 col-3";
        for(let i=0; i<5; i++){
            const starHTML = film.score > i ? fillStar : emptyStar;
            spanStars.insertAdjacentHTML('beforeend', starHTML);
        }
        tdScore.appendChild(spanStars);
        tr.appendChild(tdScore);
    
        tableBody.appendChild(tr);
    }
}

document.addEventListener('DOMContentLoaded', (event)=>{

    const unseen = document.getElementById('filter-unseen');
    const lastMonth = document.getElementById('filter-seen-last-month');
    const best = document.getElementById('filter-best');
    const all = document.getElementById('filter-all');
    const favorites = document.getElementById('filter-favorites');

    all.addEventListener('click', event => {
        displayFilmTable('All', filmLibrary.films);
    });
    favorites.addEventListener('click', event => {
        displayFilmTable('Favorites', filmLibrary.getFavorites);
    });
    best.addEventListener('click', event => {
        displayFilmTable('Best Films', filmLibrary.getBestFilms);
    });
    lastMonth.addEventListener('click', event => {
        displayFilmTable('Seen Last Month', filmLibrary.getLastMonthFilms);
    });
    unseen.addEventListener('click', event => {
        displayFilmTable('Unseen', filmLibrary.getUnseen);
    });
});