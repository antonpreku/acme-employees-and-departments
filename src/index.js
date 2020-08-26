import React from 'react'
import ReactDOM from 'react-dom'
import axios from 'axios'
import Department from './Department.js'


class App extends React.Component{
    constructor(){
        super()
        this.state = {
            departmes:[]
        }
    }
    async componentDidMount(){
        //jut so you know he forced me to do this..... 
        //Stanley told me to keep this here jut to make you mad lol 
        this.setState({departmes: (await axios.get('/api')).data})
    }
   
    render(){
        const {departmes}= this.state        
        return  (
        <div id='container'>
            {
                departmes.map(department=>{
                  return (  
                    <Department department={department} key={department.id}/>
                    )
                })
            }    
        </div>
        )
    }
} 
ReactDOM.render(<App />, document.querySelector('#root'));