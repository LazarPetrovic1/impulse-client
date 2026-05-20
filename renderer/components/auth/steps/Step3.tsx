import { Fragment } from "react";
import { useTranslation } from "react-i18next";
import { ConnectedInput } from "../../common/ConnectedInput";

export function Step3({
  data,
  onChange,
  onProgressChange,
}: {
  data: { bio: string };
  onChange: (e: React.ChangeEvent<any>) => void;
  onProgressChange: (arr: string[]) => void;
}) {
  const { t } = useTranslation()
  return (
    <Fragment>
      <h2 className="mb-2 text-center">{t('register.title3')}</h2>
      <label htmlFor="bio">{t('register.bio')}</label>
      <ConnectedInput
        // className={data.bio ? "form-control is-valid" : "form-control is-invalid"}
        placeholder={t('register.title3')}
        // name="bio"
        value={data.bio}
        onChange={(e) => onChange({
          target: {
            name: "bio",
            value: e
          }
        } as React.ChangeEvent<any>)}
      />
      <div className="d-flex justify-content-end mt-3">
        <button className="btn btn-secondary" type="button" onClick={() => onProgressChange([])}>
          {t('register.next')} <i className="fas fa-arrow-right"></i>
        </button>
      </div>
    </Fragment>
  );
}