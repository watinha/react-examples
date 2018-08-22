import React from 'react';
import ReactDOM from 'react-dom';
import ReactTestUtils from 'react-dom/test-utils';

import Todo from './todo.js';

describe('Todo component', () => {
    it('should render the component', () => {
        let component = <Todo />,
            container = document.createElement('div'),
            todoList, input, button;
        ReactDOM.render(component, container);
        input = container.querySelectorAll('input');
        button = container.querySelectorAll('button');
        todoList = container.querySelectorAll('ul');

        expect(input.length).toBe(1);
        expect(button.length).toBe(1);
        expect(todoList.length).toBe(1);
    });

    it('should add item on input and click', () => {
        let component = <Todo />,
            container = document.createElement('div'),
            itens, input, button;
        ReactDOM.render(component, container);
        input = container.querySelector('input');
        button = container.querySelector('button');

        input.value = 'Abobrinha';
        ReactTestUtils.Simulate.change(input);
        ReactTestUtils.Simulate.click(button);
        itens = container.querySelectorAll('li');

        expect(itens[0].textContent).toContain('Abobrinha');
    });

    it('should add two itens on input and click', () => {
        let component = <Todo />,
            container = document.createElement('div'),
            itens, input, button;
        ReactDOM.render(component, container);
        input = container.querySelector('input');
        button = container.querySelector('button');

        input.value = 'Pepino';
        ReactTestUtils.Simulate.change(input);
        ReactTestUtils.Simulate.click(button);
        expect(input.value).toBe('');
        input.value = 'avocado';
        ReactTestUtils.Simulate.change(input);
        ReactTestUtils.Simulate.click(button);
        itens = container.querySelectorAll('li');

        expect(itens.length).toBe(2);
        expect(itens[0].textContent).toContain('Pepino');
        expect(itens[1].textContent).toContain('avocado');
        expect(input.value).toBe('');
    });

    it('should remove todo itens after some time', () => {
        let component = <Todo />,
            container = document.createElement('div'),
            itens, input, button, check;
        ReactDOM.render(component, container);
        input = container.querySelector('input');
        button = container.querySelector('button');

        input.value = 'Pepino';
        ReactTestUtils.Simulate.change(input);
        ReactTestUtils.Simulate.click(button);
        input.value = 'avocado';
        ReactTestUtils.Simulate.change(input);
        ReactTestUtils.Simulate.click(button);
        input.value = 'mamão';
        ReactTestUtils.Simulate.change(input);
        ReactTestUtils.Simulate.click(button);

        check = container.querySelectorAll('input[type=checkbox]');
        expect(check.length).toBe(3);
        ReactTestUtils.Simulate.click(check[0]);
        itens = container.querySelectorAll('li');
        check = container.querySelectorAll('input[type=checkbox]');
        expect(check.length).toBe(2);
        expect(itens[0].textContent).toContain('avocado');
        expect(itens[1].textContent).toContain('mamão');
    });

    it('should remove other todo itens after some time', () => {
        let component = <Todo />,
            container = document.createElement('div'),
            itens, input, button, check;
        ReactDOM.render(component, container);
        input = container.querySelector('input');
        button = container.querySelector('button');

        input.value = 'Pepino';
        ReactTestUtils.Simulate.change(input);
        ReactTestUtils.Simulate.click(button);
        input.value = 'avocado';
        ReactTestUtils.Simulate.change(input);
        ReactTestUtils.Simulate.click(button);
        input.value = 'mamão';
        ReactTestUtils.Simulate.change(input);
        ReactTestUtils.Simulate.click(button);

        check = container.querySelectorAll('input[type=checkbox]');
        expect(check.length).toBe(3);
        ReactTestUtils.Simulate.click(check[1]);
        itens = container.querySelectorAll('li');
        check = container.querySelectorAll('input[type=checkbox]');
        expect(check.length).toBe(2);
        expect(itens[0].textContent).toContain('Pepino');
        expect(itens[1].textContent).toContain('mamão');
    });
});
