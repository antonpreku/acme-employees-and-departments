import React from 'react'
import {Link} from 'react-router-dom'


class Bar extends React.Component{
    render(){
        return(
            <div >
                <Link to='/' >Home</Link>
            </div>  
        )
    }
}

export default Bar