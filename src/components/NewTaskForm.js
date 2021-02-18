import React, { useState } from 'react';
import {Link} from "react-router-dom";
const NewTaskForm = props => {
    const [task, setTask] = useState(props.initialFormState);

    const handleInputChange = event => {
        const { name, value } = event.target
        setTask({ ...task, [name]: value })
    };

    return (
        <form className={"form-check"} autocomplete="off">
            <label className= "form-check-label">Title</label>
            <input className= "form-control w-25" type="text" name="title" value={task.title} onChange={handleInputChange} ></input>
            <label className= "form-check-label">Description</label>
            <input className= "form-control w-25" type="text" name="description" value={task.position} onChange={handleInputChange} ></input>
            <label className= "form-check-label">Priority</label>
            <input className= "form-control w-25" type="number" name="priority" value={task.priority} onChange={handleInputChange} ></input>
            <label className= "form-check-label">Due Date</label>
            <input className= "form-control w-25" type="date" name="dueDate" value={task.dueDate} onChange={handleInputChange} ></input>
            <Link to ="/"> <button className="btn btn-warning mt-2 mr-2" onClick={()=> {
                if (!task.title || !task.description|| !task.dueDate|| !task.priority) return;
                props.addTask(task)
            }}>Create Task</button></Link>
            <Link to ="/"><button className={"btn btn-danger mt-2"}>Cancel</button></Link>
        </form>
    )
};

export default NewTaskForm;