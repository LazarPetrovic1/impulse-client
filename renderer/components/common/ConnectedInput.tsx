import { MentionsInput, Mention } from "react-mentions";
import { searchTags, searchUsers } from "../../features/posts/mentions"; 

const defaultStyles = {
  control: {
    backgroundColor: '#eee',
    fontWeight: 'normal',
    height: "100%",
  },
  input: {
    padding: "5px",
    bottom: 0,
    border: "none",
    outline: "none",
    color: "#111",
    backgroundColor: '#eee', // Ensure background color is #eee
  },

  '&multiLine': {
    control: {
      height: "100%",
      minHeight: "150px",
      fontSize: "inherit",
      backgroundColor: '#eee', // Ensure background color is #eee
    },
    highlighter: { 
      border: '1px solid transparent', 
      backgroundColor: '#eee', // Ensure background color is #eee
    },
    input: {
      color: "#111",
      backgroundColor: '#eee', // Ensure background color is #eee
    },
  },

  '&singleLine': {
    display: 'inline-block',
    width: "100%",
    height: "100%",

    highlighter: {
      border: '2px inset transparent',
      backgroundColor: '#eee', // Ensure background color is #eee
    },
    input: {
      bottom: 0,
      border: "none",
      color: "#111",
      backgroundColor: '#eee', // Ensure background color is #eee
    },
  },

  suggestions: {
    maxHeight: "250px",
    overflow: "auto",
    top: "1.2rem",
    list: {
      backgroundColor: '#eee', // Ensure background color is #eee
      border: '1px solid rgba(0,0,0,0.15)',
      color: "#111", // Ensure text color is #111
      fontSize: 16,
    },
    item: {
      padding: '5px 15px',
      borderBottom: '1px solid rgba(0,0,0,0.15)',
      color: "#111", // Ensure text color is #111
      backgroundColor: '#eee', // Ensure background color is #eee
      '&focused': { 
        backgroundColor: "rgba(82, 83, 80, 0.45)", 
        color: "white", 
      },
    },
  },
};

type Props = {
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  singleLine?: boolean;
};

export function ConnectedInput({ value, onChange, placeholder = "What's happening?", singleLine = false }: Props) {
  return (
    <MentionsInput
      value={value}
      onChange={(e) => onChange(e.target.value)}
      style={defaultStyles}
      placeholder={placeholder}
      singleLine={singleLine}
      onKeyDown={e => e.key === "Enter" ? e.stopPropagation() : null}
    >
      {/* @mentions */}
      <Mention
        trigger="@"
        data={searchUsers}
        markup="@[id:__id__ display:__display__]"
        displayTransform={(id, display) => `@${display}`}
      />

      {/* #hashtags */}
      <Mention
        trigger="#"
        data={searchTags}
        markup="#[__display__]"
        displayTransform={(display) => `#${display}`}
      />
    </MentionsInput>
  );
}