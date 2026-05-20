'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '../../features/auth/hooks';
import { useAuthStore } from '../../features/auth/store';
import styled from 'styled-components';
import { useTranslation } from 'react-i18next';
import { setShortcutsLocked } from '../../features/system/shortcuts';

const INIT_DATA = { loginVal: '', password: '' }

const AuthPassword = styled.i`
  color: black !important;
  position: absolute;
  top: 37px;
  right: 40px;
  padding: 5px;
  cursor: pointer;
`

export default function Login() {
  const [data, setData] = useState(INIT_DATA);
  const [viewPass, setViewPass] = useState<boolean>(() => false);
  const [remember, setRemember] = useState<boolean>(() => false);
  const [msg, setMsg] = useState<string>(() => "")
  const router = useRouter();
  const { login } = useAuth();
  const { isAuthenticated } = useAuthStore()
  const { t } = useTranslation()
  useEffect(() => { if (isAuthenticated) router.push('/'); }, [isAuthenticated]);

  // Input change handler
  const onChange = (e: React.ChangeEvent<HTMLInputElement>) =>
    setData({ ...data, [e.target.name]: e.target.value });

  // Form submit handler
  const onSubmit = async (e: React.SubmitEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      await login({ login: data.loginVal, password: data.password });
    } catch (err) {
      setData(() => INIT_DATA);
      setMsg(() => "The credentials you have entered are invalid.")
    }
  };

  useEffect(() => {
    setShortcutsLocked(true);
    return () => { setShortcutsLocked(false); };
  }, []);

  return (
    <div className="allevents" style={{ width: "100%", overflowY: "auto" }}>
      <div className="pt-5 container">
        <div className="text-center bg-info">
          <div className="bg-primary text-light py-2 m-0">
            <h4 className="d-inline-block">
              <b>{t('auth.welcome')}</b>
            </h4>
          </div>
        </div>

        <form onSubmit={(e: React.SubmitEvent<HTMLFormElement>) => onSubmit(e)} className="darkbackground mt-5 p-5">
          {/* Login Input */}
          <div className="form-group">
            <label htmlFor="loginVal" className="white">
              {t('auth.login')}
            </label>
            <input
              type="text"
              name="loginVal"
              value={data.loginVal}
              placeholder={t('auth.identifier')}
              className={data.loginVal ? 'form-control is-valid' : 'form-control is-invalid'}
              onChange={onChange}
              required
            />
          </div>

          {/* Password Input */}
          <div className="form-group position-relative">
            <label htmlFor="password" className="white">
              {t('auth.password')}
            </label>
            <input
              type={viewPass ? 'text' : 'password'}
              name="password"
              value={data.password}
              placeholder={t('auth.password')}
              className={data.password ? 'form-control is-valid' : 'form-control is-invalid'}
              onChange={onChange}
              required
            />
            <AuthPassword
              className={`fas ${viewPass ? 'fa-eye-slash' : 'fa-eye'}`}
              onClick={() => setViewPass(!viewPass)}
            />
          </div>

          {/* Remember Me */}
          <div className="custom-control custom-checkbox">
            <input
              type="checkbox"
              id="remember"
              name="remember"
              checked={remember}
              value={remember ? 'true' : 'false'}
              onChange={() => setRemember(!remember)}
              className={`custom-control-input ${remember ? 'is-valid' : 'is-invalid'}`}
            />
            <label className="custom-control-label" htmlFor="remember">
              {t('auth.remember_me')}
            </label>
          </div>

          <div className="text-danger">{msg}</div>

          {/* Submit Button */}
          <button type="submit" className="btn btn-primary btn-block btn-lg mt-3">
            <i className="fas fa-door-open" /> &nbsp;&nbsp;{t('auth.submit_login')}
          </button>
        </form>
      </div>
    </div>
  );
};