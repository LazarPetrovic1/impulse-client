import { Fragment } from "react";
import DatePicker from "react-datepicker";
import { countries } from "../../../constants";
import 'react-datepicker/dist/react-datepicker.min.css';

export function Step4({
  data,
  onChange,
  setDate,
  onProgressChange,
}: {
  data: {
    dob: string;
    city: string;
    country: string;
    zip: string;
    phone: string;
    callcode: string;
  };
  onChange: (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => void;
  setDate: (date: string) => void;
  onProgressChange: (arr: string[]) => void;
}) {
  return (
    <Fragment>
      <h2 className="mb-2">Other important info</h2>

      <label htmlFor="dob">Date of birth</label>
      <DatePicker
        selected={data.dob ? new Date(data.dob) : null}
        onChange={(date: Date) => setDate(date.toISOString())}
        className={data.dob ? "form-control is-valid" : "form-control is-invalid"}
      />
      <br />
      <label htmlFor="city">City</label>
      <input
        type="text"
        name="city"
        value={data.city}
        onChange={onChange}
        className={data.city ? "form-control is-valid" : "form-control is-invalid"}
      />

      <label htmlFor="country">Country</label>
      <select
        name="country"
        value={data.country}
        onChange={onChange}
        className={data.country ? "form-control is-valid" : "form-control is-invalid"}
      >
        <option value="">Select one</option>
        {countries.map((c) => (
          <option key={c.capital} value={c.name}>
            {c.name}
          </option>
        ))}
      </select>

      <label htmlFor="zip">Postal Code</label>
      <input
        type="text"
        name="zip"
        value={data.zip}
        onChange={onChange}
        className={data.zip ? "form-control is-valid" : "form-control is-invalid"}
      />

      <label htmlFor="phone">Phone number</label>
      <div className="input-group">
        <div className="input-group-prepend">
          <span className="input-group-text">{data.callcode || ":/"}</span>
        </div>
        <input
          type="text"
          name="phone"
          value={data.phone}
          onChange={onChange}
          className={data.phone ? "form-control is-valid" : "form-control is-invalid"}
        />
      </div>

      <div className="d-flex justify-content-end mt-3">
        <button className="btn btn-secondary" type="button" onClick={() => onProgressChange([])}>
          Proceed <i className="fas fa-arrow-right"></i>
        </button>
      </div>
    </Fragment>
  );
}