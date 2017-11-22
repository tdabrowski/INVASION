import React from 'react';
import ReactDOM from 'react-dom';
import {GameBoard} from './components/gameBoard.jsx';


document.addEventListener('DOMContentLoaded', function(){

    class App extends React.Component {
        render() {
            return (
                <GameBoard/>
            );
        }
    }

    ReactDOM.render(
        <App/>,
        document.getElementById('app')
    );
});
