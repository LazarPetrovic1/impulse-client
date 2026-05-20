export const getMessageDeliveryStatus = (
  messageId: number,
  chatId: string,
  currentUserId: string,
  deliveredBy: Record<string, Record<string, string>>,
  seenBy: Record<string, Record<string, string>>
) => {
  const delivered = deliveredBy[chatId] || {};
  const seen = seenBy[chatId] || {};
  let deliveredCount = 0;
  let seenCount = 0;

  for (const [userId, lastDelivered] of Object.entries(delivered)) {
    if (userId === currentUserId) continue;
    if (Number(lastDelivered) >= messageId) deliveredCount++;
  }

  for (const [userId, lastSeen] of Object.entries(seen)) {
    if (userId === currentUserId) continue;
    if (Number(lastSeen) >= messageId) seenCount++;
  }

  if (seenCount > 0) return "seen";
  if (deliveredCount > 0) return "delivered";
  return "sent";
};