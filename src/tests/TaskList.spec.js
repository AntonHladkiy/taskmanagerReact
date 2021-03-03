import React from 'react';
import { shallow} from 'enzyme';
import TaskList from '../components/TaskList';
describe('TaskList', () => {
    let wrapped = shallow(<TaskList />);
    it('should render the TaskList Component correctly', () => {
        expect(wrapped).toMatchSnapshot();
    });
});
