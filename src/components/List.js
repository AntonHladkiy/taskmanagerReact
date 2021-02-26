import React from 'react';
import Task from "./Task";

const List=props=>{

   return(
       <div className="tasksList">
           <h3>Tasks to do:</h3>
           {props.tasks.map((task) => (
               !task.done &&
               <dl className="row border border-primary border-right-0 rounded-left w-50"  key={task.id}>
                   <dt className="col-sm-8 mb-2 mt-1">
                       <h4>
                           <Task task={task} removeTask={props.removeTask} editTask={props.editTask}
                                 onChangeCheckBoxHandle={props.onChangeCheckBoxHandle}/>
                       </h4>
                   </dt>
                   <dd className="col-sm-3 mb-2 mt-2">
                       <button className={"btn btn-info"} onClick={() => {
                           props.modifyTask(task)
                       }}>{props.buttonName}
                       </button>
                   </dd>
               </dl>
           ))}
       </div>
   )
}

export default List
