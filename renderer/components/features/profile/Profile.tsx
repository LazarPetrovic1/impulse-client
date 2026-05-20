import { useRouter } from 'next/router';
import { useEffect, useMemo, useState } from 'react';
import { useFriendRequestSocket, useFriendRequestStore } from '../../../features/friend';
import { SexType, useAuthStore, User } from '../../../features/auth/store';
import { getUserById } from '../../../features/profile/api';
import { CenteredLayout } from '../../layout';
import { MarkdownArea, Spinner } from '../../common';
import { useMyPosts } from '../../../features/posts';
import { Post } from '../posts';
import { useTranslation } from 'react-i18next';

function SexIcon({ sex }: { sex: SexType }) {
  if (sex === "m") return <i className="fas fa-male" style={{ color: 'blue' }} />;
  if (sex === "f") return <i className="fas fa-female" style={{ color: 'pink' }} />;
  if (sex === "n/a") return <i className="fas fa-question" />;
  return null;
}

export function Profile() {
  const router = useRouter();
  const user = useAuthStore(s => s.user);
  const userId = user.id;
  const [otherProfile, setOtherProfile] = useState<User | null>(() => null)
  const [alreadyProcessed, setAlreadyProcessed] = useState<boolean>(() => false)
  // 👇 extract profile id from route (/profile or /profile/[id])
  const profileId = useMemo(() => {
    if (!router.query.id) return null;
    return Number(router.query.id);
  }, [router.query.id]);
  const { data: posts, isLoading } = useMyPosts();
  const { t } = useTranslation();
  const { sendFriendRequest, getSentRequests } = useFriendRequestSocket(userId);
  const outgoing = useFriendRequestStore((s) => s.outgoing);
  const friends = useFriendRequestStore((s) => s.friends);
  const isOwnProfile = !profileId || profileId === userId;
  const alreadySent = profileId ? outgoing[profileId] : false;
  const isFriend = !!(friends[parseInt(router.query.id as string)])
  
  const handleSend = () => {
    if (!profileId || !userId) return;
    sendFriendRequest(profileId);
  };
  
  useEffect(() => {
    if (isOwnProfile) return;
    (async function() {
      const otherUser = await getUserById(profileId); // set other user
      setOtherProfile(() => otherUser);
      const req = await getSentRequests(otherUser.id);
      setAlreadyProcessed(() => !!(req && req.id))
    })()
  }, [router.query.id])
  if ((!isOwnProfile && !otherProfile) || isLoading) return <Spinner />; // assume loading state

  return (
    <CenteredLayout>
      {(!isOwnProfile && otherProfile) ? (
        <div role="main" className="my-3 d-flex">
          <img
            src={`https://robohash.org/${otherProfile?.id || 1}?set=set4&size=22x22`}
            width={32}
            height={32}
            className="rounded-circle"
            alt={`${otherProfile?.username}'s avatar`}
          />
          <h2 className="ml-4">
            <div className="text-primary pointer">
              {otherProfile?.firstName} {otherProfile?.lastName}
            </div>
          </h2>
        </div>
      ) : (
        <div role="main" className="my-3 d-flex">
          <img
            src={`https://robohash.org/${user?.id || 1}?set=set4&size=22x22`}
            width={32}
            height={32}
            className="rounded-circle"
            alt={`${user?.username}'s avatar`}
          />
          <h2 className="ml-4">
            <div className="text-primary pointer">{user?.firstName} {user?.lastName}</div>
          </h2>
        </div>
      )}
      <h2 className="text-secondary mt-0 mb-3">
        <span className="d-inline-block mr-3">@{isOwnProfile ? user.username : otherProfile.username}</span>
        {isOwnProfile ? <SexIcon sex={user.sex} /> : <SexIcon sex={otherProfile.sex} />}
      </h2>
      <MarkdownArea value={isOwnProfile ? user.bio : otherProfile.bio} />
      {/* 👇 Own profile */}
      {/* {isOwnProfile && <p>This is your profile</p>} */}
      {/* 👇 Other user's profile */}
      {(!isOwnProfile && !!profileId) && !isFriend && (
        <div>
          <button
            // style={{ cursor: alreadySent || alreadyProcessed ? "not-allowed" : "pointer" }}
            style={{ cursor: alreadyProcessed ? "not-allowed" : "pointer" }}
            className='btn btn-primary'
            onClick={handleSend}
            disabled={alreadyProcessed}
            // disabled={alreadySent || alreadyProcessed}
          >
            {/* {(alreadySent || alreadyProcessed) ? 'Request Sent' : 'Add Friend'} */}
            {alreadyProcessed ? t("profile.reqsent") : t("profile.addfr")}
          </button>
        </div>
      )}
      <div className="text-primary pointer">{posts?.map(p => <Post key={p.id} post={p} />)}</div>
    </CenteredLayout>
  );
}