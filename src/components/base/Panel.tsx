import * as React from 'react';
import styled from 'styled-components';

import { FlexColumn, FlexRow, FlexDiv } from './Layout';

const borderRadius = '4px';

const PanelRoot = styled(FlexColumn)`
  border-color: ${(props: any) => props.borderColor};
  border-radius: ${borderRadius};
  flex-basis: ${(props: any) => props.flexBasis};
  border-style: solid;
  border-width: 1px;
  margin: 4px;
  flex-shrink: 0;
`;

const Header = styled(FlexRow)`
  background-color: ${(props: any) => props.backgroundColor};
  border-top-left-radius: ${borderRadius};
  border-top-right-radius: ${borderRadius};
  padding: 8px;
`;

const Body = styled(FlexDiv)`
  background-color: ${(props: any) => props.backgroundColor};
`;

interface IPanelProps extends React.PropsWithChildren<{}> {
  headerBackgroundColor: string;
  bodyBackgroundColor: string;
  borderColor: string;
  flexBasis?: string;
  renderHeaderLeft: () => React.ReactElement | string;
  renderHeaderRight?: () => React.ReactElement;
}

export const Panel = ({
  headerBackgroundColor,
  bodyBackgroundColor,
  borderColor,
  flexBasis,
  renderHeaderLeft,
  renderHeaderRight,
  children
}: IPanelProps) => {
  return (
    <PanelRoot borderColor={borderColor} flexBasis={flexBasis}>
      <Header justifyContent="space-between" backgroundColor={headerBackgroundColor}>
        {renderHeaderLeft()}
        {renderHeaderRight && renderHeaderRight()}
      </Header>
      <Body backgroundColor={bodyBackgroundColor}>{children}</Body>
    </PanelRoot>
  );
};
