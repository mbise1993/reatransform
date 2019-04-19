import * as React from 'react';
import AceEditor from 'react-ace';

import brace from 'brace';
import 'brace/mode/javascript';
import 'brace/theme/github';

interface IEditorViewProps {
  text: string;
  isEditable: boolean;
  height: string;
  onTextChange: (text: string) => void;
}

export default ({ text, isEditable, height, onTextChange }: IEditorViewProps) => {
  return (
    <AceEditor
      mode="javascript"
      theme="github"
      placeholder="Enter Javascript code"
      editorProps={{
        $blockScrolling: Infinity
      }}
      value={text}
      readOnly={!isEditable}
      height={height}
      onChange={text => onTextChange(text)}
    />
  );
};
