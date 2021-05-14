import styled from 'styled-components'

const UserBadge = styled.div`
color: white;
background: linear-gradient(145deg, rgba(72,93,223,1) 52%, rgba(194,27,111,1) 100%);
background-size: 200%; 200%;
justify-content: space-between;
padding: 0.5%;
border-radius: 20px;
display: flex;
flex-direction: row;

font-size: 1rem;
height: 10%;
width: 90%;
margin: 1%;
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

@media (max-width: 375px) {
  position: relative;
  justify-content: space-between;
  margin-top: 10%;
  width: 100%;
  font-size: 0.8em;
  display: flex;
  height: 5%;
  flex-direction: row;
}
@media (max-width: 320px) {
  position:absolte;
  font-size: 0.8em;
  display: flex;
  height: 5%;
  flex-direction: row;
  self-align: bottom;
  z-index: 10;
}
`
export default UserBadge
