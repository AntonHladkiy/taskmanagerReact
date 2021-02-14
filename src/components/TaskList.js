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
import {Redirect} from 'react-router-dom'
import TaskView from "./TaskView";

const TaskList = props => {

    const initialFormState = {
        title:'',
        description:'',
        dueDate:'',
        priority:0,
        done:''
    };
    useEffect(() => {
        axios.get('/api/v1/tasks.json')
            .then(res => {
                //setTasks ( res.data )
                setTasks([]);
                res.data.forEach(item=>{setTasks(tasks=>[...tasks, {
                    id:item.id,
                    title:item.title,
                    description:item.description,
                    dueDate:item.dueDate,
                    priority:item.priority,
                    done:item.done,
                    checked: false
                }])})
            }
            )
    }, []);

    const [currentTask, setCurrentTask] = useState(initialFormState);
    const [tasks, setTasks] = useState([]);
    const [sorted, setSorted] = useState(false);
    const addTask = task => {

        const qs = require('qs');
        axios.post('/api/v1/tasks', qs.stringify(
            {
                task:{
                    title: task.title,
                    description: task.description,
                    priority: task.priority,
                    dueDate: task.dueDate,
                    done: false
                }
            }))
            .then(res=>( setTasks(tasks=>[...tasks, {
                id:res.data.id,
                title: task.title,
                description: task.description,
                priority: task.priority,
                dueDate: task.dueDate,
                done: false,
                checked:false
            }])))
            .catch( error => console.log(error))
    };

    const removeTask = id => {
        axios.delete( '/api/v1/tasks/' + id )
            .then(response => {
                setTasks(tasks=>tasks.filter(task => task.id !== id))
            })
            .catch(error => console.log(error))
    };

    const editTask = task => {
        setCurrentTask({
            id: task.id,
            title: task.title,
            description: task.description,
            priority: task.priority,
            dueDate: task.dueDate,
            done: task.done,
            checked: task.checked
        })
    };
    const onChangeCheckBoxHandle=event=>{
          if(event.target.attributes.ischecked.value ==="true"){
              setTasks(tasks.map(task => (task.id.toString() === event.target.id ? {
                  id:task.id,
                  title:task.title,
                  description:task.description,
                  dueDate:task.dueDate,
                  priority:task.priority,
                  done:task.done,
                  checked: false
              } : task)))
          } else{
              setTasks(tasks.map(task => (task.id.toString() === event.target.id ? {
                  id:task.id,
                  title:task.title,
                  description:task.description,
                  dueDate:task.dueDate,
                  priority:task.priority,
                  done:task.done,
                  checked: true
              } : task)))
          }
    }
    const checkAll=()=>{
        setTasks(tasks.map(task => ({
            id:task.id,
            title:task.title,
            description:task.description,
            dueDate:task.dueDate,
            priority:task.priority,
            done:task.done,
            checked: true
        })))
    }
    const unCheckAll=()=>{
        setTasks(tasks.map(task => ({
            id:task.id,
            title:task.title,
            description:task.description,
            dueDate:task.dueDate,
            priority:task.priority,
            done:task.done,
            checked: false
        })))
    }
    const sortTasks=()=>{
        setTasks(tasks.sort(function(a, b) {
            if (a.title<b.title) {
                return -1;
            }
            if (a.title>b.title) {
                return 1;
            }
            // a must be equal to b
            return 0;
        }));
        setSorted(true)
    }
    const updateTask = (updatedTask) => {
        const qs = require('qs');
        axios.patch ( '/api/v1/tasks/' + updatedTask.id, qs.stringify (
            {
                task: {
                    title: updatedTask.title,
                    description: updatedTask.description,
                    priority: updatedTask.priority,
                    dueDate: updatedTask.dueDate,
                    done: updatedTask.done
                }
             } ) ).then ( res =>console.log(res) )

        setTasks(tasks.map(task => (task.id === updatedTask.id ? updatedTask : task)))
    };
    const batchDelete=()=>{
        tasks.forEach(task=>{
                if(task.checked){
                    removeTask(task.id)
                }
            }
        )
    }
    const completeTask=(task)=>{
            task.done=true;
            updateTask(task);
    };
    const makeActiveTask=(task)=>{
        task.done=false;
        updateTask(task);
    };
    return (
    <Router>
        <div >
            <Switch>
                <Route path="/test">
                    <Redirect to={"/new"}/>
                </Route>
                <Route path="/new">
                    <NewTaskForm addTask={addTask} initialFormState={initialFormState}/>
                </Route>
                <Route path="/edit">
                    <EditTaskForm currentTask={currentTask} updateTask={updateTask}/>
                </Route>
                <Route path="/view" >
                    <TaskView currentTask={currentTask} />
                </Route>
                <Route path="/">
                    {console.log(tasks)}
                    <div className="tasksList">
                        <h3>Tasks to do:</h3>
                        {tasks.map((task) => (
                            !task.done&&
                            <div key={task.id}>
                                <Task  task={task} removeTask={removeTask} editTask={editTask} onChangeCheckBoxHandle={onChangeCheckBoxHandle}/>
                                <button  onClick={ () => {
                                    completeTask( task )
                                }}>Complete</button>
                            </div>
                            ))}
                    </div>
                    <div className="tasksList">
                        <h3>Completed tasks:</h3>
                        {tasks.map((task) => (
                            task.done&&
                            <div key={task.id}>
                                <Task task={task} removeTask={removeTask} editTask={editTask} onChangeCheckBoxHandle={onChangeCheckBoxHandle} />
                                <button  onClick={ () => {
                                    makeActiveTask( task )
                                }}>Make Active</button>
                            </div>
                        ))}
                    </div>
                    <div>
                        <Link to="/new"><button>Add new task</button></Link>
                        <button onClick={ () => {
                            batchDelete()
                        }}>Batch delete</button>
                    </div>
                    <div>
                        <button onClick={ () => {
                            checkAll()
                        }}>Check all</button>
                        <button onClick={ () => {
                            unCheckAll()
                        }}>Uncheck all</button>
                    </div>
                    <button onClick={ () => {
                        sortTasks()
                    }}>Sort all</button>

                </Route>
            </Switch>
        </div>
    </Router>
    )
};
export default TaskList;