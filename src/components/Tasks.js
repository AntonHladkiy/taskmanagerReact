import React,{useState,useEffect} from 'react';
import List from "./List";

const Tasks=props=>{
    useEffect(()=>{
        props.tasks.forEach(task=>{
            if(task.done){
                completedTasks.push(task)
            } else{
                uncompletedTasks.push(task)
            }
        })
    })
    const [completedTasks, setCompletedTasks] = useState([]);
    const [uncompletedTasks, setUncompletedTasks] = useState([]);
    const setSorted=useState(-1)[1];
    const sortTasksByTitle=(tasks,setTasks)=>{
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
        setSorted(0)
    }
    const sortTasksByDueDate=(tasks,setTasks)=>{
        setTasks(tasks.sort(function(a, b) {
            if (a.dueDate<b.dueDate) {
                return -1;
            }
            if (a.dueDate>b.dueDate) {
                return 1;
            }
            // a must be equal to b
            return 0;
        }));
        setSorted(1)
    }
    const sortTasksPriority=(tasks,setTasks)=>{
        setTasks(tasks.sort(function(a, b) {
            if (a.priority<b.priority) {
                return -1;
            }
            if (a.priority>b.priority) {
                return 1;
            }
            // a must be equal to b
            return 0;
        }));
        setSorted(2)
    }
    return(
        <div>
            <div>
                <List removeTask={props.removeTask} editTask={props.editTask} onChangeCheckBoxHandle={props.onChangeCheckBoxHandle} modifyTask={props.completeTask} buttonName={"Complete"}/>
            </div>
            <div>
                <List removeTask={props.removeTask} editTask={props.editTask} onChangeCheckBoxHandle={props.onChangeCheckBoxHandle} modifyTask={props.makeActiveTask} buttonName={"Make Active"}/>
            </div>
        </div>
    )
}

export default Tasks