import Link from "next/link";
import { GroupSearchResult, useGroupMutations } from "../../../features/groups";
import { useState } from "react";
import { useTranslation } from "react-i18next";

export function GroupResultItem({ group }: { group: GroupSearchResult }) {
  const { join } = useGroupMutations(group.id);
  const [disabled, setDisabled] = useState<boolean>(() => false);
  const { t } = useTranslation()
  const joinGroup = () => {
    try {
      join.mutate()
      setDisabled(() => true);
    } catch (e) {
      console.warn(`Error caught: ${e.name}, ${e.message}`);
      setDisabled(() => false);
    }
  }
  const renderAction = () => {
    switch (group.membershipStatus) {
      case "active": return <span className="text-success">{t("groups.member")}</span>;
      case "invited": return <button className="btn btn-primary btn-sm">{t("groups.accinv")}</button>;
      case "pending": return <span className="text-warning">{t("groups.pend")}</span>;
      case null:
        return group.requiresApproval ? 
          <button disabled={disabled} className="btn btn-secondary btn-sm" onClick={joinGroup}>{t("groups.reqjoin")}</button> :
          <button disabled={disabled} className="btn btn-primary btn-sm" onClick={joinGroup}>{t("groups.join")}</button>;
      default: return null;
    }
  };

  return (
    <div className="d-flex justify-content-between align-items-center p-2">
      <div className="d-flex align-items-center">
        <img
          src={`http://localhost:4500${group.groupImage}`}
          width={40}
          height={40}
          style={{ borderRadius: "50%", marginRight: 10 }}
        />
        <div>
          <div><Link href={`/groups/${group.id}`}>{group.name}</Link></div>
          <small>{group.membersCount} {t("groups.memlen")}</small>
        </div>
      </div>

      {renderAction()}
    </div>
  );
}