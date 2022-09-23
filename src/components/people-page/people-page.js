import { React,  Component } from 'react';

import ErrorBoundary from '../error-boudary/error-boundary';
import Row from '../row';
import ItemList from '../item-list/item-list';
import ItemDetails from '../item-details/item-details';
import SwapiService from '../../services/swapi-service';

import './people-page.css';

export default class PeoplePage extends Component {

  swapiService = new SwapiService();

  state = {
    selectedPerson: 11,
  };

  

  onPersonSelected = (selectedPerson) => {
    this.setState({ selectedPerson });
  };

  render() {

    if (this.state.hasError) {
      return <ErrorIndicator />;
    }

    const itemList = (
      <ItemList 
          onItemSelected={this.onPersonSelected}
          getData = {this.swapiService.getAllPeople}>
        
        {(i) => (
          `${i.name} (${i.birthYear})`
        )}
          
      </ItemList>
    );

    const personDetails = (
      <ErrorBoundary>
        <ItemDetails itemId={this.state.selectedPerson} />
      </ErrorBoundary>
    );

    return (
        <Row left={itemList} right={personDetails}/>
    );
  }
}