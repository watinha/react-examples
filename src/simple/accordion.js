import React from 'react';
import './accordion.css';

export default class Accordion extends React.Component {
    constructor (props) {
        super(props);
        this.state = {
            selected: -1,
            sections: [
                { title: 'Seção 1', content: 'Alguma coisa legal 1'},
                { title: 'Seção 2', content: 'Alguma coisa legal 2'},
                { title: 'Seção 3', content: 'Alguma coisa legal 3'}
            ]
        };
    }

    click(index, ev) {
        this.setState({ selected: index});
    }

    render () {
        return (
            <div className='accordion'>
                {(this.state.sections.map((section, index) => {
                    return (
                        <section key={'sec_' + section.title}
                                className={(index === this.state.selected?  "appear" : "")}>
                            <button onClick={this.click.bind(this, index)}
                                >{section.title}</button>
                            <div>{section.content}</div>
                        </section>
                    );
                }))}
            </div>
        );
    }
}
