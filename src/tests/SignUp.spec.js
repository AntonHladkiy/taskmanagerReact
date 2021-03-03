import React from 'react';
import { shallow} from 'enzyme';
import SignUp from '../components/SignUp';
let initialUser={
    email:'',
    password:''
}
describe('SignUp', () => {
    let wrapped = shallow(<SignUp initialUser={initialUser} />);
    it('should render the SignUp Component correctly', () => {
        expect(wrapped).toMatchSnapshot();
    });
});