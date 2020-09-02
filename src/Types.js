import React from 'react'
import axios from "axios"
import Items from './Items.js'

class Types extends React.Component{
    constructor(){
        super()
        this.state = {
            types:[],
            typeId:'',
            value:'',
            data:'',
            elements:[]
        }
        this.handleChange = this.handleChange.bind(this);
        this.handleData =this.handleData.bind(this)
        this.createData= this.createData.bind(this)
    }

    async componentDidMount(){
        const id = this.props.match.params.id
        const types= (await axios.get(`/cartype/${id}`)).data
        this.setState({types})
        
        const loadReservations = async()=> {
            const typeId = window.location.hash.slice(1) * 1;
            this.setState({ typeId });

            const elements= (await axios.get(`/${typeId}/elements`)).data
            this.setState( {elements})
        }

        window.addEventListener('hashchange', async()=> {
            loadReservations();
        });

        if(window.location.hash.slice(1)){
        loadReservations();
        }
        else{
        window.location.hash = users[0].id;
        }
    
    }
    handleChange(event) {
        this.setState({value: event.target.value});
    }
    handleData(event) {
        this.setState({data: event.target.value});
    }

    async createData(e){
        e.preventDefault() 
        const id = this.props.match.params.id    
        await axios.post(`/new/type/info`, { data: this.state.data, typeId: 2})   
        await axios.post(`/new/type`, { make: this.state.value, carId: id})
        const types= (await axios.get(`/cartype/${id}`)).data
        this.setState({types})
    }

    async getInfo(id){
        // const elements= (await axios.get(`/${id}/elements`)).data
        // this.setState( {elements})
    }

   
render(){
    const {elements, typeId, value, data}= this.state
        return(
            <div>
                <div>
                <form onSubmit={this.createData} >
                    <label>
                        Add A New Car Type:
                        <input type="text" value={value}  onChange={this.handleChange}/>
                    </label>
                    <label>
                        Add Info:
                        <input type="text" data={data}  onChange={this.handleData}/>
                    </label>
                    <input type="submit" value="Submit" />
                </form>
            </div>
            <h3>All Types</h3>
            <div className="container">
                <div>
                    {
                        this.state.types.map(type =>{
                            return(
                                <div key={type.id}>
                                    <li onClick={()=>this.getInfo(type.id)}>{type.make}</li>
                                    {/* <li >
                                        <a href={ `/${type.id}`}>
                                        {type.make}
                                        </a>
                                    </li> */}
                                </div>
                            )
                        })
                    }
                </div>
              <div className='data'>
                  <Items elements={elements}/>
              </div>
                              
            </div>
        </div>
        )
    }
}

export default Types