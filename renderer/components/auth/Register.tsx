'use client';

import { useState, FormEvent, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useAuthStore } from '../../features/auth/store';
import { registerRequest } from '../../features/auth/api';
import { Step1, Step2, Step3, Step5, Step7 } from './steps';
import RegisterSteps from './steps/RegisterSteps';
import { setShortcutsLocked } from '../../features/system/shortcuts';

export default function Register() {
  const router = useRouter();
  const { isAuthenticated, setAuth } = useAuthStore();

  const [data, setData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    password2: '',
    username: '',
    sex: '',
    bio: '',

    // dob: '',
    // city: '',
    // country: '',
    // zip: '',
    // security: '',
    // phone: '',
    // callcode: '',
    // question: '',
    // questions: [
    //   'Where were you when the funniest thing happened to you?',
    //   'What is/was the full name of one of your parents?',
    //   'What was your first pet\'s name?',
    //   'Who was your teacher in 1st grade?',
    //   'How many siblings do you have?',
    //   'What is your most interesting memory?',
    // ],
  });

  const [progress, setProgress] = useState(0);
  const [viewPass, setViewPass] = useState(false);
  const [viewPass2, setViewPass2] = useState(false);
  const [check, setCheck] = useState(false);
  const [image, setImage] = useState<File | null>(null);

  const onChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) =>
    setData({ ...data, [e.target.name]: e.target.value });

  // const setDate = (date: string) => setData({ ...data, dob: date });

  const onProgressChange = (arr: string[]) => {
    if (arr.some((x) => !x || x.length === 0)) return;
    setProgress((prev) => prev + 1);
  };

  const onSubmit = async (e: FormEvent) => {
    e.preventDefault();
    try {
      // const phoneNr = `${data.callcode}${data.phone}`;
      const imageTaken = Boolean(image);

      const res = await registerRequest({
        firstName: data.firstName,
        lastName: data.lastName,
        email: data.email,
        sex: data.sex,
        bio: data.bio,
        // dob: data.dob,
        username: data.username,
        password: data.password,
        // city: data.city,
        // country: data.country,
        // zip: data.zip,
        // phone: phoneNr,
        // question: data.question,
        // answer: data.security,
        imageTaken,
        role: 'user',
      });

        setAuth(res.user);
        router.push('/');
    } catch (err) {
      console.error('Registration failed', err);
      // optional: show an error notification
    }
  };

  useEffect(() => {
    setShortcutsLocked(true);
    return () => { setShortcutsLocked(false); };
  }, []);

  // Redirect if already authenticated
  if (isAuthenticated) {
    router.push('/');
    return null;
  }

  // useEffect(() => {
  //   (function () {
  //     if (data.country) {
  //       const callcode = countries.filter((ctry) => ctry.name === data.country);
  //       setData({ ...data, callcode: callcode[0].callcode });
  //     }
  //   })();
  //     // eslint-disable-next-line
  // }, [data.country]);

  return (
    <div style={{ flexFlow: 'column wrap', width: "100%", overflowY: "auto" }}>
      <RegisterSteps setProgress={setProgress} progress={progress} />
      <div className="container-lg my-5 allevents">
        <form onSubmit={onSubmit}>
          <div className="p-5 border rounded m-auto darkbackground">
            {progress === 0 && (
              <Step1
                data={{
                  firstName: data.firstName,
                  lastName: data.lastName,
                  email: data.email,
                  sex: data.sex,
                }}
                onChange={onChange}
                onProgressChange={onProgressChange}
              />
            )}
            {progress === 1 && (
              <Step2
                data={{
                  username: data.username,
                  password: data.password,
                  password2: data.password2,
                }}
                onChange={onChange}
                viewPass={viewPass}
                setViewPass={setViewPass}
                viewPass2={viewPass2}
                setViewPass2={setViewPass2}
                onProgressChange={onProgressChange}
              />
            )}
            {progress === 2 && (
              <Step3
                data={{ bio: data.bio }}
                onChange={onChange}
                onProgressChange={onProgressChange}
              />
            )}
            {/*progress === 3 && (
              <Step4
                data={{
                  dob: data.dob,
                  city: data.city,
                  country: data.country,
                  zip: data.zip,
                  phone: data.phone,
                  callcode: data.callcode,
                }}
                onChange={onChange}
                setDate={setDate}
                onProgressChange={onProgressChange}
              />
            )*/}
            {progress === 3 && (
              <Step5 check={check} setCheck={setCheck} onProgressChange={onProgressChange} />
            )}
            {/*progress === 5 && (
              <Step6
                data={data}
                setData={setData}
                questions={data.questions}
                question={data.question}
                onChange={onChange}
                security={data.security}
                onProgressChange={onProgressChange}
              />
            )*/}
            {progress === 4 && <Step7 {...data} image={image}/>}
          </div>
          {progress === 6 && (
            <button type="submit" className="btn btn-primary btn-block btn-lg mt-3">
              Register
            </button>
          )}
        </form>
      </div>
    </div>
  );
}