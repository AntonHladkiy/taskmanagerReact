import React,{useEffect} from 'react';
import {Link} from "react-router-dom";
import $ from 'jquery';

const Task = ( { task , removeTask , editTask , onChangeCheckBoxHandle,changeTask,buttonName } ) => {
    useEffect(() => {
        $(document).ready(function() {
            $(".hover").hover(
                function () {
                    $("[id=" + "task_" + this.id.toString() + "]").removeClass("d-none")
                },
                function () {
                    let id=this.id;
                    setTimeout(function () {
                        $("[id=" + "task_" + id.toString() + "]").addClass("d-none")
                    }, 1500);
                }
            );
    })})
    return (
                <tr className="task hover "  id={ task.id } key={ task.id }>
                    <td><input type={ "checkbox" }  className={ "mr-3  mb-3" } id={ task.id } checked={ task.checked } ischecked={ task.checked.toString () } onChange={ onChangeCheckBoxHandle }/></td>
                    {task.done&&
                        <td className={"strikeout"}><Link to={ "/view" } className={ "text-dark  mr-3 mb-3" } id={ task.id } onClick={ () => {
                            editTask ( task )
                        } }>{ task.title }</Link></td>
                    }
                    {task.done&&<td className={"strikeout"}>{task.priority}</td> }
                    {task.done&&<td className={"strikeout"}>{task.dueDate}</td> }
                    {!task.done&&
                    <td ><Link to={ "/view" } className={ "text-dark  mr-3 mb-3" } id={ task.id } onClick={ () => {
                        editTask ( task )
                    } }>{ task.title }</Link></td>
                    }
                    {!task.done&&<td>{task.priority}</td> }
                    {!task.done&&<td >{task.dueDate}</td> }
                    <td><Link to={ "/edit" } className="d-none" id={ "task_" + task.id.toString () }>
                        <button className="btn btn-danger mr-3   d-none" id={ "task_" + task.id.toString () } onClick={ () => {editTask ( task )} }>Edit</button>
                    </Link></td>
                    <td><button className="btn btn-warning  d-none" id={ "task_" + task.id.toString () } onClick={ () => removeTask ( task.id ) }>Remove</button></td>
                    <td>
                        <button className={"btn btn-info"} onClick={() => {
                            changeTask(task)
                        }}>{buttonName}
                        </button>
                    </td>
                </tr>

    );
}


export default Task;