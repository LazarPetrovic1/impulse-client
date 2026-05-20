import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { LogoShortSVG, close, minimize, maximize, unmaximize } from '../../assets';
import styled from 'styled-components';
import { Theme } from '../../styles/theme/type';
import { useWindowMaximized } from '../../hooks';

export const TitleBarWrap = styled.div`
  display: flex;
  align-items: center;
  height: 40px;
  padding: 0 8px;
  background: ${({ theme } : { theme: Theme }) => theme.colors.background};
  color: ${({ theme } : { theme: Theme }) => theme.colors.textPrimary};
  border-bottom: 1px solid ${({ theme } : { theme: Theme }) => theme.colors.border};
  user-select: none;
`;

export const Left = styled.div`
  display: flex;
  align-items: center;
  img { height: 20px; cursor: pointer; }
`;

export const Center = styled.div`
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: center;
  -webkit-app-region: drag;
  -webkit-user-select: none;
  span {
    font-size: 0.9rem;
    font-weight: 500;
    color: ${({ theme } : { theme: Theme }) => theme.colors.textSecondary};
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }
`;

export const Right = styled.div`
  -webkit-app-region: no-drag;
  display: flex;
  align-items: center;
  gap: 4px;
`;

export const IconButton = styled.button<{ $danger?: boolean }>`
  width: 32px;
  height: 32px;
  display: flex;
  align-items: center;
  justify-content: center;
  background: transparent;
  border: none;
  cursor: pointer;
  transition: background 0.15s ease;
  color: ${({ theme } : { theme: Theme }) => theme.colors.textPrimary};
  &:hover {
    background: ${({ $danger, theme } : { $danger: boolean; theme: Theme }) =>
      $danger ? theme.colors.accent : theme.colors.hover};
  }
  img { width: 14px; height: 14px; pointer-events: none; }
`;

export const TitleBar: React.FC = () => {
  const router = useRouter();
  const [title, setTitle] = useState<string>('Impulse');
  const isMaximized = useWindowMaximized();

  // ✅ Sync title with route
  useEffect(() => {
    const handleRoute = () => setTitle(document.title);
    router.events.on('routeChangeComplete', handleRoute);
    return () => router.events.off('routeChangeComplete', handleRoute);
  }, [router.events]);

  const handleMaximize = () => window.electron.sendMenuAction("maximize");
  const handleMinimize = () => window.electron.sendMenuAction("minimize");
  const handleClose = () => window.electron.sendMenuAction("close");

  return (
    <TitleBarWrap>
      <Left title='Impulse'><img src={LogoShortSVG.src} alt="logo" onClick={() => router.push('/')} /></Left>
      <Center><span>{title}</span></Center>

      <Right>
        <IconButton title='Minimize' onClick={handleMinimize}><img src={minimize.src} alt="minimize" /></IconButton>
        <IconButton title={isMaximized ? "Unmaximize" : "Maximize"} onClick={handleMaximize}>
          <img src={isMaximized ? unmaximize.src : maximize.src} alt="maximize" />
        </IconButton>
        <IconButton $danger title='Close' onClick={handleClose}><img src={close.src} alt="close" /></IconButton>
      </Right>
    </TitleBarWrap>
  );
};