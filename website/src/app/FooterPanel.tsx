import React from 'react';

import githubLogo from '../assets/GitHub-Mark-Light-32px.png';

export default ({ ...otherProps }: React.ComponentProps<'div'>) => {
  return (
    <div style={styles.root} {...otherProps}>
      Built with&nbsp;
      <span role="img" aria-label="Heart emoji">
        ❤️
      </span>
      &nbsp;by Matt Bise&nbsp;&nbsp;
      <a href="https://github.com/mbise1993/reatransform" target="_blank" rel="noopener noreferrer">
        <img src={githubLogo} title="GitHub" alt="GitHub" width="20" height="20" />
      </a>
    </div>
  );
};

const styles = {
  root: {
    display: 'flex',
    alignItems: 'center',
    fontSize: '12px',
  },
};
