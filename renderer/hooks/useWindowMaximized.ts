import { useEffect, useState } from 'react';

export function useWindowMaximized() {
  const [isMaximized, setIsMaximized] = useState(false);

  useEffect(() => {
    let mounted = true;

    // get initial state
    window.electron.getIsMaximized().then((maxed) => {
      if (mounted) setIsMaximized(maxed);
    });

    // subscribe to changes
    const listener = (maxed: boolean) => setIsMaximized(maxed);
    window.electron.onMaximizeChange(listener);

    return () => {
      mounted = false;
      window.electron.offMaximizeChange(listener);
    };
  }, []);

  return isMaximized;
}