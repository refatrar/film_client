import React, { Component } from 'react';
import { Router, Route, Switch } from "react-router-dom";

import history from "./history";
import AllFilms from "../components/AllFilms";
import FilmView from "../components/FilmView"
import Singin from "../components/Singin"
import Singup from "../components/Singup"
import CreatePost from "../components/CreatePost"

class Routes extends Component {
    render() {
        return (
            <Router history={history}>
                <Switch>
                    <Route exact path={'/'} render={(props) => <AllFilms {...props} />}/>
                    <Route exact path="/films/:slug" render={(props) => <FilmView {...props} />}/>

                    <Route exact path="/signin" render={(props) => <Singin {...props} />}/>
                    <Route exact path="/signup" render={(props) => <Singup {...props} />}/>
                    <Route exact path="/create-post" render={(props) => <CreatePost {...props} />}/>
                </Switch>
            </Router>
        )
    }
}

export default Routes