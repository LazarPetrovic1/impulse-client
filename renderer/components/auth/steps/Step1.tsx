import { Fragment } from "react";
import { useTranslation } from "react-i18next";

const sexChoice = {
  m: "Male",
  f: "Female",
  "n/a": "I don't wish to specify"
}

export function Step1({
  data,
  onChange,
  onProgressChange,
}: {
  data: { firstName: string; lastName: string; email: string; sex: string };
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onProgressChange: (arr: string[]) => void;
}) {
  const { t } = useTranslation();
  const proceedToStepTwo = () => {
    onProgressChange([data.firstName, data.lastName, data.email, data.sex]);
  };

  return (
    <Fragment>
      <h2 className="mb-2 text-center">{t('register.title1')}</h2>
      <label htmlFor="firstName">{t('register.fname')}</label>
      <input
        type="text"
        onChange={onChange}
        name="firstName"
        value={data.firstName}
        className={data.firstName ? "form-control is-valid" : "form-control is-invalid"}
        placeholder={t('register.fname')}
        required
      />
      <label htmlFor="lastName">{t('register.lname')}</label>
      <input
        type="text"
        onChange={onChange}
        name="lastName"
        value={data.lastName}
        className={data.lastName ? "form-control is-valid" : "form-control is-invalid"}
        placeholder={t('register.lname')}
        required
      />
      <label htmlFor="email">{t('register.email')}</label>
      <input
        type="email"
        onChange={onChange}
        name="email"
        value={data.email}
        className={data.email ? "form-control is-valid" : "form-control is-invalid"}
        placeholder={t('register.email')}
        required
      />
      <label>{t('register.sex')}</label>
      {["m", "f", "n/a"].map((val) => (
        <div className="custom-control custom-radio" key={val}>
          <input
            type="radio"
            id={val}
            name="sex"
            className={`custom-control-input ${data.sex === val ? "is-valid" : "is-invalid"}`}
            value={val}
            onChange={onChange}
          />
          <label className="custom-control-label" htmlFor={val}>
            {sexChoice[val]}
          </label>
        </div>
      ))}
      <div className="d-flex justify-content-end">
        <button className="btn btn-secondary" type="button" onClick={proceedToStepTwo}>
          {t('register.next')} <i className="pl-2 fas fa-arrow-right" />
        </button>
      </div>
    </Fragment>
  );
}