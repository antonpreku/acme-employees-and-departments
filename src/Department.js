import React from 'react'
import ReactDOM from 'react-dom'
import axios from 'axios'



class Department extends React.Component{
    constructor(){
        super();
        this.state={
            employees:[]
        }
    }

    async componentDidMount(){
        //sorryyyyyyyyyy
        //jut so you know he forced me to do this..... 
        //Stanley told me to keep this here jut to make you mad lol 
        this.setState({employees: (await axios.get(`/${this.props.department.id}/employees`)).data})
    }

render(){
        const {employees}= this.state
        const department= this.props.department;         
    return(
        <div >
        <h4>{department.Department}</h4>
        {
            employees.map(emp=>{
              return ( 
                <div key={emp.id}>
                    <h5>{emp.Employee}</h5>
                    <button>x</button>
                    <button>Remove From Department</button>
                </div>
               )
           })
        }
       </div>
    )
    }
}


export default Department


