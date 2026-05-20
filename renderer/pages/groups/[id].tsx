// pages/groups/[id].tsx

import { useRouter } from "next/router";
import { AuthRoute } from "../../components/auth";
import { GroupPage } from "../../components/features/groups";

export default function Group() {
  const router = useRouter();
  const { id } = router.query;
  if (!id) return null;

  return (
    <AuthRoute>
      <div style={{ overflowY: "auto", width: "100%" }}>
        <GroupPage groupId={Number(id)} />
      </div>
    </AuthRoute>
  );
}