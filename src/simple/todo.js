import React from 'react';
import './todo.css';

export default class Todo extends React.Component {
    constructor (props) {
        super(props);
        this.state = { itens: [], input: '' };
    }

    add () {
        let itens = this.state.itens;
        itens.push(this.state.input);
        this.setState({
            itens: itens,
            input: ''
        });
    }

    change (ev) {
        this.setState({ input: ev.target.value });
    }

    done (index) {
        setTimeout(() => {
            let itens = this.state.itens;
            itens.splice(index, 1);
            this.setState({
                itens: itens
            });
        }, 1000);
    }

    render () {
        return (
            <div className='todo'>
                <input type="text" id="input"
                       value={this.state.input}
                       onChange={this.change.bind(this)} />
                <button onClick={this.add.bind(this)}>insert</button>
                <ul>
                {(this.state.itens.map((item, index) => {
                    return (
                        <li key={'todo' + item}>
                            <input type="checkbox"
                                   id={'checkbox' + index}
                                   onClick={this.done.bind(this, index)}/>
                            <label htmlFor={'checkbox' + index}>{item}</label>
                        </li>
                    );
                }))}
                </ul>
            </div>
        );
    }
}
