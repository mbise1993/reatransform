import React from "react";

import githubLogo from "../images/GitHub-Mark-Light-32px.png";

export default ({ ...otherProps }: React.ComponentProps<"div">) => {
  return (
    <div style={styles.root} {...otherProps}>
      Built with ❤️ by Matt Bise&nbsp;&nbsp;
      <a href="https://github.com/mbise1993/reatransform" target="_blank">
        <img src={githubLogo} title="GitHub" width="20" height="20" />
      </a>
    </div>
  );
};

const styles = {
  root: {
    display: "flex",
    alignItems: "center",
    fontSize: "12px",
  },
};
