import { useTranslation } from "react-i18next";
import { useAuthStore } from "../../features/auth/store";
import styled from "styled-components";
import { LogoBroken2PNG as brokenLogo } from "../../assets";
import Link from "next/link";

const BrokenLogo = styled.img.attrs(() => ({
  alt: "It's broken!",
  title: "It's broken!",
  src: brokenLogo.src,
}))`
  user-select: none;
`;

const NotFoundContainer = styled.div`
  height: 100%;
  border: 2px solid ${({ theme }) => theme.colors.accent};
  padding: 1rem 1.5rem 1.5rem 1.5rem;
  border-radius: 1rem;
  pointer-events: all;
  & img { user-select: none; }
`

export function NotFoundPage() {
  const { t } = useTranslation();
  const { isAuthenticated } = useAuthStore();
  return (
    <div className="d-flex justify-content-center align-items-center" style={{ width: "100%" }}>
      <NotFoundContainer className="container">
        <h1 className="display-4 text-primary text-center">
          {t("notfound.oops1")}
        </h1>
        <div>
          <div className="text-center p-3 pb-4">
            <BrokenLogo height="100px" />
          </div>
          {/*<RickRoll />*/}
          <p className="lead text-secondary text-center">{t("notfound.oops2")}</p>
          <p className="lead text-info text-center mb-3">{t("notfound.prompt")}</p>
          <Link href={isAuthenticated ? "/" : "/login"}>
            <button className="btn btn-block btn-lg btn-outline-primary">{t("notfound.goback")}</button>
          </Link>

          <h3 className="mt-4 text-center" style={{ fontSize: "1.5vw" }}>
            {t("notfound.solution1")} <Link href="/chat">{t("notfound.chat")}</Link>,{" "}
            <Link href="/issues">{t("notfound.issue")}</Link> or{" "}
            <Link href="/">{t("notfound.home")}</Link>.
          </h3>
        </div>
      </NotFoundContainer>
    </div>
  );
}