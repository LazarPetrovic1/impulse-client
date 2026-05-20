import styled from "styled-components";
import { Spinner } from "../../common";
import { useGroup, useGroupMembers, useGroupMutations, useGroupPosts, useGroupUI } from "../../../features/groups";
import { CenteredLayout } from "../../layout";
import { MembersModal } from "./MembersModal";
import { InviteModal } from "./InviteModal";
import { CreatePost, Post } from "../../features/posts";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { useAuthStore } from "../../../features/auth/store";
import { useTranslation } from "react-i18next";

const Header = styled.div`display: flex; flex-direction: column; gap: 1.5rem; align-items: center;`;
const GroupImage = styled.img`width: 100%; height: 120px; border-radius: 12px; object-fit: cover;`;
const Title = styled.h1`margin: 0;`;
const Meta = styled.div`color: #666; font-size: 0.9rem;`;
const Content = styled.div`margin-top: 2rem;`;

export function GroupPage({ groupId }: { groupId: number }) {
  const router = useRouter();
  const userId = useAuthStore(s => s.user?.id);
  const { data: posts, isLoading: postsLoading } = useGroupPosts(groupId);
  const { data: group, isLoading } = useGroup(groupId);
  const { data: allMembers, isLoading: membersLoading } = useGroupMembers(groupId);
  const { openInvite, openMembers } = useGroupUI();
  const { leave } = useGroupMutations(groupId);
  const { t } = useTranslation()
  const leaveGroup = async () => {
    await leave.mutate();
    router.push("/");
  }
  const members = (allMembers || !membersLoading) ? allMembers?.filter(m => m.status === "active") : [];
  useEffect(() => {
    if (membersLoading || !userId) return;
    let exists: boolean;
    if (Array.isArray(members) && members.length > 0) exists = members.some(member => member.user.id === userId);
    else exists = false;
    if (!exists) router.push("/");
  }, [userId])
  if (isLoading) return <Spinner />;
  if (!group) return <p>{t("premature404.group")}</p>;
  return (
    <CenteredLayout>
      {/* HEADER */}
      <Header>
        <GroupImage
          src={`http://localhost:4500${group.groupImage}`}
          alt={group.name}
        />
        <div>
          <Title>{group.name}</Title>
          <Meta>{members.filter(m => m.status === "active")?.length || 0} {t("groups.memlen")}</Meta>
        </div>
        <div style={{ width: "100%" }} className="d-flex justify-content-between">
          <button onClick={openMembers} className="btn btn-primary">
            <i className="fas fa-search pr-2" /> {t("groups.viewmems")}
          </button>
          <button onClick={openInvite} className="btn btn-secondary">
            <i className="fas fa-plus pr-2" /> {t("groups.invite")}
          </button>
          <button className="btn btn-danger" onClick={() => leaveGroup()}>{t("groups.leavegroup")}</button>
        </div>
        <MembersModal groupId={groupId} />
        <InviteModal groupId={groupId} />
      </Header>
      <div className="mt-2"><CreatePost groupId={groupId} /></div>

      {/* MAIN CONTENT */}
      <Content>{postsLoading ? <Spinner /> : posts?.map(p => <Post key={p.id} post={p} />)}</Content>
    </CenteredLayout>
  );
}