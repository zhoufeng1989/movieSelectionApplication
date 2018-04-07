import React from "react"
import MovieListItem from "./MovieListItem"
import "./Movies.css"


class Movies extends React.Component {
    localStorageKey = "movieSelection.movies";
    state = {
        movies: []
    };

    saveStateToLocalStorage = (params) => {
        localStorage.setItem(this.localStorageKey, JSON.stringify(params));
    };


    loadStateFromLocalStorage = () => {
        return JSON.parse(localStorage.getItem(this.localStorageKey));
    };

    componentDidUpdate(prevProps, prevState, snapshot) {
        this.saveStateToLocalStorage(this.state);
    }

    componentDidMount() {
        const state = this.loadStateFromLocalStorage();
        if (state) {
            this.setState({...state});
        }
        else {
            this.discoverMovies(this.props.movieUrl, this.props.page);
        }
    }


    componentWillReceiveProps(nextProps) {
        if (this.props.movieUrl !== nextProps.movieUrl || this.props.page !== nextProps.page) {
            this.discoverMovies(nextProps.movieUrl, nextProps.page);
        }
    }

    discoverMovies(movieUrl, page=1) {
        const pageMovieUrl = `${movieUrl}&page=${page}`;
        fetch(pageMovieUrl)
            .then(response => response.json())
            .then(data => this.storeMovies(data))
            .catch(error => console.log(error))

    }

    storeMovies(data) {
        const movies = data.results.map(
            item => {
                const {
                    id,
                    title,
                    poster_path,
                    vote_count,
                    vote_average,
                    genre_ids,
                    release_date
                } = item;
                return {
                    id, title, poster_path, vote_count,
                    vote_average, genre_ids, release_date
                };
            }
        );
        this.setState({movies});
    }

    render() {
        return (
            <section>
                <div>
                    <ul className="movies">
                        {
                            this.state.movies.map(
                                movie => <MovieListItem key={movie.id} movie={movie} />
                            )
                        }
                    </ul>
                </div>
                <div className="pagination">
                    <button onClick={this.props.onDecreasePage}> Previous Page </button>
                    <span>Page {this.props.page}</span>
                    <button onClick={this.props.onIncreasePage}> Next Page </button>
                </div>
            </section>
        )
    }
}


export default Movies;
