// components/system/UrlBar/UrlBarContextMenu.tsx
import { useRouter } from "next/navigation";
import { useUrlBarStore } from "../../features/system/store";
import { ContextMenu } from "../common";
import useCopyToClipboard from "../../hooks/useCopyToClipboard";
import { useTranslation } from "react-i18next";
import { useAlertStore } from "../../features/alerts";
interface UrlBarContextMenuProps { outerRef: React.RefObject<HTMLInputElement>; }

export default function UrlBarContextMenu({ outerRef }: UrlBarContextMenuProps) {
  const router = useRouter();
  const { url, setUrl } = useUrlBarStore();
  const addAlert = useAlertStore(s => s.addAlert)
  const [copyToClipboard] = useCopyToClipboard()
  const { t } = useTranslation()

  const copyText = async () => {
    const id = crypto.randomUUID();
    try {
      copyToClipboard(url, {});
      addAlert({ id, message: "Copied successfully", type: "success" });
    } catch {
      addAlert({ id, message: "Failed to copy", type: "error" });
    }
  };

  const pasteText = async () => {
    const id = crypto.randomUUID();
    try {
      const text = await navigator.clipboard.readText();
      setUrl(url + text);
      addAlert({ id, message: "Pasted successfully", type: "success" });
    } catch {
      addAlert({ id, message: "Failed to paste", type: "error" });
    }
  };

  const selectAll = () => {
    outerRef.current?.focus();
    outerRef.current?.select();
  };

  const go = () => router.push(url);

  return (
    <ContextMenu outerRef={outerRef}>
      <li onClick={copyText}>{t('ctxmenus.copytext')}</li>
      <li onClick={pasteText}>{t('ctxmenus.pastetext')}</li>
      <li onClick={selectAll}>{t('ctxmenus.selectall')}</li>
      <li onClick={go}>{t('ctxmenus.gohere')}</li>
    </ContextMenu>
  );
}