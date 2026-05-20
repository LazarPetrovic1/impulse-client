import { useSideMenuStore } from "../../../features/homepage/store";

export function SideMenuOptionItem({ item, type }) {
  const removeItem = useSideMenuStore((s) => s.removeItem);
  const addItem = useSideMenuStore((s) => s.addItem);
  if (!item) return null;
  const isActive = type === "success";
  const btnClass = isActive ? "danger" : "success";
  const iconClass = isActive ? "times" : "undo-alt";
  const btnTitle = isActive ? "Remove" : "Restore";

  const onClick = () => {
    if (isActive) removeItem(item.id);
    else addItem(item);
  };

  return (
    <div
      className={`d-flex justify-content-between align-items-center alert alert-${type}`}
    >
      <div style={{ textTransform: "capitalize", color: "black" }}>
        {item.href.slice(1).split("-")[0]}
      </div>

      <button
        onClick={onClick}
        type="button"
        title={btnTitle}
        className={`btn btn-${btnClass}`}
      >
        <i className={`fas fa-${iconClass}`} />
      </button>
    </div>
  );
}