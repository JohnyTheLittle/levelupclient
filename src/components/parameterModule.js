import styled from 'styled-components'

const ParameterModule = styled.div`
  display: flex;
  justify-content: space-between;
  width: 15rem;
  font-size: 1.3rem;
  padding: 2%;
  color: white;
  margin: 2%;
  background: linear-gradient(145deg, rgba(72,93,223,1) 52%, rgba(194,27,111,1) 100%);
background-size: 400%; 400%;
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
    background-position: 100% 100%;
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

export default ParameterModule
