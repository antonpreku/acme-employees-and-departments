import React from 'react'
import ReactDOM from 'react-dom'
import axios from 'axios'
import Items from './Items.js'
import Cars from './MainPage'
import Bar from './TopBar'
import Types from './Types'
import {HashRouter, Route} from 'react-router-dom'

 
class App extends React.Component{
 
    render(){
        return  (
            <HashRouter>
                 <Bar />
                <div>
                <h3>-------------------------------</h3>
                    <Route path='/' exact component={Cars}/>
                    <Route path='/car/:id' exact component={Types}/>
                    <Route path='/:id' exact component={Items} />
                </div>
            </HashRouter>      
        )
    }
} 
ReactDOM.render(<App />, document.querySelector('#root'));