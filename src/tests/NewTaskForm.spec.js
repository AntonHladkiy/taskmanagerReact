import React from 'react';
import { shallow } from 'enzyme';
import NewTaskForm from '../components/NewTaskForm';
const initialFormState = {
    title:'',
    description:'',
    dueDate:'',
    priority:'',
    done:''
};
let wrapped = shallow(<NewTaskForm initialFormState={initialFormState}></NewTaskForm>);
describe('NewTaskForm', () => {
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