import React from 'react';
import './todo.css';

export default class Todo extends React.Component {
    constructor (props) {
        super(props);
        this.state = { itens: [], input: '' };
    }

    add () {
        this.setState((prev) => {
            prev.itens.push({ text: this.state.input, done: false });
            prev.input = '';
            return prev;
        });
    }

    change (ev) {
        this.setState({ input: ev.target.value });
    }

    done (index) {
        this.setState((prev) => {
            prev.itens[index].done = true;
            return prev;
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
