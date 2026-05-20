import { Fragment } from "react";
import { useTranslation } from "react-i18next";
import styled from "styled-components";

const AuthPassword = styled.i`
  color: black !important;
  position: absolute;
  top: 6px;
  right: 30px;
  padding: 5px;
  cursor: pointer;
`;

export function Step2({
  data,
  onChange,
  viewPass,
  setViewPass,
  viewPass2,
  setViewPass2,
  onProgressChange,
}: {
  data: { username: string; password: string; password2: string };
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  viewPass: boolean;
  setViewPass: (val: boolean) => void;
  viewPass2: boolean;
  setViewPass2: (val: boolean) => void;
  onProgressChange: (arr: string[]) => void;
}) {
  const { t } = useTranslation();
  const proceedToStepThree = () => {
    onProgressChange([data.username, data.password, data.password2]);
  };

  return (
    <Fragment>
      <h2 className="mb-2 text-center">{t('register.title2')}</h2>
      <label htmlFor="username">{t('register.uname')}</label>
      <input
        type="text"
        name="username"
        value={data.username}
        onChange={onChange}
        placeholder={t('register.uname')}
        className={data.username.length > 2 ? "form-control is-valid" : "form-control is-invalid"}
      />

      <label htmlFor="password">{t('register.pass')}</label>
      <div className="position-relative">
        <input
          type={viewPass ? "text" : "password"}
          name="password"
          value={data.password}
          onChange={onChange}
          placeholder={t('register.pass')}
          className={data.password.length >= 6 ? "form-control is-valid" : "form-control is-invalid"}
        />
        <AuthPassword
          className={`fas ${viewPass ? "fa-eye-slash" : "fa-eye"}`}
          onClick={() => setViewPass(!viewPass)}
        />
      </div>

      <label htmlFor="password2">{t('register.pass2')}</label>
      <div className="position-relative">
        <input
          type={viewPass2 ? "text" : "password"}
          name="password2"
          value={data.password2}
          onChange={onChange}
          placeholder={t('register.pass2')}
          className={
            data.password2.length >= 6 && data.password2 === data.password
              ? "form-control is-valid"
              : "form-control is-invalid"
          }
        />
        <AuthPassword
          className={`fas ${viewPass2 ? "fa-eye-slash" : "fa-eye"}`}
          onClick={() => setViewPass2(!viewPass2)}
        />
      </div>

      <div className="d-flex justify-content-end mt-3">
        <button className="btn btn-secondary" type="button" onClick={proceedToStepThree}>
          {t('register.next')} <i className="pl-2 fas fa-arrow-right" />
        </button>
      </div>
    </Fragment>
  );
}