import { useTranslation } from "react-i18next";
import { useAuthStore } from "../../../features/auth/store";
import { useGroupMembers, useGroupMutations, useGroupUI } from "../../../features/groups";
import { Modal } from "../../common";

export function MembersModal({ groupId }: { groupId: number }) {
  const { showMembers, closeMembers } = useGroupUI();
  const { data: allMembers } = useGroupMembers(groupId);
  const { kick, promote } = useGroupMutations(groupId);
  const userId = useAuthStore(s => s.user?.id);
  const members = allMembers.filter(m => m.status === "active");
  const { t } = useTranslation()
  return (
    <Modal show={showMembers} onClose={closeMembers} title="Members">
      {members?.map((m) => (
        <div key={m.user.id} className="d-flex justify-content-between py-2">
          <span>
            {m.user.firstName} {m.user.lastName}
            <small> ({m.role})</small>
          </span>

          {m.role !== "creator" && m.user.id !== userId && (
            <div>
              <button className="btn btn-secondary mr-1" onClick={() => promote.mutate({ targetUserId: m.user.id })}>
                <i className="fas fa-angle-double-up pr-2" />{t("groups.promote")}
              </button>
              <button className="btn btn-danger ml-1" onClick={() => kick.mutate(m.user.id)}>
                <i className="fas fa-ban pr-2" />{t("groups.kick")}
              </button>
            </div>
          )}
        </div>
      ))}
    </Modal>
  );
}