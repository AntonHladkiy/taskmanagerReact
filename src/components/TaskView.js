import React  from 'react';
import {Link , Redirect} from "react-router-dom";


const TaskView = props => {
    const task=props.currentTask;
    if(props.currentTask.description===""){
        return <Redirect to="/"></Redirect>
    }
    return (
            <div>
            <h3>{task.title}</h3>
            <dl className="row">
                <dt className="col-sm-3">Description:</dt>
                <dd className="col-sm-9">{task.description}</dd>
                <dt className="col-sm-3">Priority:</dt>
                <dd className="col-sm-9">{task.priority}</dd>
                <dt className="col-sm-3">Due date:</dt>
                <dd className="col-sm-9">{task.dueDate}</dd>
                <dt className="col-sm-3">Completed:</dt>
                { task.done &&
                <dd className="col-sm-9"><input type="checkbox" checked disabled></input></dd> }
                { ! task.done &&
                <dd className="col-sm-9"><input type="checkbox" disabled></input></dd>
                }
            </dl>
            <Link to="/"><button>Back</button></Link>
            </div>
    )

};
export default TaskView;