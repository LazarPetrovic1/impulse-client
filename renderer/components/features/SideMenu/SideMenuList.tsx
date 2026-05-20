import { useSideMenuStore } from "../../../features/homepage/store";
import { SideMenuItem } from "./SideMenuItem";

export function SideMenuList() {
  const { sideMenuData } = useSideMenuStore();

  return (
    <>
      {sideMenuData.map((item) => (
        <SideMenuItem key={item.id} {...item} />
      ))}
    </>
  );
}