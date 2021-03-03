import React from 'react';
import { shallow } from 'enzyme';
import TaskView from '../components/TaskView';
const completedTask = {
        title:'title',
        description:'desc',
        dueDate:'',
        priority:1,
        done:true
};
const notCompletedTask = {
    title:'title',
    description:'desc',
    dueDate:'',
    priority:1,
    done:false
};
const emptyTask = {
    title:'',
    description:'',
    dueDate:'',
    priority:'',
    done:''
};
describe('TaskView with completed task', () => {
    let wrapped = shallow(<TaskView currentTask={completedTask}></TaskView>);
    it('should render the TaskView Component correctly', () => {
        expect(wrapped).toMatchSnapshot();
    });
    it('renders the TaskView children', () => {
        expect(wrapped.find('h3').text()).toEqual(completedTask.title);
    });
});
describe('TaskView  with not completed task', () => {
    let wrapped = shallow(<TaskView currentTask={notCompletedTask}></TaskView>);
    it('should render the TaskView Component correctly', () => {
        expect(wrapped).toMatchSnapshot();
    });
    it('renders the TaskView children', () => {
        expect(wrapped.find('h3').text()).toEqual(notCompletedTask.title);
    });
});
describe('TaskView with empty task', () => {
    let wrapped = shallow(<TaskView currentTask={emptyTask}></TaskView>);
    it('should render the TaskView Component correctly', () => {
        expect(wrapped).toMatchSnapshot();
    });
});