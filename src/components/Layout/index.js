import React from 'react';
import Header from './header'
import styled from "@emotion/styled"

const Page = styled.div`
  margin:10px;
`

const Layout = ({children,width=1000}) => {
    return <>
     <Header />
     <Page style={{padding: `0px 1.5rem calc((100vw - ${width}px) / 2)`}}>
     {children}
     </Page>
    </>
}


export default Layout;