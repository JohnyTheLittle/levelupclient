import styled from 'styled-components'

const Figure = styled.div`
  height: 60px;
  width: 60px;
  border-radius: 5px;
  background-color: #df605f;
  animation-name: rotation;
  animation-duration: 6s;
  animation-iteration-count: infinite;
  animation-direction: alternate-reverse;
  @keyframes rotation {
    0% {
      border-radius: 10px;
    }
    10% {
      background-color: #e49b40;
      border-radius: 0px;
    }
    20% {
      background-color: #e4cf52;
      transform: scale(1.1, 1.1);
    }
    30% {
      transform: rotate(45deg);
      transform: scale(1, 1);
    }
    40% {
      background-color: #90e347;
      transform: rotate(180deg);
      opacity: 50%;
    }
    70% {
      background-color: #4774e3;
      border-radius: 50%;
    }
    80% {
      border-radius: 40%;
      background-color: #e347e2;
    }
    100% {
      border-radius: 50%;
      transform: rotate(360deg);
      opacity: 100%;
    }
  }
`
const Spinner = () => {
  return <Figure />
}
export default Spinner
