import { useRouter } from "next/router";
import Link from "next/link";
import styled from "styled-components";
import { useSettingsUIStore } from "../../../features/settings/store";
import { Theme } from "../../../styles/theme/type";
import { useTranslation } from "react-i18next";
export const settingsBarWidth = 260;

const Wrapper = styled.div`display: flex; height: 100%; width: 100%;`;

const Sidebar = styled.aside<{ $stashed: boolean; }>`
  overflow-y: auto;
  width: ${(p) => (p.$stashed ? "60px" : `${settingsBarWidth}px`)};
  transition: all 0.3s ease;
  background: ${({ theme } : { theme: Theme }) => theme.colors.background};
  border-right: 1px solid ${({ theme } : { theme: Theme }) => theme.colors.accent};
  position: fixed;
  display: block;
  height: calc(100% - 40px - 37px - 32px - 53px);
  ul {
    list-style: none;
    padding: 0;
    li {
      padding: 12px;
      cursor: pointer;
      a { color: inherit; text-decoration: none; }
      &.active { font-weight: bold; }
      &:hover { opacity: 0.8; }
    }
  }
`;

const Content = styled.main`
  flex: 1;
  padding: 16px;
  transition: margin 0.3s ease;
  overflow: auto;
`;

const ToggleBtn = styled.button`
  z-index: 100;
  bottom: 10px;
  right: 10px;
  background: ${({ theme } : { theme: Theme }) => theme.colors.background};
  color: ${({ theme } : { theme: Theme }) => theme.colors.textPrimary};
  border: none;
  padding: 6px 10px;
  position: absolute;
  &:hover { color: ${({ theme } : { theme: Theme }) => theme.colors.hover}; }
  &:focus { color: ${({ theme } : { theme: Theme }) => theme.colors.hover}; }
  &:blur {
    color: ${({ theme } : { theme: Theme }) => theme.colors.textPrimary};
    background: ${({ theme } : { theme: Theme }) => theme.colors.background};
  }
`;

export const SettingsListItem = styled.li<{
	$islast?: boolean;
	$getCenter?: boolean;
}>`
	background: ${({ theme } : { theme: Theme }) => theme.colors.background};
	border-bottom: 1px solid ${({ theme, $islast }) => !$islast ? theme.colors.accent : "none"};
	display: flex;
	${props => props.$getCenter && `align-items: center;`}
	overflow: hidden;
  width: 100%;
`;

export function SettingsLayout({ children }) {
  const { t } = useTranslation()
  const NAV_ITEMS = [
    { label: t('settings.basic'), path: "/settings" },
    { label: t('settings.account'), path: "/settings/profile" },
    { label: t('settings.content'), path: "/settings/content-policy" },
    { label: t('settings.additional'), path: "/settings/social" },
    { label: t('settings.terms'), path: "/settings/terms" },
    { label: t('settings.theme'), path: "/settings/theme" },
    { label: t('settings.docs'), path: "/settings/apis" },
    { label: t('settings.shortcuts'), path: "/settings/shortcuts" },
    { label: t('settings.sidemenu'), path: "/settings/sidemenu" },
  ];
  const router = useRouter();
  const { isSidebarHidden, toggleSidebar } = useSettingsUIStore();

  return (
    <Wrapper>
      <Sidebar $stashed={isSidebarHidden}>
        {!isSidebarHidden && (
          <ul>
            {NAV_ITEMS.map((item) => (
              <li key={item.path} className={router.pathname === item.path ? "active" : ""}>
                <Link href={item.path}>{item.label}</Link>
              </li>
            ))}

            <li>
              <Link href="/impulse/change-password">{t('settings.changepass')}</Link>
            </li>
          </ul>
        )}

        <ToggleBtn className="btn" onClick={toggleSidebar}>
          <i className={`fas fa-angle-double-${isSidebarHidden ? "right" : "left" }`} />
        </ToggleBtn>
      </Sidebar>

      <Content style={{ marginLeft: isSidebarHidden ? 60 : settingsBarWidth }}>
        {children}
      </Content>
    </Wrapper>
  );
}