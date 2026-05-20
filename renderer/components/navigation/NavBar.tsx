'use client';

import { usePathname, useRouter } from 'next/navigation';
import styled from 'styled-components';
import { useAuthStore } from '../../features/auth/store';
import { Theme } from '../../styles/theme/type';
import { useAuth } from '../../features/auth/hooks';
import { LogoMediumPNG } from '../../assets';
import Image from 'next/image';
import { LottieAnim } from '../common';
import { about, home as homeData, userBackup, settings, logout as logoutData, register, login as loginData, bell } from '../../assets/animations';
import { useState } from 'react';
import { useInitNotifications } from '../../features/notifications/hooks';
import { useNotificationStore } from '../../features/notifications/store';
import { Notifs } from '../features/notifications';
import { useTranslation } from 'react-i18next';
import { LanguageSwitcher } from '../features/i18n';
import { ThemeSwitcher } from '../features/themes';

const NotifCounterContainer = styled.span`
  position: absolute;
  z-index: 100;
  top: 0;
  left: 0;
  font-size: 10px;
  border: 1px solid red;
  border-radius: 50%;
  width: 15px;
  height: 15px;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: red;
  color: white;
`;

const MediumLogo = styled(Image).attrs(() => ({
  alt: 'Impulse: Make an impact. Change lives.',
  title: 'Impulse: Make an impact. Change lives.',
}))`
  max-height: 2rem;
  width: auto;
  user-select: none;
`

const Wrapper = styled.nav`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 10px 16px;
  border-bottom: 1px solid ${({ theme } : { theme: Theme }) => theme.colors.border};
`;

const Left = styled.div`
  display: flex;
  align-items: center;
  gap: 16px;
`;

const Right = styled.div`
  display: flex;
  align-items: center;
  gap: 12px;
`;

const NavItem = styled.button<{ $active?: boolean }>`
  background: none;
  border: none;
  cursor: pointer;
  color: ${({ theme, $active } : { theme: Theme, $active: boolean }) =>
    $active ? theme.colors.accent : theme.colors.textPrimary};
  font-weight: ${({ $active }) => ($active ? 'bold' : 'normal')};
  &:disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }
`;

const Logo = styled.div`
  font-weight: bold;
  cursor: pointer;
`;

export const NavBar = () => {
  const { t } = useTranslation();
  const [dropdown, setDropdown] = useState<boolean>(() => false);
  const { isAuthenticated, user, isReady } = useAuthStore();
  const { logout } = useAuth();
  const pathname = usePathname();
  const router = useRouter();
  useInitNotifications();
  const { unreadCount, markAllAsRead } = useNotificationStore();

  const navigate = (path: string) => {
    if (pathname === path) return;
    router.push(path);
  };

  const handleLogout = () => {
    logout(parseInt(user.id.toString()));
    router.push('/login');
  };

  const isActive = (path: string) => pathname === path ? true : undefined;

  const handleDropdown = () => {
    setDropdown((prev) => !prev);
    markAllAsRead()
  }

  return (
    <Wrapper>
      {/* LEFT */}
      <Left>
        <Logo onClick={() => navigate('/')}>
          <MediumLogo src={LogoMediumPNG} alt='Impulse' />
        </Logo>
      </Left>

      {/* RIGHT */}
      <Right>
        {isAuthenticated ? (
          <>
            <NavItem
              $active={isActive('/')}
              disabled={isActive('/')}
              onClick={() => navigate('/')}
            >
              <LottieAnim
                text={t('nav.homepage')}
                data={homeData}
                width={30}
                height={30}
              />
            </NavItem>

            <NavItem
              $active={isActive('/profile/')}
              disabled={isActive('/profile/')}
              onClick={() => navigate('/profile/')}
            >
              <LottieAnim
                text={user?.firstName || t('nav.profile')}
                data={userBackup}
                width={30}
                height={30}
              />
            </NavItem>

            <NavItem
              $active={isActive('/settings/')}
              disabled={isActive('/settings/')}
              onClick={() => navigate('/settings/')}
            >
              <LottieAnim
                text={t('nav.settings')}
                width={30}
                height={30}
                data={settings}
              />
            </NavItem>

            <NavItem>
              <div onClick={handleDropdown} style={{ position: 'relative' }}>
                {unreadCount > 0 && <NotifCounterContainer>{unreadCount}</NotifCounterContainer>}
                <div>
                  <LottieAnim
                    text={t('nav.notifications')}
                    width={30}
                    height={30}
                    data={bell}
                  />
                  <i className="fas fa-caret-down pl-2" />
                </div>
              </div>
              {dropdown && <Notifs setDropdown={setDropdown} />}
            </NavItem>

            <NavItem onClick={handleLogout}>
              <LottieAnim
                text={t('nav.logout')}
                width={30}
                height={30}
                data={logoutData}
                style={{
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  height: "100%",
                }}
              />
            </NavItem>
          </>
        ) : (
          <>
            <ThemeSwitcher notext />
            <LanguageSwitcher notext />
            <NavItem
              $active={isActive('/login/')}
              disabled={isActive('/login/')}
              onClick={() => navigate('/login/')}
            >
              <LottieAnim
                text={t('nav.login')}
                width={30}
                height={30}
                data={loginData}
                style={{
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  height: "100%",
                }}
              />
            </NavItem>

            <NavItem
              $active={isActive('/register/')}
              disabled={isActive('/register/')}
              onClick={() => navigate('/register/')}
            >
              <LottieAnim
                text={t('nav.register')}
                width={30}
                height={30}
                data={register}
              />
            </NavItem>

            <NavItem
              $active={isActive('/about/')}
              disabled={isActive('/about/')}
              onClick={() => navigate('/about/')}
            >
              <LottieAnim
                text={t('nav.about')}
                width={30}
                height={30}
                data={about}
              />
            </NavItem>
          </>
        )}
      </Right>
    </Wrapper>
  );
};

