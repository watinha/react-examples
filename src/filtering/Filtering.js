import React from 'react';
import './Filtering.css';

class Filtering extends React.Component {
    constructor (props) {
        super(props);
        this.state = {
            searchValue: '',
            selectedIndex: -1,
            suggestions: props.options.sort((first, second) => {
                return first.name > second.name;
            })
        };
        this.keyup = this.keyup.bind(this);
        this.change = this.change.bind(this);
        this.select = this.select.bind(this);
    }

    select (ev) {
        this.setState({
            searchValue: ev.target.textContent
        });
    }

    change (ev) {
        this.setState({
            searchValue: ev.target.value,
            selectedIndex: -1
        });
    }

    keyup (ev) {
        if (ev.keyCode === 38 && this.state.selectedIndex > 0) {
            this.setState((prevState) => ({
                selectedIndex: (prevState.selectedIndex - 1),
                searchValue: this.state.suggestions[prevState.selectedIndex - 1].name
            }));
            return ;
        }
        if (ev.keyCode === 40 && this.state.selectedIndex < (this.state.suggestions.length - 1)) {
            this.setState((prevState) => ({
                selectedIndex: (prevState.selectedIndex + 1),
                searchValue: this.state.suggestions[prevState.selectedIndex + 1].name
            }));
            return ;
        }
        if (ev.keyCode === 40) {
            return ;
        }

        this.setState({
            suggestions: this.props.options.filter((option) => {
                return option.name.search(this.state.searchValue) === 0;
            })
        });
    }

    render () {
        return (<div className="filtering">
            <label htmlFor="searchField">Search: </label>
            <div className="input">
                <input id="searchField" onKeyUp={this.keyup} onChange={this.change}
                       autoComplete="false" aria-autocomplete="list" aria-owns="suggestions"
                       value={this.state.searchValue} />
                <ul id="suggestions" role="listbox">
                {this.state.suggestions.map((option, index) => {
                    return <li onClick={this.select} key={option.name}
                               className={(index === this.state.selectedIndex ? "selected" : "")}>{option.name}</li>
                })}
                </ul>
            </div>
        </div>);
    }
}

export default Filtering;
