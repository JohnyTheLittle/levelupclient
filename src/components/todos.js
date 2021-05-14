import styled from 'styled-components'
import { H1 } from './RegisterForm'

const Todo = styled.div`
display: flex;
justify-content: space-between;
width: 15rem;
font-size: 1.5rem;
padding: 2%;
color: white;
margin: 2%;
background: linear-gradient(100deg, rgba(223,96,95,1) 5%, rgba(228,155,64,1) 19%, rgba(228,207,82,1) 35%, rgba(144,227,71,1) 50%, rgba(71,116,227,1) 74%, rgba(227,71,226,1) 93%);
background-size: 600%; 600%;
transition: 1s;
animation: gradient 20s alternate infinite;
border-radius: 15px;
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
  background-position: 100% 50%;
}
100% {
  background-position: 0% 50%;
}
}
:hover {
  transition: 0.5s;
  color: #1d1160;
  background: linear-gradient(
    315deg,
    rgba(71, 236, 171, 1) 22%,
    rgba(92, 199, 255, 1) 100%
  );
}
@media (max-width: 500px) {
  margin: 1%;
}
`


export default Todo
