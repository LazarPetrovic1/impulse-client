import { useEffect, useState } from "react";
import { useSideMenuStore } from "../../../features/homepage/store";
import { ThreeColumnLayout } from "../../layout";
import { hasRoles, SideMenu, sideThreadsData } from "../SideMenu";
import { LanguageSwitcher } from "../i18n";
import { ThemeSwitcher } from "../themes";
import { FontSizeSwitcher, FontSwitcher } from "../font";
import { CreatePost, PostList } from "../posts";
import styled from "styled-components";
import Link from "next/link";
import { useAuthStore } from "../../../features/auth/store";
import { LottieAnim } from "../../common";
import { socialBackup as creategroup } from "../../../assets/animations";
import { getUsersGroups } from "../../../features/groups";
import { useTranslation } from "react-i18next";
import { CreateGroupModal, GroupView } from "../groups";

export const MainContentContainer = styled.section`
  display: grid;
  grid-template-columns: 140px auto 250px;
  padding-right: 1rem;
`;

export const MainContentContainerSideless = styled.section`
  display: grid;
  grid-template-columns: auto 250px;
  padding-right: 1rem;
`;

export const MainContentsInitial = styled.div`
  margin: 0 0.5rem 0 0.75rem;
  & [role="main"] {
    display: flex;
    width: 100% !important;
    flex: 1;
  }
`;

export function HomePage() {
  const { setInitialData } = useSideMenuStore.getState();
  const [showModal, setShowModal] = useState<boolean>(() => false);
  const { t } = useTranslation()
  const { user } = useAuthStore();
  const [groupIds, setGroupIds] = useState<number[]>(() => []);
  useEffect(() => {
    if (user.userRole === "USER") setInitialData(sideThreadsData);
    else setInitialData([...sideThreadsData, ...hasRoles]);
  }, [user.userRole]);
  useEffect(() => {
    (async function() {
      try {
        const usersGroups = await getUsersGroups();
        const filtered = usersGroups.filter(group => group.members?.some((member: any) => (member.user === user.id || member.user?.id === user.id) && member.status === "active"));
        const ids = filtered.map(g => g.id)
        setGroupIds(() => ids);
      } catch (e) {
        console.warn(`Error in HomePage while getting user's groups: ${e.name}; ${e.message}`);
      }
    })()
  }, []);
  return (
    <ThreeColumnLayout
        left={<SideMenu />}
        right={
          <div className="d-flex flex-wrap">
            <LanguageSwitcher /><br />
            <ThemeSwitcher /><br />
            <FontSwitcher /><br />
            <FontSizeSwitcher />
          </div>
        }
        center={
          <MainContentsInitial>
            <div role="main" className="my-3 d-flex">
              <img
                src={`https://robohash.org/${user?.id || 1}?set=set4&size=22x22`}
                width={32}
                height={32}
                className="rounded-circle"
                alt={`${user?.username}'s avatar`}
              />
              <h2 className="ml-4">
                <Link href={`/profile`}>
                  <div className="text-primary pointer">
                    {user?.firstName} {user?.lastName}
                  </div>
                </Link>
              </h2>
            </div>
            <CreatePost />
            <button onClick={() => setShowModal(() => true)} className="btn btn-primary btn-block">
              <LottieAnim width={50} height={30} data={creategroup} />
              <span>{t("groups.create")}</span>
            </button>
            <CreateGroupModal
              show={showModal}
              onClose={() => setShowModal(() => false)}
              onSuccess={(val) => setGroupIds((prev) => [...prev, val.data.id])}
            />
            <div className="d-flex" style={{ overflowX: "auto", gap: "0.5rem", maxWidth: "100%" }}>
              {groupIds.map((gid: number) => <GroupView groupId={gid} key={gid} />)}
            </div>
            <PostList />
          </MainContentsInitial>
        }
      />
  )
}