'use client';

import { Fragment } from 'react';
import { useTranslation } from 'react-i18next';

type Props = {
  firstName: string;
  lastName: string;
  username: string;
  email: string;
  sex: string;
  bio: string;
  city?: string;
  country?: string;
  zip?: string;
  security?: string;
  password: string;
  password2: string;
  phone?: string;
  dob?: string;
  image: any;
  callcode?: string;
};

export function Step7(props: Props) {
  const { t } = useTranslation()
  const {
    firstName,
    lastName,
    username,
    email,
    sex,
    // city,
    // country,
    // zip,
    security,
    password,
    password2,
    // phone,
    dob,
    image,
    // callcode,
  } = props;

  const isValid =
    firstName &&
    lastName &&
    username &&
    email &&
    // security &&
    password &&
    password2;

  return (
    <Fragment>
      <h2 className='text-center'>{t('register.title4')}</h2>

      <ul className="list-group mt-3">
        <li className="list-group-item list-group-item-dark">
          {t('register.fullname')}: {firstName && lastName ? `${firstName} ${lastName}` : 'Not provided'}
        </li>

        <li className="list-group-item list-group-item-dark">
          {t('register.sex')}: {sex || 'Not provided'}
        </li>

        <li className="list-group-item list-group-item-dark">
          {t('register.email')}: {email || 'Not provided'}
        </li>

        <li className="list-group-item list-group-item-dark">
          {t('register.uname')}: {username ? `@${username}` : 'Not provided'}
        </li>

        <li className="list-group-item list-group-item-dark">
          {t('register.dob')}: {dob || 'Not provided'}
        </li>

        <li className="list-group-item list-group-item-dark">
          {t('register.imageupl')}: {image ? 'Yes' : 'No'}
        </li>

        {/* <li className="list-group-item list-group-item-dark">
          Location: {zip && city && country ? `${zip} - ${city}, ${country}` : 'Not provided'}
        </li>

        <li className="list-group-item list-group-item-dark">
          Security answer: {security || 'Not provided'}
        </li> */}

        {/* <li className="list-group-item list-group-item-dark">
          Phone: {phone ? `${callcode}${phone}` : 'Not provided'}
        </li> */}
      </ul>

      {/* Submit */}
      <button
        type="submit"
        disabled={!isValid}
        className="mt-3 btn btn-lg btn-primary btn-block"
      >
        <i className="fas fa-paper-plane pr-2" />
        {t('register.signup')}
      </button>
    </Fragment>
  );
}