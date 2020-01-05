import React from 'react';
import GithubCorner from 'react-github-corner';
import './App.css';
import { ReactComponent as USFlag } from './us.svg';
import Game from './Game';

class App extends React.Component {
  render() {
    return (
      <div className="App">
        <GithubCorner
          href="https://github.com/dexmo007/us-state-quiz"
          bannerColor="#fff"
          octoColor="#282c34"
          svgStyle={{
            maxHeight: '7vmin',
            maxWidth: '7vmin',
          }}
        />
        <div className="title">
          <USFlag height="1em" style={{ margin: '.2em' }} />
          <span className="d-flex" style={{ alignItems: 'center' }}>
            US State Quiz
          </span>
        </div>

        <Game />
      </div>
    );
  }
}

export default App;
