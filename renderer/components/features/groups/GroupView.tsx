import styled from "styled-components";
import { useGroup, useGroupMembers, useGroupUI } from "../../../features/groups";
import { Spinner } from "../../common";
import { InviteModal } from "./InviteModal";
import { MembersModal } from "./MembersModal";
import { useRouter } from "next/navigation";
import { useAuthStore } from "../../../features/auth/store";
import { useTranslation } from "react-i18next";

const Img = styled.img`
  max-width: 100%;
  border-radius: 8px;
  max-height: 200px;
  object-fit: cover;
`

const Card = styled.article`
  width: fit-content;
  margin-top: 0.5rem;
`;

const GroupImage = styled(Img)`
  display: block;
  width: 200px;
  height: 200px;
  object-fit: cover;
  cursor: pointer;
`;

const Title = styled.h1`
  max-width: 200px;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  cursor: pointer;
`;

export function GroupView({ groupId }: { groupId: number }) {
  const userId = useAuthStore(s => s.user?.id);
  const { data: group, isLoading } = useGroup(groupId);
  const { data: members, isLoading: membersLoading } = useGroupMembers(groupId);
  const { t } = useTranslation()
  const { openMembers, openInvite } = useGroupUI();
  const router = useRouter();
  const reroute = () => router.push(`/groups/${groupId}`)
  if (isLoading || membersLoading) return <Spinner />;
  const isAdmin = members.find(m => m.user.id === userId && (m.role === "creator" || m.role === "admin"));

  return (
    <Card>
      <GroupImage
        src={`http://localhost:4500${group.groupImage}`}
        alt={group.name}
        onClick={reroute}
      />

      <Title onClick={reroute}>{group.name}</Title>

      <div className="d-flex gap-2 justify-content-between">
        <button onClick={openMembers} className="btn btn-primary">
          {members?.filter(m => m.status === "active")?.length} {t("groups.memlen")}
        </button>
        {isAdmin && (
          <button onClick={openInvite} className="btn btn-secondary">
            <i className="fas fa-user-plus" />
          </button>
        )}
      </div>

      <MembersModal groupId={groupId} />
      <InviteModal groupId={groupId} />
    </Card>
  );
}