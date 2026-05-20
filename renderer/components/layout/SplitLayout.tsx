'use client';

import { ReactNode, useRef, useState } from 'react';
import { Group, Panel, Separator } from 'react-resizable-panels';
import { useLayoutStore } from '../../store/layout';

type Props = {
  left: ReactNode;
  right: ReactNode;
};

export const SplitLayout = ({ left, right }: Props) => {
  const [isCollapsed, setIsCollapsed] = useState<boolean>(() => false);
  const resizeTimeout = useRef<any>(null);
  const { split, setSplitLeft } = useLayoutStore();
  const debounce = (fn: () => void, delay = 120) => {
    clearTimeout(resizeTimeout.current);
    resizeTimeout.current = setTimeout(fn, delay);
  };
  return (
    <Group orientation="horizontal" style={{ height: '100%' }}>
        <>
          <Panel
            defaultSize={split.left.collapsed ? 0 : split.left.size}
            minSize={split.left.collapsed ? 0 : 80}
            maxSize={180}
            collapsedSize={15}
            collapsible
            onResize={(size) => {
              debounce(() => {
                const collapsed = size.inPixels <= 80;
                setSplitLeft({ collapsed, size: size.inPixels });
              })
            }}
          >
            {!split.left.collapsed && left}
          </Panel>

          <Separator
            style={{ width: 4, background: '#ddd', cursor: 'col-resize' }}
          />
        </>

      <Separator style={{ width: 4, background: '#eee' }} />

      <Panel defaultSize={70}>
        {right}
      </Panel>
    </Group>
  );
};