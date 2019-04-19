import * as React from 'react';
import styled from 'styled-components';

import { FlexColumn, FlexRow, FlexSpan } from './Layout';

interface IListItemProps {
  backgroundColor?: string;
}

export const ListItem = styled(FlexRow)`
  background-color: ${(props: IListItemProps) => props.backgroundColor || 'transparent'};
  cursor: default;
  padding: 4px;
`;

const ListContainer = styled(FlexColumn)`
  flex-grow: 1;
`;

interface IListBoxProps {
  items: any[];
  selectedItem: any;
  itemBackgroundColor: string;
  selectedItemBackgroundColor: string;
  onItemClick: (item: any) => void;
  getKey: (item: any) => string;
  renderItemLeft: (item: any) => React.ReactElement;
  renderItemRight?: (item: any) => React.ReactElement;
}

export const ListBox = ({
  items,
  selectedItem,
  itemBackgroundColor,
  selectedItemBackgroundColor,
  onItemClick,
  getKey,
  renderItemLeft,
  renderItemRight
}: IListBoxProps) => {
  return (
    <ListContainer>
      {items.map(item => (
        <ListItem
          key={getKey(item)}
          justifyContent="space-between"
          onClick={() => onItemClick(item)}
          backgroundColor={
            item === selectedItem ? selectedItemBackgroundColor : itemBackgroundColor
          }>
          {renderItemLeft(item)}
          {renderItemRight && renderItemRight(item)}
        </ListItem>
      ))}
    </ListContainer>
  );
};
