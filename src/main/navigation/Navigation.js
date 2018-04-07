import React from "react"
import Selection from "./Selection"
import Slider from "./Slider"
import SearchButton from "./SearchButton"
import "./Navigation.css"


const Navigation = ({
    onGenreChange, onSliderChange, onButtonClick,
    genre, genres, year, rating, runtime}) => (
            <section className="navigation">
                <Selection genre={genre}
                           genres={genres}
                           onGenreChange={onGenreChange}/>
                <Slider data={year}
                        onChange={onSliderChange} />
                <Slider data={rating}
                        onChange={onSliderChange} />
                <Slider data={runtime}
                        onChange={onSliderChange} />
                <SearchButton onClick={onButtonClick} />
            </section>
        );


export default Navigation;