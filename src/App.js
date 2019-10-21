import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";

class App extends Component {
  render() {
    return (
      <Router>
        <div className="container">
          <h2>MERN Stack - Game Offers</h2>
        </div>
        <Route path="/" exact component={DailyOffers}></Route>
        <Route path="/search" exact component={SearchOffers}></Route>
        <Route path="/favorites" exact component={SavedOffers}></Route>
      </Router>
    );
  }
}

export default App;
