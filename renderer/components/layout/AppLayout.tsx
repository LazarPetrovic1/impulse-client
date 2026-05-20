import { ReactNode } from 'react';
import styled from 'styled-components';
import { SystemMenu, TitleBar } from '../system';
import { NavBar } from '../navigation/NavBar';
import { AuthProvider, I18nProvider, ShortcutsProvider } from '../../application';
import StyledComponentsRegistry from '../../lib/styles/StyledComponentRegistry';
import UrlBar from '../system/UrlBar';
import { CommandPaletteProvider } from '../../application/providers/CommandPaletteProvider';
import { AlertContainer } from '../alerts/AlertContainer';

type Props = { children: ReactNode; };

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  height: 100vh;
`;

const Content = styled.div`
  flex: 1;
  overflow: hidden;
  display: flex;
`;

export const AppLayout = ({ children }: Props) => {
  return (
    <StyledComponentsRegistry>
      <CommandPaletteProvider>
        <ShortcutsProvider>
          <I18nProvider>
            <AuthProvider>
              <Wrapper>
                <TitleBar />
                <SystemMenu />
                <UrlBar />
                <NavBar />
                <Content>{children}</Content>
                <AlertContainer />
              </Wrapper>
            </AuthProvider>
          </I18nProvider>
        </ShortcutsProvider>
      </CommandPaletteProvider>
    </StyledComponentsRegistry>
  );
};