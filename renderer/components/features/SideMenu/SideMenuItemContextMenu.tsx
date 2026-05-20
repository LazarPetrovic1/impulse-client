import { useRef, useEffect } from "react";
import { useRouter } from "next/navigation";
import { useSideMenuStore } from "../../../features/homepage/store";
import { ContextMenu } from "../../common";
import useCopyToClipboard from "../../../hooks/useCopyToClipboard";
import { useTranslation } from "react-i18next";
import { useAlertStore } from "../../../features/alerts";

interface Props {
  outerRef: React.RefObject<HTMLLIElement>;
  href: string;
  id: number;
}

export function SideMenuItemContextMenu({ outerRef, href, id }: Props) {
  const router = useRouter();
  const { removeItem } = useSideMenuStore();
  const addAlert = useAlertStore(s => s.addAlert)
  const [copyToClipboard, { success }] = useCopyToClipboard();
  const isFirstRender = useRef(true);
  const { t } = useTranslation()

  useEffect(() => {
    if (isFirstRender.current) {
      isFirstRender.current = false;
      return;
    }

    if (success) addAlert({ id: crypto.randomUUID(), message: "Copied successfully", type: "success" });
    else addAlert({ id: crypto.randomUUID(), message: "Something went wrong", type: "error" });
  }, [success, addAlert]);

  const go = () => router.push(href);
  const copyPath = () => copyToClipboard(href, {});
  const removeMenuItem = () => removeItem(id);

  return (
    <ContextMenu outerRef={outerRef}>
      <li onClick={copyPath}>{t('ctxmenus.copyrel')}</li>
      <li onClick={go}>{t('ctxmenus.goto')}</li>
      <li onClick={removeMenuItem}>{t('ctxmenus.remove')}</li>
    </ContextMenu>
  );
}