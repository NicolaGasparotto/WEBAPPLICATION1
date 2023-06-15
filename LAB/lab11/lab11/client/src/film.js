'use strict';

import dayjs from 'dayjs';

function Film(id, title, isFavorite = false, watchDate, rating) {
    this.id = id;
    this.title = title;
    this.favorite = isFavorite;
    this.rating = rating;
    // saved as dayjs object only if watchDate is truthy
    this.watchDate = watchDate && dayjs(watchDate);

    this.toString = () => {
        return `id: ${this.id}, ` +
        `title: ${this.title}, favorite: ${this.favorite}, ` +
        `watchDate: ${this.formatWatchDate('MMMM D, YYYY')}, ` +
        `score: ${this.formatRating()}` ;
    }

    this.formatWatchDate = (format) => {
        return this.watchDate ? this.watchDate.format(format) : '<not defined>';
    }

    this.formatRating = () => {
        return this.rating ? this.rating : '<not assigned>';
    }
}

export default Film ;

