// components/system/UrlBar/UrlBar.tsx
import { useEffect, useRef } from "react";
import { useRouter } from "next/router";
import UrlBarContextMenu from "./UrlBarContextMenu";
import styled from "styled-components";
import { useUrlBarStore } from "../../features/system/store";
import { Theme } from "../../styles/theme/type";

const MainWrap = styled.div`
  display: flex;
  align-items: center;
  border: 1px solid ${({ theme } : { theme: Theme }) => theme.colors.border};
`;

const ActionsWrap = styled.div`
  display: flex;
  & > button {
    border: none;
    padding: 0.25rem 0.5rem;
    cursor: pointer;
    &:hover { opacity: 0.8; }
  }
`;

const BarWrap = styled.div`
  display: flex;
  flex: 1;
  align-items: center;
`;

const StaticPrefix = styled.div`
  padding: 0 0.15rem 0 0.5rem;
  user-select: none;
  background: ${({ theme } : { theme: Theme }) => theme.colors.background};
  color: ${({ theme } : { theme: Theme }) => theme.colors.textPrimary};
  cursor: not-allowed;
  font-family: monospace;
`;

const Bar = styled.input`
  flex: 1;
  padding: 0.25rem 0.5rem;
  border: none;
  outline: none;
  color: ${({ theme } : { theme: Theme }) => theme.colors.textPrimary};
  background: ${({ theme } : { theme: Theme }) => theme.colors.background};
`;

const HandlerButton = styled.button`
  color: ${({ theme } : { theme: Theme }) => theme.colors.textPrimary};
  background: ${({ theme } : { theme: Theme }) => theme.colors.background};
`

export default function UrlBar() {
  const router = useRouter();
  const { url, setUrl } = useUrlBarStore();
  const barRef = useRef<HTMLInputElement>(null);
  // sync initial route
  useEffect(() => { setUrl(router.asPath); }, [router.asPath, setUrl]);

  const onKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    // e.preventDefault()
    e.stopPropagation()
    if (e.key !== "Enter") return;
    router.push(url || "/");
    barRef.current?.blur();
  };

  const handleBack = () => router.back();
  const handleForward = () => window.history.forward();
  const handleReload = () => router.reload();

  return (
    <MainWrap>
      <ActionsWrap>
        <HandlerButton onClick={handleBack}><i className="fas fa-chevron-left" /></HandlerButton>
        <HandlerButton onClick={handleForward}><i className="fas fa-chevron-right" /></HandlerButton>
        <HandlerButton onClick={handleReload}><i className="fas fa-sync" /></HandlerButton> {/* ⟳ */}
      </ActionsWrap>

      <BarWrap>
        <StaticPrefix>http://localhost:8888</StaticPrefix>
        <Bar ref={barRef} value={url} onChange={(e) => setUrl(e.target.value)} onKeyDown={onKeyDown} />
        <UrlBarContextMenu outerRef={barRef} />
      </BarWrap>
    </MainWrap>
  );
}