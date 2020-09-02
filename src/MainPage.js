import React from 'react'
import ReactDOM from 'react-dom'
import axios from 'axios'
import {Link} from 'react-router-dom'

class Cars extends React.Component{
      constructor(){
        super()
        this.state = {
            cars:[],
            types:[],
            carId:'',
            value:''
        }
        this.createCar= this.createCar.bind(this)
        this.handleChange = this.handleChange.bind(this);
    }
    async componentDidMount(){
        this.setState({cars: (await axios.get('/api')).data})
        const loadReservations = async()=> {
            const carId = window.location.hash.slice(1) * 1;
            this.setState({ carId });
        };

          window.addEventListener('hashchange', async()=> {
            loadReservations();
          });
          if(window.location.hash.slice(1)){
            loadReservations();
          }
          else{
            window.location.hash 
          }
    }

    handleChange(event) {
        this.setState({value: event.target.value});
      }

    async createCar(e){
        e.preventDefault()
       await axios.post(`/new/car`, { name: this.state.value, carId:2 })
       this.setState({cars: (await axios.get('/api')).data})
    }

    render(){
        const { cars, value, types}= this.state
        return(
            <div >
            <div>
                <form onSubmit={this.createCar}>
                    <label>
                Add A New Make:
                    <input type="text" value={value}  onChange={this.handleChange}/>
                    </label>
                    <input type="submit" value="Submit" />
                </form>
            </div>
            <h3>All Cars</h3>
            {
                cars.map(car=>{
                    return (
                        <div key={car.id}> 
                            {/* <a href={ `#${car.id}`}></a> */}
                            <Link to={`/car/${car.id}`}>{ car.name }</Link>
                        </div> 
                    )
                })
            }
        </div>
        )
    }

}

export default Cars