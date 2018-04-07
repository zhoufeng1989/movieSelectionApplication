import React from "react";
import Movies from "./movies/Movies";
import Navigation from "./navigation/Navigation";
import queryString from "query-string";
import "./Main.css"


class Main extends React.Component {
    localStorageKey = "movieSelection.main";

    state = {
        genre: {
            id: "35",
            name: "Comedy"
        },
        genres: [],
        year: {
            label: "year",
            min: 1990,
            max: 2018,
            step: 1,
            value: { min: 2000, max: 2018 }
        },
        rating: {
            label: "rating",
            min: 0,
            max: 10, step: 1,
            value: { min: 8, max: 10 }
        },
        runtime: {
            label: "runtime",
            min: 0,
            max: 300,
            step: 15,
            value: { min: 60, max: 120 }
        },
        page: 1,
        movieUrl: `https://api.themoviedb.org/3/discover/movie?api_key=${process.env.REACT_APP_TMDB_API_KEY}&language=en-US`
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
        if (!state || !state.genres) {
            const apiKey = process.env.REACT_APP_TMDB_API_KEY;
            const genresUrl = `https://api.themoviedb.org/3/genre/movie/list?api_key=${apiKey}&language=en-US`;
            fetch(genresUrl)
                .then(response => response.json())
                .then(data => this.setState({genres: data.genres}))
                .catch(error => console.log(error));
        }
        else {
            this.setState({...state});
        }
    }

    onGenreChange = event => {
        const genreId = this.state.genres.filter(
            g => g.name === this.state.genre.name
        )[0].id;
        this.setState({
            genre:{
                id: genreId,
                name: event.target.value
            }
        });
    };

    onSliderChange = ({type, value}) => {
        this.setState({
            [type]: {
                ...this.state[type],
                value: value
            }
        });
    };


    onButtonClick = () => {
        this.generateMovieUrl();
    };

    generateMovieUrl = () =>  {
        const {genre, year, rating, runtime} = this.state;
        const apiKey = process.env.REACT_APP_TMDB_API_KEY;
        const parameters = {
            api_key: apiKey,
            with_genres: genre.id,
            "primary_release_date.lte": `${year.value.max}-12-31`,
            "primary_release_date.gte": `${year.value.min}-01-01`,
            "vote_average.lte": rating.value.max,
            "vote_average.gte": rating.value.min,
            "with_runtime.lte": runtime.value.max,
            "with_runtime.gte": runtime.value.min,
            sort_by: "popularity.desc",
        };
        this.setState({
            movieUrl: `https://api.themoviedb.org/3/discover/movie?${queryString.stringify(parameters)}`,
            page: 1
        });
    };


    onIncreasePage = () => {
        this.setState({page: this.state.page + 1});
    };


    onDecreasePage = () => {
        if (this.state.page > 1) {
            this.setState({page: this.state.page - 1});
        }
    };


    render() {
        return (
            <section className="main">
                <Navigation onGenreChange={this.onGenreChange}
                            onSliderChange={this.onSliderChange}
                            onButtonClick={this.onButtonClick}
                            genre={this.state.genre}
                            genres={this.state.genres}
                            year={this.state.year}
                            rating={this.state.rating}
                            runtime={this.state.runtime} />
                <Movies movieUrl={this.state.movieUrl}
                        page={this.state.page}
                        onIncreasePage={this.onIncreasePage}
                        onDecreasePage={this.onDecreasePage} />
            </section>
        )
    }
}


export default Main;