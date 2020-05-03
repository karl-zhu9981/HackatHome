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
            const resp = await axios.get("/get_transcript/" + doc);
            setDocument({ id: doc, text: resp.data});
        }
        fetchData()
    }, [doc])

    return <StyledDocumentView>
        {!document ? <Loader /> : 
            <TextAnnotater document={document}/>}
    </StyledDocumentView>
})