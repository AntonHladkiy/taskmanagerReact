import React from 'react';
import { shallow } from 'enzyme';
import EditTaskForm from '../components/EditTaskForm';
const currentTask = {
    title:'title',
    description:'desc',
    dueDate:'',
    priority:1,
    done:true
};
let wrapped = shallow(<EditTaskForm currentTask={currentTask}></EditTaskForm>);
describe('TaskView', () => {
    it('should render the TaskView Component correctly', () => {
        expect(wrapped).toMatchSnapshot();
    });
    it('renders the TaskView children', () => {
        expect(wrapped.find({ name: 'title' }).length).toEqual(1)
        expect(wrapped.find({ name: 'dueDate' }).length).toEqual(1)
        expect(wrapped.find({ name: 'description' }).length).toEqual(1)
        expect(wrapped.find({ name: 'priority' }).length).toEqual(1)
    });
});