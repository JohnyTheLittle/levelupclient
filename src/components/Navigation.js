import React from 'react'
import styled from 'styled-components'
const NavBar = styled.div`
color: white;
background: linear-gradient(145deg, rgba(72,93,223,1) 52%, rgba(194,27,111,1) 100%);
background-size: 200%; 200%;
margin: 1%;
padding: 0.5%;
border-radius: 20px;
display: flex;
flex-direction: row;
font-size: 2rem;
animation: gradient 20s alternate infinite;
transition: 1s;
@keyframes gradient {
  0% {
    background-position: 0% 0%;
  }
  25% {
    background-position: 0% 50%;
  }
  50% {
    background-position: 100% 50%;
  }
  75% {
    background-position: 100% 100%;
  }
  100% {
    background-position: 0% 50%;
  }
}
`
const NavButton = styled.button.attrs((props) => ({
  clicked: props.clicked ? true : false,
}))`
  border-radius: 50px;
  background: ${(props) =>
    props.clicked
      ? 'linear-gradient(324deg, rgba(92,255,240,1) 29%, rgba(10,8,36,1) 100%);'
      : 'linear-gradient(324deg, rgba(103,92,255,1) 29%, rgba(10,8,36,1) 100%)'};
  color: ${(props) => (props.clicked ? 'color: #2f2894;' : 'white;')}
  font-size: 0.5em;
  width: 5em;
  border-style: none;
  :hover {
    background: linear-gradient(
      324deg,
      rgba(92, 255, 240, 1) 29%,
      rgba(10, 8, 36, 1) 100%
    );
    color: #2f2894;
  }
  transition: 1s;
  animation-name: fadeIn;
  animation-duration: 1.5s;
  @keyframes fadeIn {
    0% {
      opacity: 0.0;
    }
    80% {
      opacity:0.9;
    }
    100% {
      opacity: 1;
    }
  }
`

export { NavBar, NavButton }
