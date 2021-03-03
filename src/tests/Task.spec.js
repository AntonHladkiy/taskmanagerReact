import React from 'react';
import { shallow} from 'enzyme';
import Task from '../components/Task';
const notCompletedTask = {
    id:0,
    title:'123',
    description:'123',
    dueDate:'132',
    priority:'123',
    done:false,
    checked:true
};
const completedTask = {
    id:0,
    title:'123',
    description:'123',
    dueDate:'132',
    priority:'123',
    done:true,
    checked:true
};
describe('Task completed', () => {
    let wrapped = shallow(<Task task={completedTask}/>);
    it('should render the Task Component correctly', () => {
        expect(wrapped).toMatchSnapshot();
    });
});
describe('Task not completed', () => {
    let wrapped = shallow(<Task task={notCompletedTask}/>);
    it('should render the Task Component correctly', () => {
        expect(wrapped).toMatchSnapshot();
    });

});