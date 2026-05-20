import styled from "styled-components";

type Props = { file: File; };

const FileWrapper = styled.div`
  width: 100px;
  height: 100px;
  display: flex;
  align-items: center;
  justify-content: center;
  border: 1px solid #ccc;
  font-size: 12px;
  text-align: center;
  padding: 4;
`

export function FilePreview({ file }: Props) {
  const url = URL.createObjectURL(file);
  const type = file.type;

  if (type.startsWith("image/"))
    return <img src={url} alt={file.name} style={{ width: 80, height: 80, objectFit: "cover" }} />;

  if (type.startsWith("video/"))
    return <video src={url} width={120} height={80} controls style={{ objectFit: "cover" }} />;

  if (type.startsWith("audio/")) {
    return (
      <audio controls style={{ width: 120 }}>
        <source src={url} type={type} />
      </audio>
    );
  }

  return <FileWrapper>{file.name}</FileWrapper>;
}