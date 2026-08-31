import { useEffect } from 'react';
import { GithubCorner } from 'react-github-corner';
import Modal from 'react-modal';
import './App.css';
import USFlag from './assets/us.svg?react';
import GameSettings from './components/GameSettings';
import Streak from './components/Streak';
import Game from './Game';

export default function App() {
  useEffect(() => {
    Modal.setAppElement('#app');
  }, []);
  return (
    <div className="App" id="app">
      <GameSettings />
      <Streak />
      <GithubCorner
        className="hidden-xs"
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
