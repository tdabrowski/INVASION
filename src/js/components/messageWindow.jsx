import React from 'react';
import ReactDOM from 'react-dom';

//Simple message window with text messages from jetfighter pilot
class MessageWindow extends React.Component{
    render(){
        const styles={
            display: 'flex',
            flexDirection: 'column',
            aligneItems: 'center',
            justifyContent: 'center',
            width: '704px',
            height: '40px',
            margin: '1em auto'
        }
        return (
            <div style={styles}>
                <h2 style={{color:'white', textAlign:'center', display:'inline-block'}}>{this.props.text}</h2>
            </div>
        );
    }
}


export {MessageWindow}
