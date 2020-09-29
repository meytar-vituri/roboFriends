import { render } from '@testing-library/react';
import React from 'react';
import {connect} from 'react-redux';
import './App.css';
import CardList from '../components/CardList';
import SearchBox from '../components/SearchBox';
import Scroll from '../components/Scroll.js';
import ErrorBoundry from '../components/ErrorBoundry';

import {setSearchfield} from '../actions';

const mapStateToProps = (state) => {
    return {
        searchField: state.searchField,
    }
}
const mapDispatchToProps = (dispatch) =>{
    return {
        onSearchChange: (event) => dispatch(setSearchfield(event.target.value))
    }
}

class App extends React.Component{
    constructor(){
        super()
        this.state = {
            robots: []
        }
    }

    componentDidMount(){
        fetch('https://jsonplaceholder.typicode.com/users').then(Response=>Response.json())
            .then(users=>this.setState({robots:users}))
    }


    render(){
        const {robots} = this.state;
        const {searchField, onSearchChange} = this.props
        const filteredRobots = robots.filter(robot=> {
            return robot.name.toLowerCase().includes(searchField.toLowerCase());
        })
        return !robots.length?
            <h1>loading</h1>:
        (
            <div className="tc">
                <h1 className="f1">RoboFriends</h1>
                <SearchBox searchChange={onSearchChange} />
                <Scroll>
                    <ErrorBoundry>
                        <CardList robots={filteredRobots}/>
                    </ErrorBoundry>
                </Scroll>
            </div>
        );
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(App); 