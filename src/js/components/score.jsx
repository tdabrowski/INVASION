import React from 'react';
import ReactDOM from 'react-dom';

//Live statistics about player score, hitted enemies, jets number and missedAliens
class Score extends React.Component {
    render() {
        return (
            <section id='score'>
              <div>
                SCORE:
                <strong>{this.props.score}</strong><br/>
                HITTED:
                <strong>{this.props.hitted}</strong><br/>
                JETFIGHTERS:
                <strong>{this.props.jets}</strong><br/>
                MISSED ALIENS:
                <strong>{this.props.missedAliens}</strong>
              </div>
            </section>
        );
    }
}

export {Score}
