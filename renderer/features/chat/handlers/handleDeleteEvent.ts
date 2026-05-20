export const handleDeleteEvent = ({ payload, stores }: any) => {
  const { reconcileMessage } = stores;
  reconcileMessage({
    ...payload,
    deleted: true,
    status: "sent",
  });
}