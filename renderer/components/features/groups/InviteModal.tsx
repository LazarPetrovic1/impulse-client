import { useState } from "react";
import { useGroupMutations, useGroupUI } from "../../../features/groups";
import { Modal } from "../../common";
import { UserPicker } from "./UserPicker";
import { useTranslation } from "react-i18next";

export function InviteModal({ groupId }: { groupId: number }) {
  const { showInvite, closeInvite } = useGroupUI();
  const { invite } = useGroupMutations(groupId);
  const [selected, setSelected] = useState<number[]>([]);
  const submitInvites = () => { invite.mutate(selected); closeInvite(); }
  const { t } = useTranslation()
  return (
    <Modal show={showInvite} onClose={closeInvite} title={t("modals.invite")}>
      <>
        <UserPicker onChange={setSelected} />
        <button className="btn btn-primary" onClick={submitInvites}>{t("groups.invite")}</button>
      </>
    </Modal>
  );
}