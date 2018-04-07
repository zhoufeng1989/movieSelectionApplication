import React from "react"
import LoadingPage from "./LoadingPage"
import "./Movie.css"


class Movie extends React.Component {
    state = {
        isLoading: true,
        movie: {}
    };


    componentDidMount() {
        const apiKey = process.env.REACT_APP_TMDB_API_KEY;
        const {movieId} = this.props.match.params;
        const movieUrl = `https://api.themoviedb.org/3/movie/${movieId}?api_key=${apiKey}&language=en-US`;
        fetch(movieUrl)
            .then(response => response.json())
            .then(data => this.setState({movie: data, isLoading: false}))
            .catch(error => console.log(error));
    }

    render() {
        const { isLoading } = this.state;
        const {
            title,
            backdrop_path,
            release_date,
            genres,
            overview,
            vote_average,
            runtime
        } = this.state.movie;
        return (
            <div className="movie-page">
                {isLoading
                    ? <LoadingPage />
                    : <div>
                        <img src={`http://image.tmdb.org/t/p/w1280/${backdrop_path}`} alt="movie poster"/>
                        <div className="movie-details">
                            <h1>{title}<span> ({release_date.substr(0, 4)})</span></h1>
                            <p>{genres.map(genre => genre.name).join(" | ")}</p>
                            <p>Rating: <span>{vote_average}</span></p>
                            <p>Runtime: <span>{runtime} min</span></p>
                            <h2>Overview</h2>
                            <p>{overview}</p>
                        </div>
                    </div>
                }
            </div>)
    }
}


export default Movie;