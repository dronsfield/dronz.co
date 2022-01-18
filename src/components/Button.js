import styled from "styled-components"

const Button = styled.button`
  background-color: #111;
  border: 1px solid white;
  color: transparent;
  cursor: pointer;
  font-family: inherit;
  font-size: inherit;
  line-height: 2.8em;
  height: 2.8em;
  overflow: hidden;
  padding: 0 1em;
  position: relative;
  display: inline-block;

  &:after {
    color: white;
    content: "${p => p.children}";
    height: 100%;
    left: 0;
    mix-blend-mode: difference;
    position: absolute;
    top: 0;
    width: 100%;
    padding: 0 1em;
  }

  &:before {
    background-color: white;
    content: "";
    height: 100%;
    left: 0;
    position: absolute;
    top: 0;
    transform-origin: 0% 0%;
    transform: skew(-20deg) translateX(-100%);
    transition: transform 0.25s linear;
    width: 100%;
    width: calc(100% + 3em);
  }

  &:hover:before {
    transform: skew(-20deg) translateX(0%);
  }
`

export default Button
