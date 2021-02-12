import React, { useState, useEffect } from 'react';
import axios from 'axios';
import NewTaskForm from "./NewTaskForm";
import Task from "./Task";
import EditTaskForm from "./EditTaskForm";
import {
    BrowserRouter as Router,
    Switch,
    Route,
    Link
} from "react-router-dom";

const TaskList = props => {

    const initialFormState = {
        title:'',
        description:''
    };

    useEffect(() => {
        axios.get('/api/v1/tasks.json')
            .then(res => setTasks(res.data))
    }, []);
    const [currentTask, setCurrentTask] = useState(initialFormState);
    const [tasks, setTasks] = useState([]);

    const addTask = task => {
        const qs = require('qs');
        axios.post('/api/v1/tasks', qs.stringify(
            {
                task:{
                    title: task.title,
                    description: task.description}
            }))
            .then(res=>( console.log(res)))
            .catch( error => console.log(error))

        setTasks([...tasks, task]);
        console.log(tasks);
    };

    const removeTask = id => {
        axios.delete( '/api/v1/tasks/' + id )
            .then(response => {
                setTasks(tasks.filter(task => task.id !== id))
            })
            .catch(error => console.log(error))
    };

    const editTask = task => {
        setCurrentTask({
            id: task.id,
            title: task.title,
            description: task.description
        })
    };

    const updateTask = (updatedTask) => {
        const qs = require('qs');
        axios.patch ( '/api/v1/tasks/' + updatedTask.id, qs.stringify (
            {
                task: {
                    title: updatedTask.title,
                    description: updatedTask.description
                }
             } ) ).then ( res =>console.log(res) )

        setTasks(tasks.map(task => (task.id === updatedTask.id ? updatedTask : task)))
    };

    return (
    <Router>
        <div>
            <Switch>
                <Route path="/new">
                    <NewTaskForm addTask={addTask} initialFormState={initialFormState}/>
                </Route>
                <Route path="/edit">
                    <EditTaskForm
                        currentTask={currentTask}
                        updateTask={updateTask}
                    />
                </Route>
                <Route path="/">
                    <div className="tasksList">
                        {tasks.map((task, index) => (
                            <Task task={task} removeTask={removeTask} editTask={editTask} />
                        ))}
                    </div>
                    <Link to="/new">Add new task</Link>
                </Route>
            </Switch>
        </div>

    </Router>
    )
};
export default TaskList;