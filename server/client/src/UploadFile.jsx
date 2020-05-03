import React, { useState } from 'react';
import styled from 'styled-components'
import { Form, Button } from 'react-bootstrap'
import axios from 'axios'

const StyledUploadFile = styled.div`
    .file {
        width: 50%;
        text-align: left;
    }

    button[disabled] {
        cursor: default
    }
`

const uploadFile = (file) => {
    console.log(file)
    const formData = new FormData()
    formData.append("file", file)

    axios.post("/submit-video", formData, {})
}

export default () => {
    const [path, setPath] = useState(null);

    return <StyledUploadFile>
        <Form onSubmit={e => {
            e.preventDefault();
            e.stopPropagation();
            uploadFile(path)
        }}>
            <Form.Group>
                <Form.File className="file" id="formcheck-api-custom" custom>
                    <Form.File.Input accept="video/mp4" isValid={!!path} onChange={event => setPath(event.target.files[0])} />
                    <Form.File.Label data-browse="Browse Files">
                        Upload a video
                    </Form.File.Label>
                    <Form.Control.Feedback type="valid">You did it!</Form.Control.Feedback>
                </Form.File>
            </Form.Group>
            <Button variant="primary" type="submit" disabled={!path}>
                Submit
            </Button>
        </Form>
    </StyledUploadFile>
}