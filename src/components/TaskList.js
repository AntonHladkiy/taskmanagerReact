import React, { useState} from 'react';
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
import TaskView from "./TaskView";
import Login from "./Login.js"
import SignUp from "./SignUp";
import Success from "./Success";
import Tasks from "./Tasks"
import NavBarAuth from "./NavBarAuth";
const TaskList = props => {
    const initialFormState = {
        title:'',
        description:'',
        dueDate:'',
        priority:0,
        done:''
    };
    const initialUser = {
        email:'',
        password:'',
        lastName:'',
        firstName:''
    };
    const [currentTask, setCurrentTask] = useState(initialFormState);
    const [tasks, setTasks] = useState([]);
    const [loggedIn, setLoggedIn] = useState(false);
    const [token, setToken] = useState('');

    const loadTasks=(token)=>{
        axios.get('https://arcane-reaches-18869.herokuapp.com/api/v1/tasks.json',{
            headers: {
                Authorization:token //the token is a variable which holds the token
            }})
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
    }
    const logIn=(user)=>{
        axios.post('https://arcane-reaches-18869.herokuapp.com/api/v1/auth',{
            email:user.email,
                password:user.password
        })
            .then(res => {
                    if(res.data.errors){
                        alert(res.data.errors)
                    } else{
                    console.log(res.data.token)
                    setToken(res.data.token)
                    setLoggedIn(true)
                    loadTasks(res.data.token)
                    }
                }
            ).catch(error=>console.log(error))
    }
    const signUp=(user)=>{
        axios.post('https://arcane-reaches-18869.herokuapp.com/api/v1/users',{
            email:user.email,
            password:user.password,
            firstName:user.firstName,
            lastName:user.lastName
        })
            .then(res => {
                    //setTasks ( res.data )
                    console.log(res)
                }
            ).catch(error=>console.log(error))
    }
    const logOut=(user)=>{
        setToken('')
        setLoggedIn(false)
    }

    const addTask = task => {
        const qs = require('qs');
        axios.post('https://arcane-reaches-18869.herokuapp.com/api/v1/tasks', qs.stringify(
            {
                task:{
                    title: task.title,
                    description: task.description,
                    priority: task.priority,
                    dueDate: task.dueDate,
                    done: false
                }
            }),{
            headers: {
                Authorization: token,
                Content_Type: "application/json"
            }})
            .then(res=>( setTasks(tasks=>[...tasks, {
                id:res.data.id,
                title: task.title,
                description: task.description,
                priority: task.priority,
                dueDate: task.dueDate,
                done: false,
                checked:false
            }])))
            .catch( error => {
                alert("Wrong form format try again");
                console.log(error)
            })
    };

    const removeTask = id => {
        axios.delete( 'https://arcane-reaches-18869.herokuapp.com/api/v1/tasks/' + id,{
            headers:{
                Authorization:token,
                Content_Type:"application/json"
            }})
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

    const updateTask = (updatedTask) => {
        const qs = require('qs');
        axios.patch ( 'https://arcane-reaches-18869.herokuapp.com/api/v1/tasks/' + updatedTask.id, qs.stringify (
            {
                task: {
                    title: updatedTask.title,
                    description: updatedTask.description,
                    priority: updatedTask.priority,
                    dueDate: updatedTask.dueDate,
                    done: updatedTask.done
                }
            }),{
            headers: {
                Authorization: token,
                Content_Type: "application/json"
            }}).then ( res =>{
                 console.log(res);
                setTasks(tasks.map(task => (task.id === updatedTask.id ? updatedTask : task)))
             })
            .catch(()=>{
                alert("Wrong form format try again");
            })


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
        <div><NavBarAuth loggedIn={loggedIn} logOut={logOut}/></div>
        <div  className={"ml-5"}>
            <Switch>
                <Route path="/login">
                    <Login initialUser={initialUser} loggedIn={loggedIn} logIn={logIn} />
                </Route>
                <Route path="/signup">
                    <SignUp initialUser={initialUser} signUp={signUp} />
                </Route>
                <Route path="/new">
                    <NewTaskForm addTask={addTask} initialFormState={initialFormState}/>
                </Route>
                <Route path="/edit">
                    <EditTaskForm currentTask={currentTask} updateTask={updateTask}/>
                </Route>
                <Route path="/view" >
                    <TaskView currentTask={currentTask}/>
                </Route>
                <Route path="/success" >
                    <Success/>
                </Route>
                <Route path="/">
                    {loggedIn &&
                        <span>
                            <div>
                                <Tasks tasks={tasks} removeTask={removeTask} editTask={editTask}
                                       onChangeCheckBoxHandle={onChangeCheckBoxHandle} completeTask={completeTask} makeActiveTask={makeActiveTask}/>
                            </div>
                            <div>
                                <Link to="/new"><button className={"btn btn-info mt-2 mr-2  w-25"}>Add new task</button></Link>
                                <button className="btn btn-danger mt-2 w-25" onClick={() => {
                                    batchDelete()
                                }}>Batch delete</button>
                            </div>
                            <div>
                                <button className="btn btn-success mt-2 mr-2 w-25" onClick={() => {
                                    checkAll()
                                }}>Check all</button>
                                <button className="btn btn-success mt-2 mr-2 w-25" onClick={() => {
                                    unCheckAll()
                                }}>Uncheck all</button>
                            </div><div>
                        </span>
                    }
                    {!loggedIn&&
                    <span>
                        <h3>Log in first</h3>
                    </span>
                    }
                </Route>
            </Switch>
        </div>
    </Router>
    )
};
export default TaskList;