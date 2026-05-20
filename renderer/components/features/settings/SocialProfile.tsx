import { useEffect } from "react";
import Link from "next/link";
import styled from "styled-components";
import { LogoShortSVG as ShortLogo } from "../../../assets";
import { useProfileStore } from "../../../features/profile";
import { useAuthStore } from "../../../features/auth/store";
import { EditIcon, Spinner } from "../../common";
import { Theme } from "../../../styles/theme/type";
import Image from "next/image";
import { useTranslation } from "react-i18next";

const Container = styled.article`
  pointer-events: all;
  padding: 1rem;
  color: ${({ theme } : { theme: Theme }) => theme.colors.textPrimary};
`;

const List = styled.ul`
  list-style: none;
  padding: 0;
  margin-top: 1rem;
`;

const Item = styled.li`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.75rem;
  border-bottom: 1px solid ${({ theme } : { theme: Theme }) => theme.colors.border};
  a { color: ${({ theme } : { theme: Theme }) => theme.colors.textPrimary}; }
`;

const Actions = styled.div`
  display: flex;
  justify-content: flex-end;
  margin-top: 1rem;
`;

const EditButton = styled.button`
  background: ${({ theme } : { theme: Theme }) => theme.colors.background};
  border: none;
  cursor: pointer;
`;

const EmptyState = styled.div`
  width: 80%;
  margin: auto;
  text-align: center;
`;

const CreateButton = styled.button`
  margin-top: 1rem;
  background: ${({ theme } : { theme: Theme }) => theme.colors.background};
  color: ${({ theme } : { theme: Theme }) => theme.colors.textPrimary};
  border: none;
  padding: 0.75rem 1.25rem;
  cursor: pointer;
`;

export function SocialProfile() {
  const user = useAuthStore((s) => s.user);
  const { profile, loading, fetchProfile } = useProfileStore();
  const { t } = useTranslation();
  useEffect(() => { if (user?.id) fetchProfile(user.id); }, [user?.id]);
  if (loading) return <Spinner />;

  if (!profile) {
    return (
      <EmptyState>
        <h1>No profile found</h1>
        <Link href="/social/create-social-profile">
          <CreateButton>{t("premature404.profile")}</CreateButton>
        </Link>
      </EmptyState>
    );
  }

  return (
    <Container>
      <h1 className="text-primary text-center display-4">{t("profile.welcome")}, {user?.firstName}</h1>

      <List>
        <Item>
          <Image src={ShortLogo} height={20} width={20} alt={`${t("profile.welcome")}, ${user?.firstName}`} />
          <Link href={`/social/profile/${user?.id}/`}>
            https://impul.se/social/profile/{user?.id}
          </Link>
        </Item>

        {profile.employment && profile.employment !== "None" && (
          <Item>
            <i className="fas fa-briefcase" />
            {t("profile.worksat")} {profile.employment}
          </Item>
        )}

        {profile.website && profile.website !== "None" && (
          <Item>
            <i className="fas fa-globe" />
            <a href={profile.website} target="_blank" rel="noopener noreferrer">
              <i className="fas fa-globe" />
            </a>
          </Item>
        )}

        {profile.social?.youtube && (
          <Item>
            <i className="fab fa-youtube" />
            <a href={profile.social.youtube} target="_blank">YouTube</a>
          </Item>
        )}

        {profile.social?.twitter && (
          <Item>
            <i className="fab fa-twitter" />
            <a href={profile.social.twitter} target="_blank"><i className="fab fa-twitter" /></a>
          </Item>
        )}

        {profile.social?.facebook && (
          <Item>
            <i className="fab fa-facebook" />
            <a href={profile.social.facebook} target="_blank"><i className="fab fa-facebook"></i></a>
          </Item>
        )}

        {profile.social?.instagram && (
          <Item>
            <i className="fab fa-instagram" />
            <a href={profile.social.instagram} target="_blank"><i className="fab fa-instagram"></i></a>
          </Item>
        )}

        {profile.social?.linkedin && (
          <Item>
            <i className="fab fa-linkedin" />
            <a href={profile.social.linkedin} target="_blank"><i className="fab fa-linkedin"></i></a>
          </Item>
        )}
      </List>

      <Actions>
        <Link href="/social/create-social-profile">
          <EditButton>
            <EditIcon width={42} height={36} />
          </EditButton>
        </Link>
      </Actions>
    </Container>
  );
}