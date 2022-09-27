import { React, Component } from "react";

import Header from "../header";
import RandomPlanet from "../random-planet";
import ErrorBoundary from "../error-boudary/error-boundary";
import SwapiService from "../../services/swapi-service";
import DummySwapiService from "../../services/dummy-swapi-service";
import {Redirect, Switch} from "react-router";
import {
  PeoplePage,
  PlanetPage,
  StarshipPage,
  LoginPage,
  SecretPage,
} from "../pages";
import { SwapiServiceProvider } from "../swapi-service-context";

import "./app.css";

import {
  BrowserRouter as Router,
  Route,
  Routes
} from "react-router-dom";
import { StarshipDetails } from "../sw-components";

export default class App extends Component {
  state = {
    swapiService: new SwapiService(),
    isLoggedIn: false,
  };

  onLogin = () => {
    this.setState({
      isLoggedIn: true,
    });
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
    const { isLoggedIn } = this.state;
    //Component Link use history Api from browser for refreshing the page

    //We using Link because it not reload full page as like "a"

    return (
      <ErrorBoundary>
        <SwapiServiceProvider value={this.state.swapiService}>
          <Router>
            <div className="stardb-app">
              <Header onServiceChange={this.onServiceChange} />
              <RandomPlanet />
              <Routes>
                <Switch>
                  <Route
                    path="/"
                    render={() => <h2>Welcome to Star DB</h2>}
                    exact
                  />
                  <Route path="/people/:id" element={<PeoplePage />} />
                  <Route path="/planets" element={<PlanetPage />} />
                  <Route path="/starship" element={<StarshipPage />} />
                  //dynamic math for react router
                  <Route
                    path="/starship/:id?"
                    element={<StarshipDetails />}
                    render={({ match }) => {
                      const { id } = match.params;
                      return <StarshipDetails itemId={id} />;
                    }}
                    exact
                  />
                  <Route
                    path="/login"
                    render={() => (
                      <LoginPage
                        i
                        sLoggedIn={isLoggedIn}
                        onLogin={this.onLogin}
                      />
                    )}
                  />
                  <Route
                    path="/secret"
                    render={() => <SecretPage isLoggedIn={isLoggedIn} />}
                  />
                  <Redirect to="/" />
                </Switch>
              </Routes>
            </div>
          </Router>
        </SwapiServiceProvider>
      </ErrorBoundary>
    );
  }
}
