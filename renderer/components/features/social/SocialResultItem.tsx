import Link from "next/link";
import { useTranslation } from "react-i18next";

export function SocialResultItem({ user }) {
  return (
    <div className="d-flex" style={{ maxHeight: "50px" }}>
      <img
        className="img-thumbnail rounded-circle"
        src={`https://robohash.org/${user.id}?set=set4`}
        alt={user.firstName}
        height={50}
        width={50}
      />

      <div className="ml-3">
        <Link href={`/profile/${user.id}`}>
          <div>{user.firstName} {user.lastName}</div>
        </Link>

        <div>
          <span className="d-inline-block pr-3">@{user.username}</span>
          <span>
            {user.sex === "m"
              ? <i className="fas fa-male" style={{ color: 'blue' }} />
              : user.sex === "f"
              ? <i className="fas fa-female" style={{ color: 'pink' }} />
              : <i className="fas fa-question" />}
          </span>
        </div>

        {user.profile?.employment && (
          <div>{user.profile.employment}</div>
        )}
      </div>
    </div>
  );
}