import React from 'react';
import ReactDOM from 'react-dom';
import ReactTestUtils from 'react-dom/test-utils';

import Accordion from './accordion';

describe('Accordion component', () => {
    it('should render', () => {
        let component = <Accordion />,
            container = document.createElement('div'),
            buttons, sections;
        ReactDOM.render(component, container);
        buttons = container.querySelectorAll('.accordion button');
        sections = container.querySelectorAll('.accordion section');
        expect(buttons.length).toBe(3);
        expect(sections.length).toBe(3);
    });
    it('should show section on click', () => {
        let component = <Accordion />,
            container = document.createElement('div'),
            buttons, sections;
        ReactDOM.render(component, container);
        buttons = container.querySelectorAll('.accordion button');
        sections = container.querySelectorAll('.accordion section');
        ReactTestUtils.Simulate.click(buttons[0]);
        expect(sections[0].className).toBe('appear');
        ReactTestUtils.Simulate.click(buttons[1]);
        expect(sections[1].className).toBe('appear');
        ReactTestUtils.Simulate.click(buttons[2]);
        expect(sections[2].className).toBe('appear');
    });
});
