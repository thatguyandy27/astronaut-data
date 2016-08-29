import React from 'react';
import {connect} from  'react-redux';
import * as filterActions from '../actions/filterActions.js';
import * as sortActions from '../actions/sortActions.js';
import * as astronautActions from '../actions/astronautActions.js';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';

import Header from './header.js';
import Filters from './filters.js';
import AstronautList from './astronautList.js';

function mapStateToProps(state){
    return {
        sort: state.sort,
        filters: state.filters,
        astronauts: state.astronauts
    };
}

function mapDispatchToProps(dispatch){
    return {
        addFilter: (filter) => dispatch(filterActions.addFilter(filter)),
        removeFilter: (filter) => dispatch(filterActions.removeFilter(filter)),
        sortBy: (sortBy) => dispatch(sortActions.sortBy(sortBy)),
        triggerLoadAstroauts: () => dispatch(astronautActions.triggerLoadAstroauts())
    };
}

class AstronautApp extends React.Component {
    constructor(props){
        super(props);
    }

    componentWillMount(){
        this.props.triggerLoadAstroauts();
    }
    
    render() {
        return (<MuiThemeProvider>
                    <div className='app-container'>
                        <div className='header-container'>
                            <Header />
                        </div>
                        <div className='filter-container'>
                            <Filters filters={this.props.filters} addFilter={this.props.addFilter} removeFilter={this.props.removeFilter} />
                        </div>
                        <div className='astronaut-list-container'>
                            <AstronautList sortBy={this.props.sortBy} astronauts={this.props.astronauts} /> 
                        </div>
                </div>
            </MuiThemeProvider>);
    }
}


export default connect(mapStateToProps, mapDispatchToProps)(AstronautApp);