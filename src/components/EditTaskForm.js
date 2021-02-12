import React, { useState } from 'react';
import {Link} from "react-router-dom";
const EditTaskForm = props => {
    const [task, setTask] = useState(props.currentTask);

    const handleInputChange = event => {
        const { name, value } = event.target
        setTask({ ...task, [name]: value });
    };

    return (
        <form>
            <label>Title</label>
            <input type="text" name="title" value={task.title} onChange={handleInputChange} ></input>
            <label>Description</label>
            <input type="text" name="description" value={task.description} onChange={handleInputChange} ></input>
            <Link to ="/"><button onClick={()=> {
                if (!task.title || !task.description) return;
                props.updateTask(task)
            }}>Update Task</button></Link>
            <Link to ="/"><button>Cancel</button></Link>
        </form>
    )
};

export default EditTaskForm;