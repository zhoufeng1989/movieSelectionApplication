import React from "react"
import "./MovieListItem.css"
import {Link} from "react-router-dom"

const MovieListItem = ({movie}) => {
    const rating = movie.vote_average;
    const year = movie.release_date.substr(0, 4);
    const title = movie.title;
    const movieId = movie.id;
    const poster = `https://image.tmdb.org/t/p/w342${movie.poster_path}`;

    return (
        <li className="movie-item">
            <Link to={`/movies/${movieId}`}>
                <img src={poster} alt={title}/>
            </Link>
            <div className="movie-description">
                <h2>{title}</h2>
                <section className="movie-detail">
                    <div className="movie-year">
                        <span>year</span>
                        <span>{year}</span>
                    </div>
                    <div className="movie-rating">
                        <span>rating</span>
                        <span>{rating}</span>
                    </div>
                </section>
            </div>
        </li>
    )
}


export default MovieListItem;


