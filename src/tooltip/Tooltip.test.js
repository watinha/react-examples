import React from 'react';
import ReactDOM from 'react-dom';
import ReactTestUtils from 'react-dom/test-utils';

import Tooltip from './Tooltip';

describe('Tooltip spec...', () => {
    it('should render a component', () => {
        let component = <Tooltip time={0}/>,
            div = document.createElement('div');
        ReactDOM.render(component, div);
    });
    it('should present a div with content inside', () => {
        let component = <Tooltip content="Abobrinha na TOoltip" time={0}/>,
            div = document.createElement('div'),
            tooltip_content;
        ReactDOM.render(component, div);
        tooltip_content = div.querySelector('div').textContent;
        expect(tooltip_content).toBe("Abobrinha na TOoltip");
        expect(div.querySelectorAll('div').length).toBe(2);
        expect(div.querySelectorAll('div')[1].className).toBe('tooltip hidden');
    });
    it('should show tooltip only when mouse hovered', () => {
        let component = <Tooltip content="Abobrinha na TOoltip" more="Something cool!!!" time={0}/>,
            container = document.createElement('div'),
            div = null, t;
        ReactDOM.render(component, container);
        div = container.querySelector('div');
        ReactTestUtils.Simulate.mouseOver(div);
        t = div.querySelector('div');
        expect(t.tagName).toBe('DIV');
        expect(t.className).toBe('tooltip appear');
        expect(t.textContent).toBe('Something cool!!!');
    });
    it('should hide tooltip when mouse is moved out', () => {
        let component = <Tooltip content="Abobrinha na TOoltip" more="Something cool!!!" time={0}/>,
            container = document.createElement('div'),
            div = null, t;
        ReactDOM.render(component, container);
        div = container.querySelector('div');
        ReactTestUtils.Simulate.mouseOver(div);
        t = div.querySelector('div');
        expect(t.textContent).toBe('Something cool!!!');
        expect(t.className).toBe('tooltip appear');
        ReactTestUtils.Simulate.mouseOut(div);
        t = div.querySelectorAll('div');
        expect(t.length).toBe(1);
        expect(t[0].className).toBe('tooltip hidden');
    });
    it('should show tooltip only when focus is set', () => {
        let component = <Tooltip content="Abobrinha na TOoltip" more="Something cool!!!" time={0}/>,
            container = document.createElement('div'),
            div = null, link = null, t;
        ReactDOM.render(component, container);
        div = container.querySelector('div');
        link = container.querySelector('a');
        ReactTestUtils.Simulate.focus(link);
        t = div.querySelector('div');
        expect(t.tagName).toBe('DIV');
        expect(t.className).toBe('tooltip appear');
        expect(t.textContent).toBe('Something cool!!!');
    });
    it('should hide tooltip when the element is blured', () => {
        let component = <Tooltip content="Abobrinha na TOoltip" more="Something cool!!!" time={0}/>,
            container = document.createElement('div'),
            div = null, link = null, t = null;
        ReactDOM.render(component, container);
        div = container.querySelector('div');
        link = container.querySelector('a');
        ReactTestUtils.Simulate.focus(link);
        t = div.querySelector('div');
        expect(t.textContent).toBe('Something cool!!!');
        expect(t.className).toBe('tooltip appear');
        ReactTestUtils.Simulate.blur(link);
        t = div.querySelectorAll('div');
        expect(t.length).toBe(1);
        expect(t[0].className).toBe('tooltip hidden');
    });
});
