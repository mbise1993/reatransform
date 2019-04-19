import * as React from 'react';
import styled from 'styled-components';

import colors from './colors';
import { FlexRow } from './base';

const Container = styled(FlexRow)`
  margin: 8px;
  align-items: center;
`;

const Title = styled.span`
  font-size: 32px;
`;

const StyledButton = styled.button`
  background-color: ${colors.primary};
  border-radius: 4px;
  border: none;
  padding: 8px;
  margin-left: 24px;
  font-size: 16px;
  cursor: pointer;
`;

interface IHeaderProps {
  title: string;
  onTransformClick: () => void;
}

export default ({ title, onTransformClick }: IHeaderProps) => {
  return (
    <Container>
      <Title>{title}</Title>
      <StyledButton title="Run transform script" onClick={() => onTransformClick()}>
        Run Transform Script
      </StyledButton>
    </Container>
  );
};
