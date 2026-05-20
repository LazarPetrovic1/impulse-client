import { useAuthStore } from "../../auth/store";
import { useProfileStore } from "..";
import { useEffect } from "react";

export const useProfile = () => {
  const { profile, loading, fetchProfile, updateField } = useProfileStore();
  const user = useAuthStore((s) => s.user);

  useEffect(() => {
    if (user?.id) fetchProfile(user.id);
  }, [user?.id]);

  return { profile, loading, user, updateField };
};