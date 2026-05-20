import styled from "styled-components";
import { useNotificationStore } from "../../../features/notifications/store";
import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { Spinner } from "../../common";
import { NotifItem } from "./Notif";
import { useTranslation } from "react-i18next";

const NotifsContainer = styled.div.attrs(() => ({ className: 'container' }))`pointer-events: all;`;

export function NotifPage() {
  const { notifications: notifs, markAllAsRead } = useNotificationStore();
  const router = useRouter();
  useEffect(() => { markAllAsRead(); }, []);
  const { t } = useTranslation()
  return notifs.length > 0 ? (
    <NotifsContainer>
      <h2 className="display-4 text-center">Notifications</h2>
      {notifs.map((notif, ind) => <NotifItem notif={notif} key={`${notif.id}-${ind}`} />)}
      <div className="mt-4 w-100">
        <button onClick={() => router.push("/")} className="btn btn-dark btn-block mb-4">
          {t("notifs.home")}
        </button>
      </div>
    </NotifsContainer>
  ) : <Spinner />;
}