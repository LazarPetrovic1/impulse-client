'use client';

import { ReactNode, useEffect, useRef, useState } from 'react';
import {
  Group,
  Panel,
  Separator,
} from 'react-resizable-panels';
import { useLayoutStore } from '../../store/layout';

type Props = {
  left: ReactNode;
  center: ReactNode;
  right: ReactNode;
};

export const ThreeColumnLayout = ({ left, center, right }: Props) => {
  const [hideLeft, setHideLeft] = useState(false);
  const [hideRight, setHideRight] = useState(false);
  const resizeTimeout = useRef<any>(null);
  const { threeColumn, setThreeLeft, setThreeRight } = useLayoutStore();
  // 🔥 SAFE debounce helper
  const debounce = (fn: () => void, delay = 120) => {
    clearTimeout(resizeTimeout.current);
    resizeTimeout.current = setTimeout(fn, delay);
  };

  // 🔥 responsive (safe — not during drag)
  useEffect(() => {
    const handleResize = () => {
      const width = window.innerWidth;

      debounce(() => {
        if (width < 768) {
          setHideLeft(true);
          setHideRight(true);
        } else if (width < 1024) {
          setHideLeft(false);
          setHideRight(true);
        } else {
          setHideLeft(false);
          setHideRight(false);
        }
      });
    };

    handleResize();
    window.addEventListener('resize', handleResize);
    return () => {
      window.removeEventListener('resize', handleResize);
      clearTimeout(resizeTimeout.current);
    };
  }, []);

  return (
    <Group orientation="horizontal" style={{ height: '100%' }}>
      {/* LEFT PANEL */}
      <Panel
        defaultSize={threeColumn.left.collapsed ? 0 : threeColumn.left.size}
        minSize={threeColumn.left.collapsed ? 0 : 90}
        maxSize={120}
        collapsible
        onResize={(size) => {
          debounce(() => {
            const collapsed = size.inPixels <= 90;
            setThreeLeft({ collapsed, size: size.inPixels })
          });
        }}
      >
        {!threeColumn.left.collapsed && left}
      </Panel>

      <Separator style={{ width: 4, background: '#eee' }} />

      {/* CENTER PANEL */}
      <Panel minSize={30}>
        {center}
      </Panel>

      <Separator style={{ width: 4, background: '#eee' }} />

      {/* RIGHT PANEL */}
      <Panel
        defaultSize={threeColumn.right.collapsed ? 0 : threeColumn.right.size}
        minSize={threeColumn.right.collapsed ? 0 : 90}
        maxSize={270}
        collapsible
        onResize={(size) => {
          debounce(() => {
            const collapsed = size.inPixels <= 90;
            setThreeRight({ collapsed, size: size.inPixels });
          });
        }}
      >
        {!threeColumn.right.collapsed && right}
      </Panel>
    </Group>
  );
};