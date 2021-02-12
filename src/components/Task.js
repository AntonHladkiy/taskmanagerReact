import React from 'react';
import {Link} from "react-router-dom";

const Task = ({ task, removeTask ,editTask}) => (
    <div className="task" key={task.id}>
        <h4>{task.title}</h4>
        <p>{task.description}</p>
        <Link to="/edit"><button  onClick={ () => {
            editTask ( task )
        } }>Edit</button></Link>
        <button onClick={() => removeTask(task.id)}>Remove</button>
    </div>
);

export default Task;