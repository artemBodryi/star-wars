import { React, Component } from "react";

import Header from "../header";
import RandomPlanet from "../random-planet";
import ErrorBoundary from "../error-boudary/error-boundary";
import SwapiService from "../../services/swapi-service";
// import DummySwapiService from '../../services/dummy-swapi-service';

import { PeoplePage, PlanetPage, StarshipPage } from "../pages";
import { SwapiServiceProvider } from "../swapi-service-context";

import "./app.css";

export default class App extends Component {

  state = {
    swapiService: new SwapiService()
  };

  render() {
    
    return (
      <ErrorBoundary>
        <SwapiServiceProvider value={this.state.swapiService}>
          <div className="stardb-app">
            <Header />

            <RandomPlanet />
            <PeoplePage />
            <PlanetPage />
            <StarshipPage />
            
          </div>
        </SwapiServiceProvider>
      </ErrorBoundary>
    );
  }
}
