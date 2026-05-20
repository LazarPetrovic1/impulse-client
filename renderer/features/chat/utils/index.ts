export { compareVectorClocks, messageComparator } from "./vectorClock";
export { getMessageStatus } from "./getMessageStatus";
export { rebuildMessage } from "./rebuildMessage";
export * from "./normalizeIncoming";
export * from "./getMessageDeliveryStatus";
export * from "./isMessageSeen";
export { PriorityQueue } from "./priorityQueue";
export const linkify = (text: string) => text.replace(/(https?:\/\/[^\s]+)/g, "<a href='$1' target='_blank'>$1</a>");
export const isNearBottom = (el: HTMLElement, threshold = 100) => el.scrollHeight - el.scrollTop - el.clientHeight < threshold;