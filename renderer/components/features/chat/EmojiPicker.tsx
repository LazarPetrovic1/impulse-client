import styled from "styled-components";
import EmojiPicker from "emoji-picker-react";

const PickerWrapper = styled.div`
  position: absolute;
  bottom: 40px;
  right: 0;
  z-index: 9999;
`;

export const EmojiPickerPopover = ({ onSelect }: { onSelect: (emoji: string) => void; }) => {
  return (
    <PickerWrapper>
      <EmojiPicker
        onEmojiClick={(e) => onSelect(e.emoji)}
      />
    </PickerWrapper>
  );
};