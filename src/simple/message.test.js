import React from 'react';
import ReactDOM from 'react-dom';
import ReactTestUtils from 'react-dom/test-utils';

import Message from './message';

describe('simple message component', () => {
    it('should render', () => {
        let component = <Message button="click..." message="Surprise!!!"/>,
            container = document.createElement('div'),
            button, div;
        ReactDOM.render(component, container);
        button = container.querySelector('button');
        div = container.querySelector('.message div');
        expect(button.textContent).toBe('click...');
        expect(div.textContent).toBe('Surprise!!!');
    });

    it('should render with params', () => {
        let component = <Message button="click?" message="Oi!!!" />,
            container = document.createElement('div'),
            button, div;
        ReactDOM.render(component, container);
        button = container.querySelector('button');
        div = container.querySelector('.message div');
        expect(button.textContent).toBe('click?');
        expect(div.textContent).toBe('Oi!!!');
    });

    it('should add class on button click', () => {
        let component = <Message button="click?" message="Oi!!!" />,
            container = document.createElement('div'),
            button, div;
        ReactDOM.render(component, container);
        button = container.querySelector('button');
        div = container.querySelector('.message div');

        ReactTestUtils.Simulate.click(button);

        expect(div.className).toBe('appear');
    });
});
