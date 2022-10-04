import React, { Component } from "react";

import Header from "../header";
import RandomPlanet from "../random-planet";
import ErrorBoundary from '../error-boundary';
import SwapiService from "../../services/swapi-service";
import DummySwapiService from "../../services/dummy-swapi-service";
import { PeoplePage, PlanetsPage, StarshipPage as StarshipPage } from "../pages";
import { SwapiServiceProvider } from "../swapi-service-context";
import "./app.css";

import { BrowserRouter as Router, Routes, Route, useParams } from "react-router-dom";
import StarshipDetails from "../sw-components/starship-details";
import ErrorPage from '../pages/error-page';

export default class App extends Component {
  
  state = {
    swapiService: new SwapiService(),
  };

  onServiceChange = () => {
    this.setState(({ swapiService }) => {
      const Service =
        swapiService instanceof SwapiService ? DummySwapiService : SwapiService;
      return {
        swapiService: new Service(),
      };
    });
  };

  render() {
    return (
      <ErrorBoundary>
        <SwapiServiceProvider value={this.state.swapiService}>
          <Router>
            <div className="stardb-app">
              <Header onServiceChange={this.onServiceChange} />
              <Routes>
                <Route path="/" element={<RandomPlanet />}  render={() => <h2>Welcome to Star DB</h2>}/>
                <Route path="/people" element={<PeoplePage />} />
                <Route path="/planets" element={<PlanetsPage />} />
                <Route exact path="/starship" element={<StarshipPage />} />
                <Route 
                //We do not use match anymore, now we use hook useParams()
                  path="/starship/:id" 
                  render={({match}) => {
                    const {id} = match.params;
                  return <StarshipDetails itemId={id} />
                }} />
                <Route path="*" element={<ErrorPage />}/>
              </Routes>
            </div>
          </Router>
        </SwapiServiceProvider>
      </ErrorBoundary>
    );
  }
}
