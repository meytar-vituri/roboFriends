import { render } from '@testing-library/react';
import React from 'react';
import {connect} from 'react-redux';
import './App.css';
import CardList from '../components/CardList';
import SearchBox from '../components/SearchBox';
import Scroll from '../components/Scroll.js';
import {requestRobots, setSearchfield} from '../actions';

const mapStateToProps = (state) => {
    return {
        searchField: state.searchRobots.searchField,
        robots: state.requestRobots.robots,
        isPending: state.requestRobots.isPending,
        error: state.requestRobots.error
    }
}
const mapDispatchToProps = (dispatch) =>{
    return {
        onSearchChange: (event) => dispatch(setSearchfield(event.target.value)),
        onRequestRobots: () => dispatch(requestRobots())
    }
}

class App extends React.Component{
    componentDidMount(){
        this.props.onRequestRobots();
    }


    render(){
        const {robots,searchField, onSearchChange, isPending} = this.props;
        const filteredRobots = robots.filter (robot =>{
            return robot.name.toLowerCase().includes(searchField.toLowerCase())
        })
        return isPending ?
            <h1>loading</h1>:
            (
                <div className="tc">
                    <h1 className="f1">RoboFriends</h1>
                    <SearchBox searchChange={onSearchChange} />
                    <Scroll>
                            <CardList robots={filteredRobots}/>
                    </Scroll>
                </div>
            );
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(App); 