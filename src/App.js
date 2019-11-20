import React, { Component } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import {Route, BrowserRouter as Router } from 'react-router-dom';

import PA from './PA';
import PB from './PB';
// import PNF from './PageNotFound';
// import E1 from './E1';
// import E2 from './E2';
// import E3 from './E3';
 
class App extends Component {
    render() {
        return (
            <div className="App" id="root">
                <Router>
                    <Route
                        path="/" exact render={() => {
                            return (<PA></PA>)
                        }}
                    />
                    <Route
                        path={`/p/`} render={() => {
                            return (<PB></PB>)
                        }}
                    />
                    {/* <Route path="*" exact component={PNF} /> */}
                </Router>
            </div>
        );
    }
}
 
export default App;