import { render } from '@testing-library/react';
import React from 'react';
import './App.css';
import CardList from '../components/CardList';
import SearchBox from '../components/SearchBox';
import Scroll from '../components/Scroll.js'


class App extends React.Component{
    constructor(){
        super()
        this.state = {
            robots: [],
            searchfield: ''
        }
    }

    componentDidMount(){
        fetch('https://jsonplaceholder.typicode.com/users').then(Response=>Response.json())
            .then(users=>this.setState({robots:users}))
    }

    onSearchChange = (event)=> {
        this.setState({searchfield: event.target.value})
        
    }

    render(){
        const {robots, searchfield} = this.state;
        const filteredRobots = robots.filter(robot=> {
            return robot.name.toLowerCase().includes(searchfield.toLowerCase());
        })
        return !robots.length?
            <h1>loading</h1>:
        (
            <div className="tc">
                <h1 className="f1">RoboFriends</h1>
                <SearchBox searchChange={this.onSearchChange} />
                <Scroll>
                    <CardList robots={filteredRobots}/>
                </Scroll>
            </div>
        );
    }
}

export default App; 