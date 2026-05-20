import { useRef } from "react";
import styled from "styled-components";
import { SideMenuList } from './SideMenuList';

const DashboardSideMenuContainer = styled.div`
  position: relative;
  height: 100%;
`;

const DashboardSideMenuUl = styled.ul<{ height: number }>`
  position: absolute;
  left: -50px;
  top: calc(50% - ${(props) => props.height / 2}px);
  & > li {
    transition: all 250ms linear;
    &:hover {
      cursor: pointer;
      transform: translate(30px, 0);
    }
  }
`;

const SideMenuNavContainer = styled.nav`
  height: 100%;
  max-width: 200px;
  width: 100%;
  border-right: 1px solid white;
  overflow-x: hidden;
`;

export function SideMenu() {
  const ul = useRef<HTMLUListElement>(null);
  return (
    <SideMenuNavContainer>
      <DashboardSideMenuContainer>
        <DashboardSideMenuUl ref={ul} height={ul?.current ? ul.current.clientHeight : 300}>
          <SideMenuList />
        </DashboardSideMenuUl>
      </DashboardSideMenuContainer>
    </SideMenuNavContainer>
  );
}