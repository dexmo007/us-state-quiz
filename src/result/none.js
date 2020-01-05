import React from 'react';
import './result.css';

export default function none() {
  return (
    <React.Fragment>
      <div
        className="message"
        aria-hidden="true"
        style={{ visibility: 'hidden' }}
      >
        <span role="img" aria-hidden="true">
          ❌
        </span>
        <span>No result</span>
      </div>
      <button
        className="fit-content"
        aria-hidden="true"
        style={{ visibility: 'hidden' }}
      >
        <span>No result</span>
        <span role="img" aria-hidden="true">
          ❌
        </span>
      </button>
    </React.Fragment>
  );
}
