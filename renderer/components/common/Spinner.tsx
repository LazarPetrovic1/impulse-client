// @ts-nocheck
import React from "react";
import styled from "styled-components"
import Image from "next/image"
import { spinner } from "../../assets";

const SpinnerContainer = styled.div`
  width: 100%;
  height: ${props => props.isPage ? "100vh" : "100%"};
  display: flex;
  justify-content: center;
  align-items: center;
`

const SpinnerImage = styled(Image)`
  width: ${props => props.width}px;
  height: ${props => props.height}px;
  margin: auto;
  display: block;
`

export type SpinnerType = {
  width?: number;
  height?: number;
  isPage?: boolean;
}

export const Spinner = ({ width, height }: SpinnerType) => (
  <SpinnerContainer>
    <SpinnerImage
      width={width || 200}
      height={height || 200}
      src={spinner}
      alt="Loading..."
    />
  </SpinnerContainer>
);