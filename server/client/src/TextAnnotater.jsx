import React, { useState, useRef } from 'react';
import styled from 'styled-components'
import MonacoEditor from 'react-monaco-editor';
import ToggleButton from 'react-bootstrap/ToggleButton'
import Button from 'react-bootstrap/Button'
import ToggleButtonGroup from 'react-bootstrap/ToggleButtonGroup'

const StyledTextAnnotater = styled.div`
    text-align: left;

    .hidden {
        display: none;
    }

    .highlight {
        background: yellow !important;
        color: black !important;
        font-weight: bold;
        font-style: oblique;
    }

    .note {
        color: blue !important;
        text-decoration: underline;
        font-weight: bold;
        font-style: oblique;
    }
`

export default ({document}) => {
    const monaco = useRef()
    const [selectedTool, setSelectedTool] = useState(1)
    const [note, setNote] = useState("")
    const [allNotes, setAllNotes] = useState([])

    const handleChange = (val) => { setNote("")
    setSelectedTool(val) };

    return <StyledTextAnnotater >
            <ToggleButtonGroup  type="radio" name="options" value={selectedTool} onChange={handleChange}>
                 <ToggleButton value={1}>None</ToggleButton>
                  <ToggleButton value={2}>Highlighter</ToggleButton>
                <ToggleButton value={3}>Notepad</ToggleButton>
            </ToggleButtonGroup>
            <Button onClick={() => {
                const selection = monaco.current.editor.getSelection();
                monaco.current.editor.deltaDecorations([], [
                    { range: selection, options: { inlineClassName: selectedTool === 2 ? 'highlight' : 'note'}, hoverMessage: selectedTool === 3 ? { value: note, isTrusted: true} : undefined}
                ]);

                if(selectedTool === 3 && note)
                setAllNotes([...allNotes, note])
                setNote("")
            }} className={selectedTool === 1 ? "hidden" : ""}>{selectedTool === 2 ? "Highlight" : "Make Note"}</Button>

            <input value={note} className={selectedTool === 3 ? "" : "hidden"} onChange={(evt) => setNote(evt.target.value)} placeholder="Note contents" />
            
            {allNotes.map((val, idx) => <ul key={idx}>{val}</ul>)}
            <MonacoEditor
            ref={monaco}
            width="600"
            height="600"
            language="javascript"
            theme="vs-dark"
            options={{
                readOnly: true,
                lineNumbers: "off",
                renderIndentGuides: false,
                autoIndent: "none",
            }}
            value={document.text}
        />
    </StyledTextAnnotater>
}