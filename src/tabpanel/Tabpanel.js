import React from 'react';
import './Tabpanel.css';

export default class Tabpanel extends React.Component {
    constructor (props) {
        super(props);
        this.state = {
            selected: 0
        };

        this.tabs = [];
        for (let i = 0; i < this.props.structure.length; i++)
            this.tabs[i] = React.createRef();
    }

    click (index, ev) {
        this.setState({ selected: index });
    }

    keyup (ev) {
        let selected = this.state.selected;
        if (ev.keyCode === 39 || ev.keyCode === 30) {
            selected = ((selected + 1) < this.tabs.length ? selected + 1 : selected);
            this.tabs[selected].current.focus();
            this.setState({selected: selected});
            return ;
        }
        if (ev.keyCode === 37 || ev.keyCode === 40) {
            selected = ((selected - 1) >= 0 ? selected - 1 : selected);
            this.tabs[selected].current.focus();
            this.setState({selected: selected});
            return ;
        }
    }

    render () {
        return (
            <div className="tab">
                <ul role="tablist">
                {(this.props.structure.map((tab, index) => {
                    return <li role="tab" key={tab.title}
                               tabIndex={(index === this.state.selected ? '0' : '-1')}
                               className={(index === this.state.selected ? 'selected' : '')}
                               ref={this.tabs[index]}
                               aria-controls={"panel" + tab.title}
                               id={"tab" + tab.title}
                               onKeyUp={this.keyup.bind(this)}
                               onClick={this.click.bind(this, index)}>{tab.title}</li>;
                }))}
                </ul>
                <div className="mask">
                    <div className="panels">
                        {(this.props.structure.map((tab, index) => {
                            return <div role="tabpanel" key={tab.title} id={"panel" + tab.title}
                                        aria-labelledby={"tab" + tab.title}
                                        className={(index === this.state.selected ? 'selected' : '')}
                                        aria-hidden={(index === this.state.selected ? 'false' : 'true')}>{tab.body}</div>;
                        }))}
                    </div>
                </div>
            </div>
        );
    }
}
