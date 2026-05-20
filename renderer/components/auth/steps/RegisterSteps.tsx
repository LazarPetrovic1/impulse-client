import React from "react";
import styled from "styled-components";

const ProgressBar = styled.ul`
  max-width: 1200px;
  pointer-events: all;
  margin: 0 auto 90px auto;
  padding: 1rem;
  counter-reset: step;
`;

const ProgressBarItem = styled.li`
  cursor: pointer;
  list-style-type: none;
  width: calc(100% / 5);
  float: left;
  font-size: 11px;
  position: relative;
  text-align: center;
  text-transform: uppercase;
  color: #7d7d7d;
  &[data-name="important"] {
    font-style: oblique;
    font-weight: bolder;
  }
  &:before {
    width: 30px;
    height: 30px;
    content: counter(step);
    counter-increment: step;
    line-height: 30px;
    border: 2px solid #7d7d7d;
    display: block;
    text-align: center;
    margin: 0 auto 10px auto;
    border-radius: 50%;
    background-color: white;
  }
  &:after {
    width: 100%;
    height: 2px;
    content: "";
    position: absolute;
    background-color: #7d7d7d;
    top: 15px;
    left: -50%;
    z-index: -1;
  }
  &:first-child:after {
    content: none;
  }
  &.active {
    color: green;
    &::before {
      border-color: #55b776;
    }
  }
  &.active + li::after {
    background-color: #55b776;
  }
`

function RegisterSteps({ progress, setProgress }) {
  const changeEv = (progress: number) => setProgress(() => progress);
  return (
    <ProgressBar>
      <ProgressBarItem onClick={() => changeEv(0)} data-name="important" className={progress >= 0 ? "active" : ""}>
        Basic Information
      </ProgressBarItem>
      <ProgressBarItem onClick={() => changeEv(1)} data-name="important" className={progress >= 1 ? "active" : ""}>
        Profile Information
      </ProgressBarItem>
      <ProgressBarItem onClick={() => changeEv(2)} className={progress >= 2 ? "active" : ""}>Your bio</ProgressBarItem>
      {/* <ProgressBarItem className={progress >= 3 ? "active" : ""}>Other information</ProgressBarItem> */}
      <ProgressBarItem data-name="important" onClick={() => changeEv(3)} className={progress >= 3 ? "active" : ""}>
        License, terms and conditions
      </ProgressBarItem>
      {/* <ProgressBarItem data-name="important" className={progress >= 5 ? "active" : ""}>
        Security question
      </ProgressBarItem> */}
      {/*<ProgressBarItem className={progress >= 6 ? "active" : ""}>
        Snap an image (for validation)
      </ProgressBarItem>*/}
      <ProgressBarItem onClick={() => changeEv(4)} className={progress >= 4 ? "active" : ""}>Information overview</ProgressBarItem>
    </ProgressBar>
  );
}

export default RegisterSteps;