import React from 'react';
import ReactDOM from 'react-dom';
import ReactTestUtils from 'react-dom/test-utils';

import Tabpanel from './Tabpanel';

describe('Tabpanel component', () => {
    it('should construct', () => {
        let component = <Tabpanel structure={[]}/>,
            container = document.createElement('div');
        ReactDOM.render(component, container);
    });

    it('should build HTML markup based on properties', () => {
        let structure = [
                { title: 'Frutas', body: <div><ul><li>Abacaxi</li><li>Mamão</li></ul></div>},
                { title: 'Legumes', body: <div><ul><li>Beterraba</li><li>Pepino</li></ul></div>},
            ],
            component = <Tabpanel structure={structure}/>,
            container = document.createElement('div'), tabList, tabs, panels;
        ReactDOM.render(component, container);
        tabList = container.querySelectorAll('*[role=tablist]');
        tabs = container.querySelectorAll('*[role=tab]');
        panels = container.querySelectorAll('*[role=tabpanel]');
        expect(tabList.length).toBe(1);
        expect(tabs.length).toBe(2);
        expect(tabs[0].textContent).toBe(structure[0].title);
        expect(tabs[1].textContent).toBe(structure[1].title);
        expect(panels.length).toBe(2);
        expect(panels[0].textContent).toEqual(jasmine.stringMatching(new RegExp('Abacaxi')));
        expect(panels[1].textContent).toEqual(jasmine.stringMatching(new RegExp('Beterraba')));
    });

    it('should build HTML markup based on properties 2', () => {
        let structure = [
                { title: 'Carros', body: <div><ul><li>Cruise</li><li>Maliby</li></ul></div>},
                { title: 'Motos', body: <div><ul><li>CC</li><li>Delrey</li></ul></div>},
                { title: 'Saudáveis', body: <div><ul><li>Bicicleta</li><li>Skate</li></ul></div>},
            ],
            component = <Tabpanel structure={structure}/>,
            container = document.createElement('div'), tabList, tabs, panels;
        ReactDOM.render(component, container);
        tabList = container.querySelectorAll('*[role=tablist]');
        tabs = container.querySelectorAll('*[role=tab]');
        panels = container.querySelectorAll('*[role=tabpanel]');
        expect(tabList.length).toBe(1);
        expect(tabs.length).toBe(3);
        expect(tabs[0].textContent).toBe(structure[0].title);
        expect(tabs[1].textContent).toBe(structure[1].title);
        expect(tabs[2].textContent).toBe(structure[2].title);
        expect(panels.length).toBe(3);
        expect(panels[0].textContent).toEqual(jasmine.stringMatching(new RegExp('Cruise')));
        expect(panels[1].textContent).toEqual(jasmine.stringMatching(new RegExp('CC')));
        expect(panels[2].textContent).toEqual(jasmine.stringMatching(new RegExp('Bicicleta')));
    });

    it('should select the first tab and panel in the beginning', () => {
        let structure = [
                { title: 'Frutas', body: <div><ul><li>Abacaxi</li><li>Mamão</li></ul></div>},
                { title: 'Legumes', body: <div><ul><li>Beterraba</li><li>Pepino</li></ul></div>},
            ],
            component = <Tabpanel structure={structure}/>,
            container = document.createElement('div'), tabList, tabs, panels;
        ReactDOM.render(component, container);
        tabList = container.querySelectorAll('*[role=tablist]');
        tabs = container.querySelectorAll('*[role=tab]');
        panels = container.querySelectorAll('*[role=tabpanel]');

        expect(tabs.length).toBe(2);
        expect(tabs[0].className).toBe('selected');
        expect(tabs[1].className).toBe('');

        expect(panels.length).toBe(2);
        expect(panels[0].className).toBe('selected');
        expect(panels[0].getAttribute('aria-hidden')).toBe('false');
        expect(panels[1].className).toBe('');
        expect(panels[1].getAttribute('aria-hidden')).toBe('true');
    });

    it('should change the selected the tab and panel on click', () => {
        let structure = [
                { title: 'Frutas', body: <div><ul><li>Abacaxi</li><li>Mamão</li></ul></div>},
                { title: 'Legumes', body: <div><ul><li>Beterraba</li><li>Pepino</li></ul></div>},
            ],
            component = <Tabpanel structure={structure}/>,
            container = document.createElement('div'), tabList, tabs, panels;
        ReactDOM.render(component, container);
        tabList = container.querySelectorAll('*[role=tablist]');
        tabs = container.querySelectorAll('*[role=tab]');
        panels = container.querySelectorAll('*[role=tabpanel]');

        ReactTestUtils.Simulate.click(tabs[1]);

        expect(tabs.length).toBe(2);
        expect(tabs[0].className).toBe('');
        expect(tabs[1].className).toBe('selected');

        expect(panels.length).toBe(2);
        expect(panels[0].className).toBe('');
        expect(panels[0].getAttribute('aria-hidden')).toBe('true');
        expect(panels[1].className).toBe('selected');
        expect(panels[1].getAttribute('aria-hidden')).toBe('false');
    });

    it('should change the selected the tab and panel on click on last element', () => {
        let structure = [
                { title: 'Frutas', body: <div><ul><li>Abacaxi</li><li>Mamão</li></ul></div>},
                { title: 'Legumes', body: <div><ul><li>Beterraba</li><li>Pepino</li></ul></div>},
                { title: 'Carros', body: <div><ul><li>Cruise</li><li>Maliby</li></ul></div>}
            ],
            component = <Tabpanel structure={structure}/>,
            container = document.createElement('div'), tabList, tabs, panels;
        ReactDOM.render(component, container);
        tabList = container.querySelectorAll('*[role=tablist]');
        tabs = container.querySelectorAll('*[role=tab]');
        panels = container.querySelectorAll('*[role=tabpanel]');

        ReactTestUtils.Simulate.click(tabs[2]);

        expect(tabs.length).toBe(3);
        expect(tabs[0].className).toBe('');
        expect(tabs[1].className).toBe('');
        expect(tabs[2].className).toBe('selected');

        expect(panels.length).toBe(3);
        expect(panels[0].className).toBe('');
        expect(panels[0].getAttribute('aria-hidden')).toBe('true');
        expect(panels[1].className).toBe('');
        expect(panels[1].getAttribute('aria-hidden')).toBe('true');
        expect(panels[2].className).toBe('selected');
        expect(panels[2].getAttribute('aria-hidden')).toBe('false');
    });

    it('should change the selected the tab and panel on keyboard actions', () => {
        let structure = [
                { title: 'Frutas', body: <div><ul><li>Abacaxi</li><li>Mamão</li></ul></div>},
                { title: 'Legumes', body: <div><ul><li>Beterraba</li><li>Pepino</li></ul></div>},
                { title: 'Carros', body: <div><ul><li>Cruise</li><li>Maliby</li></ul></div>}
            ],
            component = <Tabpanel structure={structure}/>,
            container = document.createElement('div'), tabList, tabs, panels;
        ReactDOM.render(component, container);
        tabList = container.querySelectorAll('*[role=tablist]');
        tabs = container.querySelectorAll('*[role=tab]');
        panels = container.querySelectorAll('*[role=tabpanel]');

        expect(tabs[0].tabIndex).toBe(0);
        expect(tabs[1].tabIndex).toBe(-1);
        expect(tabs[2].tabIndex).toBe(-1);

        ReactTestUtils.Simulate.focus(tabs[0]);
        ReactTestUtils.Simulate.keyUp(tabs[0], {keyCode: 39});

        expect(tabs.length).toBe(3);
        expect(tabs[0].className).toBe('');
        expect(tabs[1].className).toBe('selected');
        expect(tabs[2].className).toBe('');
        expect(tabs[0].tabIndex).toBe(-1);
        expect(tabs[1].tabIndex).toBe(0);
        expect(tabs[2].tabIndex).toBe(-1);

        expect(panels.length).toBe(3);
        expect(panels[0].className).toBe('');
        expect(panels[0].getAttribute('aria-hidden')).toBe('true');
        expect(panels[1].className).toBe('selected');
        expect(panels[1].getAttribute('aria-hidden')).toBe('false');
        expect(panels[2].className).toBe('');
        expect(panels[2].getAttribute('aria-hidden')).toBe('true');
    });

    it('should change the selected the tab and panel on multiple keyboard actions', () => {
        let structure = [
                { title: 'Frutas', body: <div><ul><li>Abacaxi</li><li>Mamão</li></ul></div>},
                { title: 'Legumes', body: <div><ul><li>Beterraba</li><li>Pepino</li></ul></div>},
                { title: 'Carros', body: <div><ul><li>Cruise</li><li>Maliby</li></ul></div>}
            ],
            component = <Tabpanel structure={structure}/>,
            container = document.createElement('div'), tabList, tabs, panels;
        ReactDOM.render(component, container);
        tabList = container.querySelectorAll('*[role=tablist]');
        tabs = container.querySelectorAll('*[role=tab]');
        panels = container.querySelectorAll('*[role=tabpanel]');

        expect(tabs[0].tabIndex).toBe(0);
        expect(tabs[1].tabIndex).toBe(-1);
        expect(tabs[2].tabIndex).toBe(-1);

        ReactTestUtils.Simulate.focus(tabs[0]);
        ReactTestUtils.Simulate.keyUp(tabs[0], {keyCode: 39});
        ReactTestUtils.Simulate.keyUp(tabs[1], {keyCode: 39});

        expect(tabs.length).toBe(3);
        expect(tabs[0].className).toBe('');
        expect(tabs[1].className).toBe('');
        expect(tabs[2].className).toBe('selected');
        expect(tabs[0].tabIndex).toBe(-1);
        expect(tabs[1].tabIndex).toBe(-1);
        expect(tabs[2].tabIndex).toBe(0);

        expect(panels.length).toBe(3);
        expect(panels[0].className).toBe('');
        expect(panels[0].getAttribute('aria-hidden')).toBe('true');
        expect(panels[1].className).toBe('');
        expect(panels[1].getAttribute('aria-hidden')).toBe('true');
        expect(panels[2].className).toBe('selected');
        expect(panels[2].getAttribute('aria-hidden')).toBe('false');
    });

    it('should not fail on multiple keyboard right actions', () => {
        let structure = [
                { title: 'Frutas', body: <div><ul><li>Abacaxi</li><li>Mamão</li></ul></div>},
                { title: 'Legumes', body: <div><ul><li>Beterraba</li><li>Pepino</li></ul></div>},
                { title: 'Carros', body: <div><ul><li>Cruise</li><li>Maliby</li></ul></div>}
            ],
            component = <Tabpanel structure={structure}/>,
            container = document.createElement('div'), tabList, tabs, panels;
        ReactDOM.render(component, container);
        tabList = container.querySelectorAll('*[role=tablist]');
        tabs = container.querySelectorAll('*[role=tab]');
        panels = container.querySelectorAll('*[role=tabpanel]');

        expect(tabs[0].tabIndex).toBe(0);
        expect(tabs[1].tabIndex).toBe(-1);
        expect(tabs[2].tabIndex).toBe(-1);

        ReactTestUtils.Simulate.focus(tabs[0]);
        ReactTestUtils.Simulate.keyUp(tabs[0], {keyCode: 39});
        ReactTestUtils.Simulate.keyUp(tabs[1], {keyCode: 39});
        ReactTestUtils.Simulate.keyUp(tabs[2], {keyCode: 39});

        expect(tabs.length).toBe(3);
        expect(tabs[0].className).toBe('');
        expect(tabs[1].className).toBe('');
        expect(tabs[2].className).toBe('selected');
        expect(tabs[0].tabIndex).toBe(-1);
        expect(tabs[1].tabIndex).toBe(-1);
        expect(tabs[2].tabIndex).toBe(0);

        expect(panels.length).toBe(3);
        expect(panels[0].className).toBe('');
        expect(panels[0].getAttribute('aria-hidden')).toBe('true');
        expect(panels[1].className).toBe('');
        expect(panels[1].getAttribute('aria-hidden')).toBe('true');
        expect(panels[2].className).toBe('selected');
        expect(panels[2].getAttribute('aria-hidden')).toBe('false');
    });

    it('should allow left arrow keyboard actions', () => {
        let structure = [
                { title: 'Frutas', body: <div><ul><li>Abacaxi</li><li>Mamão</li></ul></div>},
                { title: 'Legumes', body: <div><ul><li>Beterraba</li><li>Pepino</li></ul></div>},
                { title: 'Carros', body: <div><ul><li>Cruise</li><li>Maliby</li></ul></div>}
            ],
            component = <Tabpanel structure={structure}/>,
            container = document.createElement('div'), tabList, tabs, panels;
        ReactDOM.render(component, container);
        tabList = container.querySelectorAll('*[role=tablist]');
        tabs = container.querySelectorAll('*[role=tab]');
        panels = container.querySelectorAll('*[role=tabpanel]');

        expect(tabs[0].tabIndex).toBe(0);
        expect(tabs[1].tabIndex).toBe(-1);
        expect(tabs[2].tabIndex).toBe(-1);

        ReactTestUtils.Simulate.focus(tabs[0]);
        ReactTestUtils.Simulate.keyUp(tabs[0], {keyCode: 39});
        ReactTestUtils.Simulate.keyUp(tabs[1], {keyCode: 39});
        ReactTestUtils.Simulate.keyUp(tabs[2], {keyCode: 39});
        ReactTestUtils.Simulate.keyUp(tabs[2], {keyCode: 37});

        expect(tabs.length).toBe(3);
        expect(tabs[0].className).toBe('');
        expect(tabs[1].className).toBe('selected');
        expect(tabs[2].className).toBe('');
        expect(tabs[0].tabIndex).toBe(-1);
        expect(tabs[1].tabIndex).toBe(0);
        expect(tabs[2].tabIndex).toBe(-1);

        expect(panels.length).toBe(3);
        expect(panels[0].className).toBe('');
        expect(panels[0].getAttribute('aria-hidden')).toBe('true');
        expect(panels[1].className).toBe('selected');
        expect(panels[1].getAttribute('aria-hidden')).toBe('false');
        expect(panels[2].className).toBe('');
        expect(panels[2].getAttribute('aria-hidden')).toBe('true');
    });

    it('should not fail on multiple keyboard left arrow actions', () => {
        let structure = [
                { title: 'Frutas', body: <div><ul><li>Abacaxi</li><li>Mamão</li></ul></div>},
                { title: 'Legumes', body: <div><ul><li>Beterraba</li><li>Pepino</li></ul></div>},
                { title: 'Carros', body: <div><ul><li>Cruise</li><li>Maliby</li></ul></div>}
            ],
            component = <Tabpanel structure={structure}/>,
            container = document.createElement('div'), tabList, tabs, panels;
        ReactDOM.render(component, container);
        tabList = container.querySelectorAll('*[role=tablist]');
        tabs = container.querySelectorAll('*[role=tab]');
        panels = container.querySelectorAll('*[role=tabpanel]');

        expect(tabs[0].tabIndex).toBe(0);
        expect(tabs[1].tabIndex).toBe(-1);
        expect(tabs[2].tabIndex).toBe(-1);

        ReactTestUtils.Simulate.focus(tabs[0]);
        ReactTestUtils.Simulate.keyUp(tabs[0], {keyCode: 37});
        ReactTestUtils.Simulate.keyUp(tabs[0], {keyCode: 37});
        ReactTestUtils.Simulate.keyUp(tabs[0], {keyCode: 37});
        ReactTestUtils.Simulate.keyUp(tabs[0], {keyCode: 37});

        expect(tabs.length).toBe(3);
        expect(tabs[0].className).toBe('selected');
        expect(tabs[1].className).toBe('');
        expect(tabs[2].className).toBe('');
        expect(tabs[0].tabIndex).toBe(0);
        expect(tabs[1].tabIndex).toBe(-1);
        expect(tabs[2].tabIndex).toBe(-1);

        expect(panels.length).toBe(3);
        expect(panels[0].className).toBe('selected');
        expect(panels[0].getAttribute('aria-hidden')).toBe('false');
        expect(panels[1].className).toBe('');
        expect(panels[1].getAttribute('aria-hidden')).toBe('true');
        expect(panels[2].className).toBe('');
        expect(panels[2].getAttribute('aria-hidden')).toBe('true');
    });

    it('should allow up/down arrow keyboard actions', () => {
        let structure = [
                { title: 'Frutas', body: <div><ul><li>Abacaxi</li><li>Mamão</li></ul></div>},
                { title: 'Legumes', body: <div><ul><li>Beterraba</li><li>Pepino</li></ul></div>},
                { title: 'Carros', body: <div><ul><li>Cruise</li><li>Maliby</li></ul></div>}
            ],
            component = <Tabpanel structure={structure}/>,
            container = document.createElement('div'), tabList, tabs, panels;
        ReactDOM.render(component, container);
        tabList = container.querySelectorAll('*[role=tablist]');
        tabs = container.querySelectorAll('*[role=tab]');
        panels = container.querySelectorAll('*[role=tabpanel]');

        expect(tabs[0].tabIndex).toBe(0);
        expect(tabs[1].tabIndex).toBe(-1);
        expect(tabs[2].tabIndex).toBe(-1);

        ReactTestUtils.Simulate.focus(tabs[0]);
        ReactTestUtils.Simulate.keyUp(tabs[0], {keyCode: 38});
        ReactTestUtils.Simulate.keyUp(tabs[1], {keyCode: 38});
        ReactTestUtils.Simulate.keyUp(tabs[2], {keyCode: 38});
        ReactTestUtils.Simulate.keyUp(tabs[2], {keyCode: 40});
        ReactTestUtils.Simulate.keyUp(tabs[1], {keyCode: 38});
        ReactTestUtils.Simulate.keyUp(tabs[2], {keyCode: 40});

        expect(tabs.length).toBe(3);
        expect(tabs[0].className).toBe('');
        expect(tabs[1].className).toBe('selected');
        expect(tabs[2].className).toBe('');
        expect(tabs[0].tabIndex).toBe(-1);
        expect(tabs[1].tabIndex).toBe(0);
        expect(tabs[2].tabIndex).toBe(-1);

        expect(panels.length).toBe(3);
        expect(panels[0].className).toBe('');
        expect(panels[0].getAttribute('aria-hidden')).toBe('true');
        expect(panels[1].className).toBe('selected');
        expect(panels[1].getAttribute('aria-hidden')).toBe('false');
        expect(panels[2].className).toBe('');
        expect(panels[2].getAttribute('aria-hidden')).toBe('true');
    });
});
