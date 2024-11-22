import React, { useState } from "react";
import { Company, getCumulativeResult } from "./service.tsx";
import DatePicker from "react-datepicker";
import { Controller, useForm } from "react-hook-form";
import "react-datepicker/dist/react-datepicker.css";
import { Button } from "react-bootstrap";

interface FormValues {
  company_id: number;
  start_date: Date;
  end_date: Date;
}

interface FormValues {
  company_id: number;
  start_date: Date;
  end_date: Date;
}

const Calculation = ({ companies }: { companies: Company[] }): JSX.Element => {
  const { handleSubmit, control } = useForm<FormValues>({
    defaultValues: {
      company_id: 1,
      start_date: new Date(),
      end_date: new Date(),
    },
  });

  const [calValue, setCalValue] = useState<any>(null);

  const onSubmit = async (data: FormValues) => {
    console.log("Selected Data:", {
      company_id: data.company_id,
      start_date: (data.start_date as Date).toISOString().split("T")[0],
      end_date: (data.end_date as Date).toISOString().split("T")[0],
    });
    const submitData = {
      company_id: Number(data.company_id),
      start_date: (data.start_date as Date).toISOString().split("T")[0],
      end_date: (data.end_date as Date).toISOString().split("T")[0],
    };
    try {
      const result = await getCumulativeResult(submitData);
      setCalValue(result);
    } catch {
      alert("No such data or the date out of range, please recheck");
    }
  };

  return (
    <>
      <div style={{ margin: "50px" }}>
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            fontWeight: "bold",
            fontSize: "40px",
            marginBottom: "50px",
          }}
        >
          <div>Cumulative Calculation:</div>
        </div>
        <div>
          {calValue?.cumulative_return && (
            <div
              style={{
                display: "flex",
                justifyContent: "center",
                margin: "20px",
                fontWeight: "bold",
              }}
            >
              Cumulative Returns:{" "}
              {Number(calValue.cumulative_return) >= 0 && (
                <div>{`${Number(calValue.cumulative_return).toFixed(2)}%`}</div>
              )}
              {Number(calValue.cumulative_return) < 0 && (
                <div style={{ color: "red" }}>{`(${Number(
                  calValue.cumulative_return
                ).toFixed(2)}%)`}</div>
              )}
            </div>
          )}
        </div>
        <form
          onSubmit={handleSubmit(onSubmit)}
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <div>
            <div>Company:</div>
            <Controller
              name="company_id"
              control={control}
              rules={{ required: "Please select a company" }}
              render={({ field }) => (
                <select
                  {...field}
                  style={{
                    paddingTop: "5px",
                    paddingBottom: "5px",
                    paddingLeft: "30px",
                    paddingRight: "10px",
                    fontSize: "14px",
                    marginBottom: "10px",
                  }}
                >
                  {companies
                    ?.filter((val) => val.id !== 0)
                    .map((val) => (
                      <option key={val.id} value={val.id}>
                        {val.name}
                      </option>
                    ))}
                </select>
              )}
            />
          </div>
          <div style={{ marginBottom: "10px" }}>
            <div>Start Date:</div>
            <Controller
              name="start_date"
              control={control}
              render={({ field }) => (
                <DatePicker
                  selected={field.value}
                  peekNextMonth
                  showMonthDropdown
                  showYearDropdown
                  dropdownMode="select"
                  required={true}
                  onChange={(date) => field.onChange(date)}
                  placeholderText="Start Date"
                  dateFormat="yyyy-MM-dd"
                />
              )}
            />
          </div>
          <div style={{ marginBottom: "10px" }}>
            <div>End Date:</div>
            <Controller
              name="end_date"
              control={control}
              render={({ field }) => (
                <DatePicker
                  selected={field.value}
                  peekNextMonth
                  showMonthDropdown
                  showYearDropdown
                  dropdownMode="select"
                  required={true}
                  onChange={(date) => field.onChange(date)}
                  placeholderText="End Date"
                  dateFormat="yyyy-MM-dd"
                />
              )}
            />
          </div>
          <Button type="submit" variant="success">
            Submit
          </Button>
        </form>
      </div>
    </>
  );
};

export default Calculation;
