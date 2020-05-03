import React, { useState } from 'react';
import styled from 'styled-components'
import MonacoEditor from 'react-monaco-editor';

const StyledTextAnnotater = styled.div`
    text-align: left
`

export default ({document}) => {
    return <StyledTextAnnotater>
        <MonacoEditor
        width="800"
        height="600"
        language="javascript"
        theme="vs-dark"
        options={{
            readOnly: true,
            lineNumbers: "off",
            renderIndentGuides: false,
            autoIndent: "none"
        }}
        value={document.text}
      />
    </StyledTextAnnotater>
}