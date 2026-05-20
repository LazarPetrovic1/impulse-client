import { useState } from "react";
import { useUsers } from "../../../features/groups";
import styled from "styled-components";
import { Theme } from "../../../styles/theme/type";
import { useTranslation } from "react-i18next";

const UserContainer = styled.div.attrs(() => ({ className: 'd-flex justify-content-between align-items-center p-1' }))`
  background: ${({ theme } : { theme: Theme }) => theme.colors.hover};
`;

export function UserPicker({ onChange }: { onChange: (ids: number[]) => void }) {
  const [query, setQuery] = useState("");
  const [selected, setSelected] = useState<number[]>([]);
  const { data: users } = useUsers(query);
  const { t } = useTranslation()
  const toggle = (id: number) => {
    let updated;
    if (selected.includes(id)) updated = selected.filter((i) => i !== id);
    else updated = [...selected, id];
    setSelected(updated);
    onChange(updated);
  };

  return (
    <div>
      <input
        className="form-control mb-2"
        placeholder={t("modals.userseek")}
        value={query}
        onChange={(e) => setQuery(e.target.value)}
      />
      <div style={{ maxHeight: 200, overflowY: "auto" }}>
        {users?.map((user) => (
          <UserContainer
            key={user.id}
            className="d-flex justify-content-between align-items-center p-1"
          >
            <span>{user.firstName} {user.lastName}</span>
            <input type="checkbox" checked={selected.includes(user.id)} onChange={() => toggle(user.id)} />
          </UserContainer>
        ))}
      </div>
    </div>
  );
}