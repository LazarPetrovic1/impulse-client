import styled from "styled-components";
import { useAlertStore } from "../../features/alerts";

const Wrapper = styled.div`
  position: fixed;
  bottom: 16px;
  left: 16px;
  z-index: 9999;
  width: 320px;
  display: flex;
  flex-direction: column-reverse;
  gap: 8px;
`;

const Item = styled.div<{ type?: string }>`
  background: #1a1a1a;
  border-left: 4px solid
    ${({ type }) =>
      type === "error" ? "#ff4d4f" :
      type === "success" ? "#52c41a" :
      "#2d6cdf"};
  color: #eee;
  padding: 10px 12px;
  border-radius: 6px;
  cursor: pointer;
`;

export const AlertContainer = () => {
  const { alerts, removeAlert, clear } = useAlertStore();

  if (!alerts.length) return null;

  return (
    <Wrapper>
      <button onClick={clear}>Clear</button>

      {alerts.map((a) => (
        <Item key={a.id} type={a.type} onClick={() => removeAlert(a.id)}>
          {a.message}
        </Item>
      ))}
    </Wrapper>
  );
};