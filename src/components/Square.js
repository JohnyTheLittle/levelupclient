import styled from 'styled-components'

const Square = styled.div`
  opacity: 90%;
  max-height: 100%;
  transition: 1s;
  max-width: 100%;
  z-index: 1;
  position: relative;
  border-radius: 40px;
  width: ${(props) => props.w || 30}rem;
  height: ${(props) => props.h || 10}rem;
  transform: rotate(${(props) => props.deg || 40}deg);
  top: ${(props) => props.transY || 0}%;
  left: ${(props) => props.transX || 0}%;
  background-color: ${(props) => props.color || '#ee82ee'};
  ${(props) => {
    if (props.move) {
      return `animation: moving 100s infinite alternate;
      @keyframes moving {
          50% {
              transform: rotate(50deg);
          }
          70% {
            transform: rotate(70deg);
          }
          100% {
              transform: rotate(100deg);
          }

      }
      `
    }
  }}
  :hover {
      transition: 1s;
      opacity: 30%;
      border-radius: 100%;
  }
`
export default Square
