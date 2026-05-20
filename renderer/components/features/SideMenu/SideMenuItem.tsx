import { useRef } from "react";
import Link from "next/link";
import { SideMenuItemContextMenu } from "./SideMenuItemContextMenu";
import { LottieAnim } from '../../common'
import { useTranslation } from "react-i18next";

interface Props {
  id: number;
  href: string;
  text: string;
  data?: any;
  w?: number;
  h?: number;
}

export function SideMenuItem({ id, href, text, data, w, h }: Props) {
  const outerRef = useRef<HTMLLIElement>(null);
  const mainClasses = "nav-item bg-light m-1 text-center";
  const { t } = useTranslation()

  return (
    <>
      <li className={mainClasses} ref={outerRef}>
        <Link href={href}>
          <div className="nav-link lead text-primary">
            <LottieAnim text={t(text)} width={w} height={h} data={data} isSidenav />
          </div>
        </Link>
      </li>
      <SideMenuItemContextMenu id={id} outerRef={outerRef} href={href} />
    </>
  );
}