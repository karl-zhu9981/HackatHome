import React, { useState } from 'react';
import styled from 'styled-components'
import { Form, Button } from 'react-bootstrap'
import axios from 'axios'
import { useHistory } from "react-router-dom";

const StyledUploadFile = styled.div`
    .file {
        width: 50%;
        text-align: left;
    }

    button[disabled] {
        cursor: default
    }

    .idField {
        width: 50%;
    }

    .idFieldContainer {
        display: flex;
        justify-content: center;
    }
`

const uploadFile = async (file, id, history) => {
    console.log(file)
    const formData = new FormData()
    formData.append("file", file)

    await axios.post("/submit-video/" + id, formData, {})
    history.push("/doc/" + id)
}

export default () => {
    const [path, setPath] = useState(null);
    const [userID, setUserID] = useState("");
    const history = useHistory();

    return <StyledUploadFile>
        <Form onSubmit={e => {
            e.preventDefault();
            e.stopPropagation();
            uploadFile(path, userID, history)
        }}>
            <Form.Group>
                <Form.File className="file" id="formcheck-api-custom" custom>
                    <Form.File.Input accept="video/mp4" isValid={!!path} onChange={event => setPath(event.target.files[0])} />
                    <Form.File.Label data-browse="Browse Files">
                        Upload a video
                    </Form.File.Label>
                </Form.File>
                <div className="idFieldContainer">
                <Form.Control className="idField" type="text" placeholder="Enter ID Number" value={userID} onChange={e => setUserID(e.target.value)}/>
                </div>
            </Form.Group>
            <Button variant="primary" type="submit" disabled={!path || !/^\d+$/.test(userID)}>
                Submit
            </Button>
        </Form>
    </StyledUploadFile>
}