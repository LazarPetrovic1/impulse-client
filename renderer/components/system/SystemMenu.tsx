'use client';

import { useState } from 'react';
import styled from 'styled-components';
import { Theme } from '../../styles/theme/type';
import { useTranslation } from 'react-i18next';

const Bar = styled.div`
  display: flex;
  gap: 16px;
  padding: 6px 12px;
  background: ${({ theme } : { theme: Theme }) => theme.colors.background};
  border-bottom: 1px solid ${({ theme } : { theme: Theme }) => theme.colors.border};
  user-select: none;
`;

const MenuItem = styled.div`
  position: relative;
  cursor: pointer;
`;

const Dropdown = styled.div`
  position: absolute;
  top: 100%;
  left: 0;
  background: ${({ theme } : { theme: Theme }) => theme.colors.background};
  border: 1px solid ${({ theme } : { theme: Theme }) => theme.colors.border};
  padding: 8px 0;
  min-width: 160px;
  z-index: 1000;
`;

const DropdownItem = styled.div`
  padding: 6px 12px;
  cursor: pointer;
  &:hover { background: ${({ theme } : { theme: Theme }) => theme.colors.hover}; }
`;

const send = (action: string) => window.electron.sendMenuAction(action);

export const SystemMenu = () => {
  const [open, setOpen] = useState<string | null>(null);
  const { t } = useTranslation()
  return (
    <Bar>
      {/* FILE */}
      <MenuItem onClick={() => setOpen(open === 'file' ? null : 'file')}>
        {t('system.file')}
        {open === 'file' && (
          <Dropdown>
            <DropdownItem onClick={() => send('reload')}>{t('system.reload')}</DropdownItem>
            <DropdownItem onClick={() => send('quit')}>{t('system.quit')}</DropdownItem>
          </Dropdown>
        )}
      </MenuItem>

      {/* VIEW */}
      <MenuItem onClick={() => setOpen(open === 'view' ? null : 'view')}>
        {t('system.view')}
        {open === 'view' && (
          <Dropdown>
            <DropdownItem onClick={() => send('toggle-devtools')}>{t('system.devtools')}</DropdownItem>
          </Dropdown>
        )}
      </MenuItem>

      {/* WINDOW */}
      <MenuItem onClick={() => setOpen(open === 'window' ? null : 'window')}>
        {t('system.window')}
        {open === 'window' && (
          <Dropdown>
            <DropdownItem onClick={() => send('minimize')}>{t('system.minimize')}</DropdownItem>
            <DropdownItem onClick={() => send('maximize')}>{t('system.maximize')}</DropdownItem>
            <DropdownItem onClick={() => send('close')}>{t('system.close')}</DropdownItem>
          </Dropdown>
        )}
      </MenuItem>
    </Bar>
  );
};