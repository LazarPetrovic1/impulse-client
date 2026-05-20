import React from "react";
import styled from 'styled-components'
import useContextMenu from "../../hooks/useContextMenu";
import { Theme } from "../../styles/theme/type";
import { createPortal } from "react-dom";

const ContextMenuWrapper = styled.ul<{ $top: string | number; $left: string | number }>`
  z-index: 25000;
  background-color: ${({ theme } : { theme: Theme }) => theme.colors.background};
  border-radius: 2px;
  padding-left: 0;
  margin: 0;
  position: fixed;
  list-style: none;
  top: ${props => props.$top};
  left: ${props => props.$left};

  & > li {
    padding: 0.2em 1em;
    color: ${({ theme } : { theme: Theme }) => theme.colors.textPrimary};
    cursor: pointer;
    &:hover { background-color: ${({ theme } : { theme: Theme }) => theme.colors.hover}; }
    transform: none;
  }

`

const ContextMenu = ({ outerRef, children }) => {
  const { xPos, yPos, menu } = useContextMenu(outerRef);
  if (menu) {
    return createPortal(
      <ContextMenuWrapper $top={yPos} $left={xPos}>{children}</ContextMenuWrapper>,
      document.body
    );
  }
  return <></>;
};

export { ContextMenu };