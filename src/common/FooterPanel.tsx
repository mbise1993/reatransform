import React from "react";

export default ({ className, ...otherProps }: React.ComponentProps<"div">) => {
  return (
    <div className={className} {...otherProps}>
      Built with ♥ by <a href="https://github.com/mbise1993/reatransform">Matt Bise</a>
    </div>
  );
};
