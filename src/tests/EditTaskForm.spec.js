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
const emptyTask = {
    title:'',
    description:'',
    dueDate:'',
    priority:'',
    done:''
};

describe('EditTaskForm', () => {
    let wrapped = shallow(<EditTaskForm currentTask={currentTask}></EditTaskForm>);
    it('should render the EditTaskForm Component correctly', () => {
        expect(wrapped).toMatchSnapshot();
    });
    it('renders the EditTaskForm children', () => {
        expect(wrapped.find({ name: 'title' }).length).toEqual(1)
        expect(wrapped.find({ name: 'dueDate' }).length).toEqual(1)
        expect(wrapped.find({ name: 'description' }).length).toEqual(1)
        expect(wrapped.find({ name: 'priority' }).length).toEqual(1)
    });
});
describe('EditTaskForm with empty task', () => {
    let wrapped = shallow(<EditTaskForm currentTask={emptyTask}></EditTaskForm>);
    it('should render the EditTaskForm Component correctly', () => {
        expect(wrapped).toMatchSnapshot();
    });

});