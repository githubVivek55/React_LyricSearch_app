import React, {Component} from 'react';
import Navbar from './components/layout/Navbar';
import {BrowserRouter as Router, Switch, Route} from 'react-router-dom';
import Index from './components/layout/Index';
import Lyrics from './components/tracks/Lyrics';
import {Provider} from './Context';
import './App.css';

class App extends Component {
  render () {
    return (
      <Provider>
        <Router>
          <React.Fragment>
            <Navbar />
            <div className="container">
              <Switch>
                <Route exact path="/" component={Index} />
                <Route exact path="/track/lyrics/:id" component={Lyrics} />
              </Switch>
            </div>
          </React.Fragment>
        </Router>
      </Provider>
    );
  }
}

export default App;
