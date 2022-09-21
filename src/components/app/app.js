import { React, Component } from 'react';

import ItemList from '../item-list';
import Header from '../header';
import RandomPlanet from'../random-planet';
import PersonDetails from '../person-details';
// import SwapiService from '../../services/swapi-service';

import './app.css';
import ErrorButton from '../error-button/error.button';
import ErrorIndicator from '../error-indicator';

export default class App extends Component {
    
    // SwapiService = new SwapiService();


    state = {
        showRandomPlanet: true,
        selectedPerson: 4,
        hasError: false
    }

    toggleRandomPlanet = () => {
        this.setState((state) => {
            return {
                showRandomPlanet: !state.showRandomPlanet
            }
        });
    }

    onPersonSelected =(id) => {
        this.setState({
            selectedPerson: id
        });
    };

    componentDidCatch() {
        console.log(`componentDidCatch()`);
        this.setState({ hasError: true });
    }

    render() {

        if (this.state.hasError) {
            return <ErrorIndicator />
        }

        const planet = this.state.showRandomPlanet ?
                        <RandomPlanet /> : 
                        null;


        return (
            <div className="stardb-app">
                <Header />
                { planet }
                <div className="row mb2 button-row">
                    <button 
                        className="toggle-planet btn btn-warning btn-lg"
                        onClick={this.toggleRandomPlanet}>
                        Toggle Random Planet
                    </button>
                    <ErrorButton />
                </div>

                <div className="row mb2">
                    <div className="col-md-6">
                        <ItemList onItemSelected = {this.onPersonSelected}/>
                    </div>
                    <div className="col-md-6">
                        <PersonDetails personId = {this.state.selectedPerson} />
                    </div>
                </div>
            </div>
        );
    }
};
