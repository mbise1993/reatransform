import * as React from 'react';
import styled from 'styled-components';

const getBorderRadius = (props: IButtonProps) => {
  if (props.shape === 'rectangle') {
    return '4px';
  }
  if (props.shape === 'circle') {
    return '50%';
  }

  return '0px';
};

const StyledButton = styled.button`
  background-color: ${(props: IButtonProps) => props.backgroundColor || 'transparent'};
  border-radius: ${(props: IButtonProps) => getBorderRadius(props)};
  border: none;
  text-align: center;
  cursor: pointer;
  padding: 0px;
  margin: 0px;
  :focus {
    outline: none;
  }
`;

interface IButtonProps extends React.PropsWithChildren<{}> {
  backgroundColor?: string;
  shape?: 'rectangle' | 'circle';
  tooltip?: string;
  style?: any;
  onClick: (e: React.MouseEvent<HTMLElement, MouseEvent>) => void;
}

export const Button = ({ tooltip, style, onClick, children }: IButtonProps) => {
  return (
    <StyledButton title={tooltip} style={style} onClick={(e: React.MouseEvent<HTMLElement, MouseEvent>) => onClick(e)}>
      {children}
    </StyledButton>
  );
};
