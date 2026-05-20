import { useState } from "react";
import { ConnectedInput } from "../../common/ConnectedInput";
import { EllipsisIcon, FilePreview, MarkdownArea, Modal } from "../../common";
import { extractMentionsAndTags } from "../../../features/posts/mentions";
import { useAuthStore } from "../../../features/auth/store";
import { useCreateGroupPost } from "../../../features/groups";
import { useTranslation } from "react-i18next";

export function CreatePost({ groupId }: { groupId?: number }) {
  const [text, setText] = useState("");
  const [title, setTitle] = useState("");
  const [files, setFiles] = useState<File[]>([]);
  const [showModal, setShowModal] = useState(false);
  const [mode, setMode] = useState<"edit" | "preview">("edit");
  const { t } = useTranslation()
  const { user } = useAuthStore();
  const createPost = useCreateGroupPost(groupId);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files) return;
    setFiles(() => Array.from(e.target.files));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const { users, tags } = extractMentionsAndTags(text);
    const formData = new FormData();
    formData.append("description", text);
    formData.append("userId", user.id.toString());
    formData.append("name", title);
    formData.append("usersMentioned", JSON.stringify(users));
    formData.append("hashtags", JSON.stringify(tags));
    // ✅ inject groupId ONLY if present
    if (groupId) formData.append("groupId", groupId.toString());
    files.forEach((file) => formData.append("media", file));
    await createPost.mutate(formData);
    // reset state
    setText(() => "");
    setTitle(() => "");
    setFiles(() => []);
    setShowModal(() => false);
  };

  return (
    <>
      {/* Trigger */}
      <div className="form-group">
        <div className="position-relative">
          <EllipsisIcon width={50} height={30} />
          <input
            type="text"
            className="form-control"
            readOnly
            style={{ paddingLeft: "50px", cursor: "pointer" }}
            onClick={() => setShowModal(true)}
            placeholder={groupId ? t("postform.group") : t("postform.init")}
          />
        </div>
      </div>

      {/* Modal */}
      <Modal
        onClose={() => setShowModal(false)}
        show={showModal}
        title={groupId ? t("modals.grouppost") : t("modals.post")}
        provideOwnClosure
      >
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="title">{t("postform.title")}</label>
            <input
              className="form-control"
              placeholder="Title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              type="text"
              name="title"
              id="title"
            />
          </div>

          <div className="form-group">
            <div className="d-flex justify-content-between align-items-center mb-2">
              <span className="d-inline-block mb-2">{t("postform.desc")}</span>
              <div className="d-flex">
                <button
                  className="btn btn-primary"
                  onClick={() => setMode("edit")}
                  type="button"
                ><i className="fas fa-edit" /></button>
                <button
                  className="btn btn-secondary"
                  onClick={() => setMode("preview")}
                  type="button"
                ><i className="fas fa-eye" /></button>
              </div>
            </div>

            {mode === "edit" ?
              <ConnectedInput value={text} onChange={setText} /> : <MarkdownArea value={text} />}
          </div>

          {/* Files */}
          <div className="form-group">
            <label htmlFor="files">{t("postform.files")}</label>
            <input
              className="form-control"
              type="file"
              id="files"
              multiple
              onChange={handleFileChange}
            />
          </div>

          {/* Preview */}
          {files.length > 0 && (
            <div className="mb-2">{files.map((file, i) => <FilePreview key={i} file={file} />)}</div>
          )}

          <button type="submit" className="btn btn-primary btn-block mt-1">
            <i className="fas fa-paper-plane pr-2" /> {t("postform.post")}
          </button>
        </form>
      </Modal>
    </>
  );
}