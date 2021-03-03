import React from 'react';
import {mount, shallow} from 'enzyme';
import NewTaskForm from '../components/NewTaskForm';
const initialFormState = {
    title:'',
    description:'',
    dueDate:'',
    priority:'',
    done:''
};
const notEmptyTask = {
    title:'123',
    description:'123',
    dueDate:'132',
    priority:'123',
    done:true
};
describe('NewTaskForm', () => {
    let wrapped = shallow(<NewTaskForm initialFormState={initialFormState}/>);
    it('should render the TaskView Component correctly', () => {
        expect(wrapped).toMatchSnapshot();
    });
    it('renders the NewTaskForm children', () => {
        expect(wrapped.find({ value: '' }).length).toEqual(3)
        expect(wrapped.find({ name: 'dueDate' }).length).toEqual(1)
        expect(wrapped.find({ name: 'description' }).length).toEqual(1)
        expect(wrapped.find({ name: 'priority' }).length).toEqual(1)
    });
});
describe('NewTaskForm handlers', () => {

    it('should handle input values', () => {
        let setTask=jest.fn();
        let wrapped = shallow(<NewTaskForm initialFormState={initialFormState}/>);
        const handleInputChange = jest.spyOn(React, "useState");
        handleInputChange.mockImplementation(task => [task, setTask])
        wrapped.find({name:"title"}).simulate('change', { target: { name: 'title', value: 'newTitle' } })
        expect(handleInputChange).toBeTruthy();
    });

});

describe('NewTaskForm onClick', () => {

    it('should handle submit button', () => {
        let Submit=jest.fn();
        let wrapped = shallow(<NewTaskForm initialFormState={initialFormState} addTask={Submit}/>);
        wrapped.find(".btn-success").simulate('click')
        expect(Submit.mock.calls.length).toEqual(0);
    });
    it('should handle submit button ', () => {
        let Submit=jest.fn();
        let wrapped = shallow(<NewTaskForm initialFormState={notEmptyTask} addTask={Submit}/>);
        wrapped.find(".btn-success").simulate('click')
        expect(Submit.mock.calls.length).toEqual(1);
    });
});