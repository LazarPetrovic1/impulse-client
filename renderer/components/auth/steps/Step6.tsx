'use client';

import { Fragment } from 'react';

type Props = {
  data: any;
  setData: (data: any) => void;
  questions: string[];
  question: string;
  security: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onProgressChange: (fields: any[]) => void;
};

export default function Step6({
  data,
  setData,
  questions,
  question,
  security,
  onChange,
  onProgressChange,
}: Props) {
  return (
    <Fragment>
      <h2>Add Security</h2>

      {/* Question */}
      <label className="mt-2">Security Question</label>
      <select
        value={question}
        onChange={(e) => setData({ ...data, question: e.target.value })}
        className={`form-control ${question ? 'is-valid' : 'is-invalid'}`}
      >
        <option value="">Choose one</option>
        {questions.map((q) => (
          <option key={q} value={q}>
            {q}
          </option>
        ))}
      </select>

      {/* Answer */}
      <label className="mt-2">Answer</label>
      <input
        type="text"
        name="security"
        value={security}
        onChange={onChange}
        disabled={!question}
        className={`form-control ${security ? 'is-valid' : 'is-invalid'}`}
        placeholder="Your answer"
      />

      {!security && (
        <div className="invalid-feedback d-block">
          Please provide an answer
        </div>
      )}

      {/* Proceed */}
      <div className="d-flex justify-content-end mt-3">
        <button
          type="button"
          className="btn btn-secondary"
          onClick={() => onProgressChange([security])}
          disabled={!security}
        >
          Proceed <i className="pl-2 fas fa-arrow-right" />
        </button>
      </div>
    </Fragment>
  );
}