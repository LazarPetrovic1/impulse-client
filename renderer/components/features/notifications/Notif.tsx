import moment from "moment";
import Link from "next/link";
import { NotificationType } from "../../../types";
import { Spinner } from "../../common";
import { useAuthStore } from "../../../features/auth/store";
import { useFriendRequestSocket } from "../../../features/friend";
import styled from "styled-components";
import { useRouter } from "next/router";
import { Theme } from "../../../styles/theme/type";
import { useGroupMutations } from "../../../features/groups";
type Props = { not: NotificationType; }
const NotifWrapper = styled.div`
  cursor: pointer;
  background: ${({ theme } : { theme: Theme }) => theme.colors.background};
  color: ${({ theme } : { theme: Theme }) => theme.colors.textPrimary};
  &:hover { background: ${({ theme } : { theme: Theme }) => theme.colors.hover}; }
`;

// used in nav

export function Notification({ not }: Props) {
  return not ? (
    <div
      className={`m-0 d-flex justify-content-center align-items-center border-bottom ${
        not.isRead ? "bg-dark text-light" : "bg-info text-light"
      }`} style={{ width: "100%", flex: 1 }}
    >
      <i className="fas fa-envelope-open px-3" />
      <div className="d-flex flex-column">
        <div className="position-relative m-0">
          <Link href={`/profile/${not.actor}/`} className="text-decoration-none text-light">
            <div className="pb-3">
              <small>{not.body}</small>
              <div className="position-absolute" style={{ bottom: 0 }}>
                <small>on {moment(not.createdAt).format("DD.MM, YYYY.")}</small>
              </div>
            </div>
          </Link>
        </div>
      </div>
    </div>
  ) : <Spinner />;
}

type NotifProps = {
  notif: NotificationType;
};

// used in page

export const NotifItem = ({ notif }: NotifProps) => {
  const router = useRouter();

  const handleClick = () => {
    switch (notif.type) {
      case "reaction":
      case "mention":
        // route to actor profile
        return router.push(`/profile/${notif.actor}/`);

      default: return null;
    }
  };

  return (
    <NotifWrapper
      className={`alert border d-block w-100 text-center`}
    >
      <span
        onClick={handleClick}
        className="text-decoration-none text-light pr-2"
        style={{ cursor: "pointer" }}
      >
        {notif.body}
      </span>

      <div>
        <small>
          on {moment(notif.createdAt).format("DD.MM, YYYY.")}
        </small>
      </div>

      {/* Extra actions */}
      <NotifActions notif={notif} />
    </NotifWrapper>
  );
};

const NotifActions = ({ notif }: { notif: NotificationType }) => {
  const user = useAuthStore(s => s.user);
  const { acceptFriendRequest, rejectFriendRequest } = useFriendRequestSocket(user.id)
  const { accept, reject } = useGroupMutations(notif.entityId);
  const handleAccept = () => {
    if (notif.type === 'friendrequest') acceptFriendRequest(notif.entityId);
    if (notif.type === 'group_invite') accept.mutate(user.id);
  }
  const handleReject = () => {
    if (notif.type === 'friendrequest') rejectFriendRequest(notif.entityId);
    if (notif.type === 'group_invite') reject.mutate(user.id);
  }
  if (notif.type === "friendrequest" || notif.type === 'group_invite')
    return (
      <div className="d-flex justify-content-center mt-2" style={{ gap: "1rem" }}>
        <button className="btn btn-success btn-sm" onClick={handleAccept}>
          <i className="fas fa-check" />
        </button>
        <button className="btn btn-danger btn-sm" onClick={handleReject}>
          <i className="fas fa-times" />
        </button>
      </div>
    );
  return null;
};