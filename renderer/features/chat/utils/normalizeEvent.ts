export const normalizeEvent = (event: any) => {
  if (event.type === "reply") return { type: "reply", payload: event.payload };
  if (event.type === 'add') return { type: 'message', payload: event.payload };
  if (event.deleted) return { type: 'delete', payload: event.payload };
  if (event.updatedAt) return { type: 'update', payload: event.payload };
  return { type: 'message', payload: event.payload };
};