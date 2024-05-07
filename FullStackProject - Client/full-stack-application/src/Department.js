

import React,{Component} from 'react';
import {variables} from './Variables.js';  // API end points tika import kranne, kalin hadpu variable name eken.

export class Department extends Component{


    // constructor 
   
    constructor(props){
        super(props);    // supper props basicaly use for call the construtor of its parent class 

        this.state={
            departments:[], // define an array name department which will populated with the department's data from the API.
            modalTitle:"",
            DepartmentName:"",
            DepartmentId:0,

            DepartmentIdFilter:"", /*create variable to accept filter input from the user  */
            DepartmentNameFilter:"",
            departmentsWithoutFilter:[] /* array to backup or data without filter */
        }
    }

    FilterFn(){
        var DepartmentIdFilter=this.state.DepartmentIdFilter;
        var DepartmentNameFilter = this.state.DepartmentNameFilter;

        var filteredData=this.state.departmentsWithoutFilter.filter(
            function(el){
                return el.DepartmentId.toString().toLowerCase().includes(
                    DepartmentIdFilter.toString().trim().toLowerCase()
                )&&
                el.DepartmentName.toString().toLowerCase().includes(
                    DepartmentNameFilter.toString().trim().toLowerCase()
                )
            }
        );

        this.setState({departments:filteredData});

    }

    /*sort function. sending the property name and boolean value which indicates whether to sort by ascending order of descending order */
    sortResult(prop,asc){
        var sortedData=this.state.departmentsWithoutFilter.sort(function(a,b){
            if(asc){
                return (a[prop]>b[prop])?1:((a[prop]<b[prop])?-1:0);
            }
            else{
                return (b[prop]>a[prop])?1:((b[prop]<a[prop])?-1:0);
            }
        });

        this.setState({departments:sortedData});
    }

    changeDepartmentIdFilter = (e)=>{
        this.state.DepartmentIdFilter=e.target.value;
        this.FilterFn();
    }
    changeDepartmentNameFilter = (e)=>{
        this.state.DepartmentNameFilter=e.target.value;
        this.FilterFn();
    }


    /* Method to refresh the department's data from the get API */
    /* Response ekak awama eka json format ekata convert karala array ekat danawa*/
    refreshList(){
        fetch(variables.API_URL+'department')
        .then(response=>response.json())
        .then(data=>{
            this.setState({departments:data,departmentsWithoutFilter:data});
        });
    }

    /* call the refresh method onece the component in mounted */
    componentDidMount(){
        this.refreshList();
    }
    

    /* Pahala thiyan function eka call krama me function eka exeute wenwa .*/
    changeDepartmentName =(e)=>{
        this.setState({DepartmentName:e.target.value});
    }

    addClick(){
        this.setState({
            modalTitle:"Add Department",
            DepartmentId:0,
            DepartmentName:""
        });
    }
    editClick(dep){
        this.setState({
            modalTitle:"Edit Department",
            DepartmentId:dep.DepartmentId,
            DepartmentName:dep.DepartmentName
        });
    }

    createClick(){
        fetch(variables.API_URL+'department',{
            method:'POST',
            headers:{
                'Accept':'application/json',
                'Content-Type':'application/json'
            },

            /*pass the new department name as JSON in the method body */
            body:JSON.stringify({
                DepartmentName:this.state.DepartmentName
            })
        })
        .then(res=>res.json())
        .then((result)=>{
            alert(result);
            this.refreshList(); /* after succes then refresh the list*/ 
        },(error)=>{
            alert('Failed');
        })
    }


    updateClick(){
        fetch(variables.API_URL+'department',{
            method:'PUT',
            headers:{
                'Accept':'application/json',
                'Content-Type':'application/json'
            },
            body:JSON.stringify({
                DepartmentId:this.state.DepartmentId,
                DepartmentName:this.state.DepartmentName
            })
        })
        .then(res=>res.json())
        .then((result)=>{
            alert(result);
            this.refreshList();
        },(error)=>{
            alert('Failed');
        })
    }

