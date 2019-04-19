import * as React from 'react';
import styled from 'styled-components';

interface IFlexProps {
  flexGrow?: number;
  justifyContent?: string;
  alignSelf?: string;
}

export const FlexSpan = styled.span`
  display: flex;
  flex: 1;
  flex-grow: ${(props: IFlexProps) => props.flexGrow || 0};
  justify-content: ${(props: IFlexProps) => props.justifyContent || 'flex-start'};
  align-self: ${(props: IFlexProps) => props.alignSelf || 'center'};
`;

export const FlexDiv = styled.div`
  display: flex;
  flex: 1;
  flex-grow: ${(props: IFlexProps) => props.flexGrow || 0};
  justify-content: ${(props: IFlexProps) => props.justifyContent || 'flex-start'};
  align-self: ${(props: IFlexProps) => props.alignSelf || 'auto'};
`;

export const FlexRow = styled(FlexDiv)`
  flex-direction: row;
`;

export const FlexColumn = styled(FlexDiv)`
  flex-direction: column;
`;
