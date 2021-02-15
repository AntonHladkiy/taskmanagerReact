import React,{useEffect} from 'react';
import {Link} from "react-router-dom";
import $ from 'jquery';

const Task = ( { task , removeTask , editTask , onChangeCheckBoxHandle } ) => {
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
    <span className="task" key={ task.id }>
       <input type={ "checkbox" } id={ task.id } checked={ task.checked } ischecked={ task.checked.toString () } onChange={ onChangeCheckBoxHandle }/>
       <Link to={ "/view" } className={ "text-dark hover mr-3 hover" } id={ task.id } onClick={ () => {
           editTask ( task )
        } }>{ task.title }</Link>
    <Link to={ "/edit" } className="d-none" id={ "task_" + task.id.toString () }>
    <button className="btn btn-danger mr-3  d-none" id={ "task_" + task.id.toString () } onClick={ () => {editTask ( task )} }>Edit</button>
    </Link>
    <button className="btn btn-warning  d-none" id={ "task_" + task.id.toString () } onClick={ () => removeTask ( task.id ) }>Remove</button>
    </span>
    );
}


export default Task;