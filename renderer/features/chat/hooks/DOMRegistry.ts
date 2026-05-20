const messageRefs = new Map<string, HTMLDivElement>();

export const registerMessageRef = (id: string, el: HTMLDivElement | null) => {
  if (el) messageRefs.set(id, el);
  else messageRefs.delete(id);
};

export const scrollToMessage = (id: string) => {
  const el = messageRefs.get(id);
  if (!el) return;
  el.scrollIntoView({ behavior: "smooth", block: "center" });
  el.classList.add("highlight");
  setTimeout(() => el.classList.remove("highlight"), 1500);
};