import React, { Component } from 'react';
import CardList from '../components/cardList';
// import { robots } from './robots';
import SearchBox from '../components/searchBox';
import './App.css';
import Scroll from '../components/Scroll';
import ErrorBoundary from '../components/ErrorBoundry';

class App extends Component {

    constructor(){
        super();
        this.state = {
            robots: [],
            searchField: ''
        }
    }

    onSearchChange = (event) => {
        this.setState({searchField: event.target.value});
        
    }

    componentDidMount(){
        fetch('https://jsonplaceholder.typicode.com/users')
            .then(response => response.json())
            .then(json => this.setState({robots:json}))
    }

    render(){
        const {searchField, robots} = this.state;
        const filteredRobots = robots.filter(robot => {
            return robot.name.toLowerCase().includes(searchField.toLowerCase());
        });

        return !robots.length?
            <h1> Loading... </h1> :
            (
                <div className='tc'>
                    <h1 className='f1'>RoboFriends</h1>
                    <SearchBox searchChange = { this.onSearchChange }/>
                    <Scroll>
                        <ErrorBoundary>
                            <CardList robots = { filteredRobots }/>
                        </ErrorBoundary>
                    </Scroll>
                </div>
            );
    }
    
}

export default App;