import Link from "next/link";
import { useNotificationStore } from "../../../features/notifications/store";
import { Notification } from "./Notif";
type Props = { setDropdown: (value: boolean | ((prevState: boolean) => boolean)) => void }

export function Notifs({ setDropdown }: Props) {
  const notifs = useNotificationStore(s => s.notifications);
  return (
    <div className="position-absolute m-0 p-0" style={{ maxWidth: "230px", zIndex: 10 }}>
      {notifs && notifs.slice(notifs.length - 5, notifs.length).map((not) => <Notification not={not} key={not.id} />)}
      <Link
        href="/notifs"
        className="btn btn-secondary text-light btn-block"
        onClick={() => setDropdown(false)}
      >See all</Link>
    </div>
  );
}