import React, { useEffect, useState } from 'react';
import { withRouter, useParams } from 'react-router'
import styled from 'styled-components'
import Loader from './Loader';
import TextAnnotater from './TextAnnotater'

const StyledDocumentView = styled.div`

`

const sleep = (ms) => new Promise(resolve => setTimeout(resolve, ms));

export default withRouter((props) => {
    const { doc } = useParams();
    const [document, setDocument] = useState(null)

    useEffect(() => {
        const fetchData = async () => {
            console.log(doc);
            await sleep(1000);
            setDocument({ id: doc, text: `kgjlfd
            gfd
            fdg
            gdf
            dfg
            fdg
            
            dfg
            dfg
            dfg
            d
            fg
            fdgfgd
            fgddffgd
            ggdf
            g
            fd
            fdg          
                                                                         gfdgfd` });
        }
        fetchData()
    }, [doc])

    return <StyledDocumentView>
        {!document ? <Loader /> : 
            <TextAnnotater document={document}/>}
    </StyledDocumentView>
})