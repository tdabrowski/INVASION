import React from 'react';
import ReactDOM from 'react-dom';
//Section score
class Score extends React.Component {
  render() {
    return (
      <section id='score'>
        <div>
          SCORE<br/>
          <strong>0</strong>
        </div>
      </section>
    );
  }
}

export {Score};