    deleteClick(id){
        if(window.confirm('Are you sure?')){  /*user conformation before delete  */
        fetch(variables.API_URL+'department/'+id,{
            method:'DELETE',
            headers:{
                'Accept':'application/json',
                'Content-Type':'application/json'
            }
        })
        .then(res=>res.json())
        .then((result)=>{
            alert(result);
            this.refreshList();
        },(error)=>{
            alert('Failed');
        })
        }
    }


    /* variable in the render method to use it inside html*/
    /* define a variable that we are going to use in model window */
    render(){
        const {
            departments,
            modalTitle,
            DepartmentId,
            DepartmentName
        }=this.state;

        return(
<div>

    {/*button to open the model window. this will be the add new department */}
    <button type="button"
    className="btn btn-primary m-2 float-end"
    data-bs-toggle="modal"
    data-bs-target="#exampleModal"
    onClick={()=>this.addClick()}>
        Add Department
    </button>

    {/* Create bostrape table for store Department data */}
    <table className="table table-striped">
    <thead>
    <tr>
        <th>
            <div className="d-flex flex-row">

            
            <input className="form-control m-2"
            onChange={this.changeDepartmentIdFilter}
            placeholder="Filter"/>
            
            <button type="button" className="btn btn-light"
            onClick={()=>this.sortResult('DepartmentId',true)}>
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-arrow-down-square-fill" viewBox="0 0 16 16">
                <path d="M2 0a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2H2zm6.5 4.5v5.793l2.146-2.147a.5.5 0 0 1 .708.708l-3 3a.5.5 0 0 1-.708 0l-3-3a.5.5 0 1 1 .708-.708L7.5 10.293V4.5a.5.5 0 0 1 1 0z"/>
                </svg>
            </button>

            <button type="button" className="btn btn-light"
            onClick={()=>this.sortResult('DepartmentId',false)}>
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-arrow-up-square-fill" viewBox="0 0 16 16">
                <path d="M2 16a2 2 0 0 1-2-2V2a2 2 0 0 1 2-2h12a2 2 0 0 1 2 2v12a2 2 0 0 1-2 2H2zm6.5-4.5V5.707l2.146 2.147a.5.5 0 0 0 .708-.708l-3-3a.5.5 0 0 0-.708 0l-3 3a.5.5 0 1 0 .708.708L7.5 5.707V11.5a.5.5 0 0 0 1 0z"/>
                </svg>
            </button>

            </div>
            DepartmentId
        </th>
        <th>
        <div className="d-flex flex-row">
        <input className="form-control m-2"
            onChange={this.changeDepartmentNameFilter}
            placeholder="Filter"/>

            <button type="button" className="btn btn-light"
            onClick={()=>this.sortResult('DepartmentName',true)}>
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-arrow-down-square-fill" viewBox="0 0 16 16">
                <path d="M2 0a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2H2zm6.5 4.5v5.793l2.146-2.147a.5.5 0 0 1 .708.708l-3 3a.5.5 0 0 1-.708 0l-3-3a.5.5 0 1 1 .708-.708L7.5 10.293V4.5a.5.5 0 0 1 1 0z"/>
                </svg>
            </button>

            <button type="button" className="btn btn-light"
            onClick={()=>this.sortResult('DepartmentName',false)}>
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-arrow-up-square-fill" viewBox="0 0 16 16">
                <path d="M2 16a2 2 0 0 1-2-2V2a2 2 0 0 1 2-2h12a2 2 0 0 1 2 2v12a2 2 0 0 1-2 2H2zm6.5-4.5V5.707l2.146 2.147a.5.5 0 0 0 .708-.708l-3-3a.5.5 0 0 0-.708 0l-3 3a.5.5 0 1 0 .708.708L7.5 5.707V11.5a.5.5 0 0 0 1 0z"/>
                </svg>
            </button>
            </div>
            DepartmentName
      
        </th>
        <th>
            Options
        </th>
    </tr>
    </thead>

    {/* Hadapu table ekat data map kranawa  */}
    <tbody>
        {departments.map(dep=>
            <tr key={dep.DepartmentId}>
                <td>{dep.DepartmentId}</td>
                <td>{dep.DepartmentName}</td>
                <td>

                 {/* Button for edit */ }   
                <button type="button"
                className="btn btn-light mr-1"
                data-bs-toggle="modal"
                data-bs-target="#exampleModal"
                onClick={()=>this.editClick(dep)}>

                    {/* Add the botsrape icon for edit */}
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-pencil-square" viewBox="0 0 16 16">
                    <path d="M15.502 1.94a.5.5 0 0 1 0 .706L14.459 3.69l-2-2L13.502.646a.5.5 0 0 1 .707 0l1.293 1.293zm-1.75 2.456-2-2L4.939 9.21a.5.5 0 0 0-.121.196l-.805 2.414a.25.25 0 0 0 .316.316l2.414-.805a.5.5 0 0 0 .196-.12l6.813-6.814z"/>
                    <path fillRule="evenodd" d="M1 13.5A1.5 1.5 0 0 0 2.5 15h11a1.5 1.5 0 0 0 1.5-1.5v-6a.5.5 0 0 0-1 0v6a.5.5 0 0 1-.5.5h-11a.5.5 0 0 1-.5-.5v-11a.5.5 0 0 1 .5-.5H9a.5.5 0 0 0 0-1H2.5A1.5 1.5 0 0 0 1 2.5v11z"/>
                    </svg>
                </button>


                 {/* Button for delete */ }   
                <button type="button"
                className="btn btn-light mr-1"
                onClick={()=>this.deleteClick(dep.DepartmentId)}>

                      {/* Add the botsrape icon for delete */}
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-trash-fill" viewBox="0 0 16 16">
                    <path d="M2.5 1a1 1 0 0 0-1 1v1a1 1 0 0 0 1 1H3v9a2 2 0 0 0 2 2h6a2 2 0 0 0 2-2V4h.5a1 1 0 0 0 1-1V2a1 1 0 0 0-1-1H10a1 1 0 0 0-1-1H7a1 1 0 0 0-1 1H2.5zm3 4a.5.5 0 0 1 .5.5v7a.5.5 0 0 1-1 0v-7a.5.5 0 0 1 .5-.5zM8 5a.5.5 0 0 1 .5.5v7a.5.5 0 0 1-1 0v-7A.5.5 0 0 1 8 5zm3 .5v7a.5.5 0 0 1-1 0v-7a.5.5 0 0 1 1 0z"/>
                    </svg>
                </button>

                </td>
            </tr>
            )}
    </tbody>
    </table>

{/* add the html code for botstrape modal window */}
<div className="modal fade" id="exampleModal" tabIndex="-1" aria-hidden="true">
<div className="modal-dialog modal-lg modal-dialog-centered">
<div className="modal-content">
   <div className="modal-header">
       <h5 className="modal-title">{modalTitle}</h5>
       <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"
       ></button>
   </div>

   <div className="modal-body">
       <div className="input-group mb-3">
        <span className="input-group-text">DepartmentName</span>  {/*one text box to add or edit deparment name  */}
        <input type="text" className="form-control"
        value={DepartmentName}
        onChange={this.changeDepartmentName}/>   {/*when the value of the text box change, we will execute a function and update the variable. e function eka uda hadala thiyenne  */}
       </div>



        {/*this button will visible when the user want to add new depatment*/}

        {DepartmentId==0?
        <button type="button"
        className="btn btn-primary float-start"
        onClick={()=>this.createClick()}
        >Create</button>
        :null}

        {/*this button will visible when the user want to update the depatment*/}

        {DepartmentId!=0?
        <button type="button"
        className="btn btn-primary float-start"
        onClick={()=>this.updateClick()}
        >Update</button>
        :null}

   </div>

</div>
</div> 
</div>


</div>
        )
    }
}