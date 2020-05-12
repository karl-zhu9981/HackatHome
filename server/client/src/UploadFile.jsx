import React, { useState } from 'react';
import styled from 'styled-components'
import { Form, Button } from 'react-bootstrap'
import axios from 'axios'
import { useHistory } from "react-router-dom";
import Loader from "./Loader"

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

const uploadFile = async (file, id, history, setLoading) => {
    console.log(file)
    const formData = new FormData()
    formData.append("file", file)

    setLoading(true);
    await axios.post("/submit-video/" + id, formData, {});
    while(!(await axios.get("/videos")).data.includes(id)) {
        // Don't spam the server
        await new Promise(resolve => setTimeout(resolve, 1000));
    }
    history.push("/doc/" + id)
}

export default () => {
    const [path, setPath] = useState(null);
    const [userID, setUserID] = useState("");
    const [loading, setLoading] = useState(false);
    const history = useHistory();

    return <StyledUploadFile>
        {loading ? <Loader/> : <Form onSubmit={e => {
            e.preventDefault();
            e.stopPropagation();
            uploadFile(path, userID, history, setLoading)
        }}>
            <Form.Group>
                <Form.File className="file" id="formcheck-api-custom" custom>
                    <Form.File.Input accept="video/mp4" isValid={!!path} onChange={event => setPath(event.target.files[0])} />
                    <Form.File.Label data-browse="Browse Files">
                        {path ? path.name : "Upload a video"}
                    </Form.File.Label>
                </Form.File>
                <div className="idFieldContainer">
                <Form.Control className="idField" type="text" placeholder="Enter a name for the video" value={userID} onChange={e => setUserID(e.target.value)}/>
                </div>
            </Form.Group>
            <Button variant="primary" type="submit" disabled={!path || !userID}>
                Submit
            </Button>
    </Form> }
    </StyledUploadFile>
}