import React from 'react'


class Items extends React.Component{

    render(){
        const elements= this.props.elements;
        return(
            elements.map(element=>{                
                return (
                    <div key={element.id}>
                        <p>{element.data}</p>
                    </div>
                )
            })
            
        )
    }

}

export default Items