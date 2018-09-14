import React from 'react';

export default class SearchWikipedia extends React.Component {
    constructor (props) {
        super(props);
        this.state = { description: '', searchField: '' };
    }

    searchWikipedia () {
        let self = this;
        this.props.axios.get('https://en.wikipedia.org/w/api.php?prop=extracts&exintro&explaintext', {
            params: {
               format: 'json',
               action: 'query',
               redirects: '1',
               titles: this.state.searchField,
               origin: '*'
            }
        }).then((response) => {
            self.setState({
                description: response.data.query.pages[Object.keys(response.data.query.pages)[0]].extract
            });
        });
    }

    change (ev) {
        this.setState({ searchField: ev.target.value });
    }

    render () {
        return (
            <div className="searchWikipedia">
                <label htmlFor="search">Search: </label>
                <input type="text" name="search" value={this.state.searchField}
                        onChange={this.change.bind(this)} />
                <button onClick={this.searchWikipedia.bind(this)}>Go!</button>
                <p>{this.state.description}</p>
            </div>
        );
    }
}
