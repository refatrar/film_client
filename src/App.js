import React, {Component} from 'react';

import Routes from "./config/Routes";

class App extends Component{
    render() {
        return (
            <div className="App">
                <Routes />
            </div>
        )
    }
}

const mapStateToProps = state => ({
    userinfo: state.films.userData,

})

export default connect(mapStateToProps)(App);
