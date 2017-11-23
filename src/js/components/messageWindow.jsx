import React from 'react';
import ReactDOM from 'react-dom';

//Simple message window with text messages from jetfighter pilot
class MessageWindow extends React.Component{
    render(){
        return (
            <div className="message__containter">
                <h2 className="message__text">{this.props.text}</h2>
            </div>
        );
    }
}


export {MessageWindow}
