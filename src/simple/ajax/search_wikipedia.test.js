import React from 'react';
import ReactDOM from 'react-dom';
import ReactTestUtils from 'react-dom/test-utils';

import SearchWikipedia from './search_wikipedia';

let axiosMock = () => {
    return {
        called: false,
        expectsUrl: function (urlExpectation) {
            this.urlExpectation = urlExpectation;
            return this;
        },

        expectsParams: function (paramsExpectation) {
            this.paramsExpectation = paramsExpectation;
            return this;
        },

        givesResponse: function (response) {
            this.response = response;
            return this;
        },

        get: function (url, params) {
            let self = this;
            this.called = true;
            expect(url).toBe(this.urlExpectation);
            expect(params).toEqual(this.paramsExpectation);
            return {
                then: function (callback) {
                    callback(self.response);
                }
            };
        }
    };
};

describe('SearchWikipedia component', () => {
    it('should render component', () => {
        let component = <SearchWikipedia />,
            container = document.createElement('div'),
            div, input, button;
        ReactDOM.render(component, container);
        div = container.querySelectorAll('div');
        input = container.querySelectorAll('input');
        button = container.querySelectorAll('button');
        expect(div.length).toBe(1);
        expect(input.length).toBe(1);
        expect(button.length).toBe(1);
    });

    it('should get wikipedia data on click', () => {
        let container = document.createElement('div'),
            div, input, button, p,
            mock = axiosMock().expectsUrl('https://en.wikipedia.org/w/api.php?prop=extracts&exintro&explaintext')
                   .expectsParams({
                       params: {
                           format: 'json',
                           action: 'query',
                           origin: '*',
                           redirects: '1',
                           titles: 'Machine learning'
                       }
                   }).givesResponse({
                     "data": {
                         "query": {
                             "pages": {"213": { "extract": "Machine learning is..."}}
                         }
                     }
                   }),
           component = <SearchWikipedia axios={mock}/>;

        ReactDOM.render(component, container);
        div = container.querySelector('div');
        input = container.querySelector('input');
        button = container.querySelector('button');
        p = container.querySelector('p');

        input.value = 'Machine learning';
        ReactTestUtils.Simulate.change(input);
        ReactTestUtils.Simulate.click(button);
        expect(mock.called).toBe(true);
        expect(p.textContent).toEqual('Machine learning is...');
    });

    it('should get wikipedia data on click with some other data', () => {
        let container = document.createElement('div'),
            div, input, button, p,
            mock = axiosMock().expectsUrl('https://en.wikipedia.org/w/api.php?prop=extracts&exintro&explaintext')
                   .expectsParams({
                       params: {
                           format: 'json',
                           action: 'query',
                           redirects: '1',
                           origin: '*',
                           titles: 'Nothingness'
                       }
                   }).givesResponse({
                     "data": {
                         "query": {
                             "pages": {"241": { "extract": "Nothingness is an amazing concept..."}}
                         }
                     }
                   }),
           component = <SearchWikipedia axios={mock}/>;

        ReactDOM.render(component, container);
        div = container.querySelector('div');
        input = container.querySelector('input');
        button = container.querySelector('button');
        p = container.querySelector('p');

        input.value = 'Nothingness';
        ReactTestUtils.Simulate.change(input);
        ReactTestUtils.Simulate.click(button);
        expect(mock.called).toBe(true);
        expect(p.textContent).toEqual('Nothingness is an amazing concept...');
    });
});
