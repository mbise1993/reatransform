import React from "react";

type TestPanelProps = {
  width: string;
  height: string;
} & React.HTMLProps<HTMLDivElement>;

export default ({ width, height, children, ...otherProps }: TestPanelProps) => {
  return (
    <div style={{ width, height }} {...otherProps}>
      {children}
    </div>
  );
};
