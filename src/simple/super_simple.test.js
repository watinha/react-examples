import React from 'react';
import ReactDOM from 'react-dom';
import ReactTestUtils from 'react-dom/test-utils';

import SuperSimple from './super_simple';

describe('Super simple component', () => {
    it('should render', () => {
        let component = <SuperSimple title="Surprise!!!"/>,
            container = document.createElement('div'), div;
        ReactDOM.render(component, container);
        div = container.querySelector('.super_simple');
        expect(div.textContent).toBe('Surprise!!!');
    });

    it('should render with params', () => {
        let component = <SuperSimple title="Another test!!!"/>,
            container = document.createElement('div'), div;
        ReactDOM.render(component, container);
        div = container.querySelector('.super_simple');
        expect(div.textContent).toBe('Another test!!!');
    });

});

