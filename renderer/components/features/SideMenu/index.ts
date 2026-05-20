import {
  chat as chatData,
  social as socialData,
  upgrade as upgradeData,
  forum as forumData,
  roles as rolesData,
  terminal as terminalData,
  socialBackup as groupData
} from '../../../assets/animations';

export const sideThreadsData = [
  {
    id: 1,
    href: "/issues",
    text: "sidenav.issues",
    data: forumData,
    w: 33,
    h: 30
  },
  {
    id: 2,
    href: "/social",
    text: "sidenav.social",
    data: socialData,
    w: 33,
    h: 30
  },
  {
    id: 3,
    href: "/chat",
    text: "sidenav.chat",
    data: chatData,
    w: 33,
    h: 30
  },
  {
    id: 4,
    href: "/groups",
    text: "sidenav.groups",
    data: groupData,
    w: 31,
    h: 30
  },
]

export const hasRoles = [
  {
    id: 5,
    href: "/roles",
    text: "sidenav.roles",
    data: rolesData,
    w: 30,
    h: 30
  },
  {
    id: 6,
    href: "/dev",
    text: "sidenav.terminal",
    data: terminalData,
    w: 30,
    h: 30
  },
]

export const isTrial = {
  id: 7,
  href: "/upgrade",
  text: "sidenav.upgrade",
  data: upgradeData,
  w: 30,
  h: 30
};

export * from './SideMenu'