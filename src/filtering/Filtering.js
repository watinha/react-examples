import React from 'react';
import './Filtering.css';

class Filtering extends React.Component {
    constructor (props) {
        super(props);
        this.state = {
            searchValue: '',
            suggestions: props.options.sort((first, second) => {
                return first.name > second.name;
            })
        };
        this.search = this.search.bind(this);
        this.change = this.change.bind(this);
        this.select = this.select.bind(this);
    }

    select (ev) {
        this.setState({
            searchValue: ev.target.textContent
        });
    }

    change (ev) {
        this.setState({ searchValue: ev.target.value });
    }

    search (ev) {
        this.setState({
            suggestions: this.props.options.filter((option) => {
                return option.name.search(this.state.searchValue) === 0;
            })
        });
    }

    render () {
        return (<div className="filtering">
            <label htmlFor="searchField">Search: </label>
            <input id="searchField" onKeyUp={this.search} onChange={this.change}
                   value={this.state.searchValue} />
            <ul>
            {this.state.suggestions.map((option) => {
                return <li onClick={this.select} key={option.name}>{option.name}</li>
            })}
            </ul>
        </div>);
    }
}

export default Filtering;
