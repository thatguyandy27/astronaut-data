import React from 'react';
import {Table, TableBody, TableHeader, TableHeaderColumn, TableRow, TableRowColumn} from 'material-ui/Table';

class AstronautList extends React.Component {
    constructor(props){
        super(props);
    }

    render(){

        let tableRows = '';

        if (this.props.astronauts){
            tableRows = this.props.astronauts.map((astronaut) => (<TableRow key={astronaut.id}> 
                    <TableRowColumn>{astronaut.name}</TableRowColumn>
                    <TableRowColumn>{astronaut.selectionYear}</TableRowColumn>
                    <TableRowColumn>{astronaut.selectionGroup}</TableRowColumn>
                    <TableRowColumn>{astronaut.isActiveDescription}</TableRowColumn>
                    <TableRowColumn>{astronaut.education}</TableRowColumn>
                    <TableRowColumn>{astronaut.militaryExperience}</TableRowColumn>
                </TableRow> ));
        }

        return (<div className='astronaut-list-container'> 
                <Table >
                    <TableHeader displaySelectAll={false} adjustForCheckbox={false} enableSelectAll={false}>
                      <TableRow onCellClick={(evt, row, col) => console.log(`${col} - ${row}`)}>
                        <TableHeaderColumn>Name</TableHeaderColumn>
                        <TableHeaderColumn  >Selection Year</TableHeaderColumn>
                        <TableHeaderColumn onClick={(row, col) => console.log(col)} >Selection Group</TableHeaderColumn>
                        <TableHeaderColumn onClick={(row, col) => console.log(col)}>Active?</TableHeaderColumn>
                        <TableHeaderColumn>Education</TableHeaderColumn>
                        <TableHeaderColumn>Military Experience</TableHeaderColumn>
                      </TableRow>
                    </TableHeader>
                    <TableBody displayRowCheckbox={false} >
                        {tableRows}
                    </TableBody>
                </Table>

            </div>);
    }
}

export default AstronautList;
