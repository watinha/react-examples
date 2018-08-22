import React from 'react';
import './todo.css';

export default class Todo extends React.Component {
    constructor (props) {
        super(props);
        this.state = { itens: [], input: '' };
    }

    add () {
        let itens = this.state.itens;
        itens.push({ text: this.state.input, done: false });
        this.setState({
            itens: itens,
            input: ''
        });
    }

    change (ev) {
        this.setState({ input: ev.target.value });
    }

    done (index) {
        let itens = this.state.itens;
        itens[index].done = true;
        this.setState({
            itens: itens
        });
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
                        <li key={'todo' + item.text}
                            className={(item.done ? 'done' : '')}>
                            <input type="checkbox"
                                   id={'checkbox' + index}
                                   onClick={this.done.bind(this, index)}/>
                            <label htmlFor={'checkbox' + index}>{item.text}</label>
                        </li>
                    );
                }))}
                </ul>
            </div>
        );
    }
}
