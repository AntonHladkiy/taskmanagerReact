import React from 'react';
import { shallow } from 'enzyme';
import NavBarAuth from '../components/NavBarAuth';

describe('NavBarAuth logged in', () => {
    let wrapped = shallow(<NavBarAuth loggedIn={true}></NavBarAuth>);
    it('should render the NavBarAuth Component correctly', () => {
        expect(wrapped).toMatchSnapshot();
    });
});
describe('NavBarAuth not logged in', () => {
    let wrapped = shallow(<NavBarAuth loggedIn={false}></NavBarAuth>);
    it('should render the NavBarAuth Component correctly', () => {
        expect(wrapped).toMatchSnapshot();
    });

});