import React, { useState } from 'react';
import styled from 'styled-components'
import MonacoEditor from 'react-monaco-editor';
import ToggleButton from 'react-bootstrap/ToggleButton'
import ToggleButtonGroup from 'react-bootstrap/ToggleButtonGroup'

const StyledTextAnnotater = styled.div`
    text-align: left;
`

export default ({document}) => {
    const [selectedTool, setSelectedTool] = useState(1)

    const handleChange = (val) => setSelectedTool(val);

    return <StyledTextAnnotater >
            <ToggleButtonGroup  type="radio" name="options" value={selectedTool} onChange={handleChange}>
                 <ToggleButton value={1}>None</ToggleButton>
                  <ToggleButton value={2}>Highlighter</ToggleButton>
                <ToggleButton value={3}>Notepad</ToggleButton>
            </ToggleButtonGroup>
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