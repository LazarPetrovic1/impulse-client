export const compareVectorClocks = (a?: Record<string, number>, b?: Record<string, number>): number => {
  if (!a || !b) return 0;
  let aGreater = false;
  let bGreater = false;
  const keys = new Set([...Object.keys(a), ...Object.keys(b)]);
  keys.forEach((k) => {
    const av = a[k] || 0;
    const bv = b[k] || 0;
    if (av > bv) aGreater = true;
    if (bv > av) bGreater = true;
  });
  if (aGreater && !bGreater) return 1;
  if (bGreater && !aGreater) return -1;
  return 0; // concurrent
};

export const messageComparator = (a: any, b: any) => {
  const vc = compareVectorClocks(a.vectorClock, b.vectorClock);
  if (vc !== 0) return vc;
  return new Date(a.createdAt || 0).getTime() - new Date(b.createdAt || 0).getTime();
};