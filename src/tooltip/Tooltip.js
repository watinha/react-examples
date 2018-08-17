import React from 'react';
import './Tooltip.css';

class Tooltip extends React.Component {
    constructor (props) {
        super(props);
        this.state = {visible: false};
        this.show = this.show.bind(this);
        this.hide = this.hide.bind(this);
    }

    show (e) {
        this.setState({
            visible: true
        });

    }

    hide (e) {
        this.setState({
            visible: false
        });
    }

    render () {
        return (
            <div className="tooltip" onMouseOver={this.show} onMouseOut={this.hide}>
                {this.props.content}
                <div className={"tooltip " + (this.state.visible ? 'appear' : 'hidden') }>
                    {this.props.more}
                </div>
            </div>
        );
    }
}

export default Tooltip;
