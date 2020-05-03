import React, { useEffect, useState } from 'react';
import { withRouter, useParams } from 'react-router'
import styled from 'styled-components'
import Loader from './Loader';
import TextAnnotater from './TextAnnotater'
import axios from 'axios'

const StyledDocumentView = styled.div`

`

export default withRouter((props) => {
    const { doc } = useParams();
    const [document, setDocument] = useState(null)

    useEffect(() => {
        const fetchData = async () => {
            let [text, video] = await Promise.all([axios.get("/get_transcript/" + doc), axios.get("/get_video/" + doc)]);
            setDocument({ id: doc, text: text.data, video: `data:application/video;base64,${video.data}`});
        }
        fetchData()
    }, [doc])

    return <StyledDocumentView>
        {!document ? <Loader /> : 
            <>
            <video controls>
             <source type="video/mp4" src={document.video} />
             </video>
            <TextAnnotater document={document}/>
            </>}
    </StyledDocumentView>
})