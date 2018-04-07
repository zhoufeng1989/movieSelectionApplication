import React, { Component } from "react"
import { BrowserRouter, Switch, Route } from "react-router-dom"
import "./App.css"
import Header from "./header/Header"
import Main from "./main/Main"
import NotFound from "./NotFound"
import Movie from "./movie/Movie"


class App extends Component {
  render() {
    return (
        <BrowserRouter>
          <div>
              <Header />
              <Switch>
                  <Route exact path="/" component={Main}/>
                  <Route path="/movies/:movieId" component={Movie}/>
                  <Route component={NotFound} />
              </Switch>
          </div>
        </BrowserRouter>
    );
  }
}

export default App;
