'use strict';

import React from 'react';

export class Hello extends React.Component {
    constructor() {
        super();
    }

    render() {
        return (<div>
            { this.props.name }
        </div>);            
    }
}


export default Hello;