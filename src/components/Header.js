import React from 'react'
import styled from 'styled-components'
const Head = styled.div`
  background-color: #d7bde2;
  padding: 1em;
  display: flex;
  box-shadow: 0 0 5px 0 rgba(0, 0, 0, 0.25);
  z-index: 1;
  transition: 1s;
  :hover {
    background-color: #ebdef0;
    transition: 1s;
  }
`

const Header = () => {
  return <Head>Header</Head>
}

export default Header
