import React from 'react';
import './super_simple.css';

export default class SuperSimple extends React.Component {
    render () {
        return (
            <div className="super_simple">
                {this.props.title}
            </div>
        );
    }
}
