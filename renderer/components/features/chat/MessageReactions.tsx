import styled from "styled-components";

const ReactionsRow = styled.div`
  display: flex;
  gap: 6px;
  margin-top: 4px;
`;

const ReactionBubble = styled.div`
  background: ${({ theme }) => theme.colors.background};
  border-radius: 12px;
  padding: 2px 6px;
  font-size: 12px;
  cursor: pointer;

  &:hover {
    background: ${({ theme }) => theme.colors.hover};
  }
`;

type Props = { grouped: Record<string, number[]>; react: (emoji: string) => void }
export const MessageReactions = ({ grouped, react }: Props) => {
  return (
    <ReactionsRow>
      {Object.entries(grouped).map(([emoji, users]) => (
        <ReactionBubble onClick={() => react(emoji)} key={emoji} title={`Users: ${users.join(", ")}`}>
          {emoji} {users.length}
        </ReactionBubble>
      ))}
    </ReactionsRow>
  );
};