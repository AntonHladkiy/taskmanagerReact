import React from 'react';
import { shallow } from 'enzyme';
import TaskView from '../components/TaskView';
const currentTask = {
        title:'title',
        description:'desc',
        dueDate:'',
        priority:1,
        done:true
};
let wrapped = shallow(<TaskView currentTask={currentTask}></TaskView>);
describe('TaskView', () => {
    it('should render the TaskView Component correctly', () => {
        expect(wrapped).toMatchSnapshot();
    });
    it('renders the TaskView children', () => {
        expect(wrapped.find('h3').text()).toEqual(currentTask.title);
    });
});