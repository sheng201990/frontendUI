import axios from "axios";
export type Company = {
  id: number;
  name: string;
  sector_level1: string;
  sector_level2: string;
};

export type Stocks = {
  company_id: number;
  asof: string;
  volume: number;
  close_usd: number;
};

export type ClientSecret = {
  client_secret: string;
};

export type CumulativeRequest = {
  company_id: number;
  start_date: string;
  end_date: string;
};

export const getAllStocks = async (): Promise<Stocks[]> => {
  return axios.get("http://127.0.0.1:8000/stocks/").then((response) => {
    return response.data;
  });
};

export const getAllCompany = (): Promise<Company[]> =>
  axios.get("http://127.0.0.1:8000/stocks/company/").then((res) => {
    return res.data;
  });

export const getCumulativeResult = (
  data: CumulativeRequest
): Promise<number> => {
  return axios
    .post("http://127.0.0.1:8000/stocks/cumulative/", data)
    .then((response) => {
      return response.data;
    });
};

export const getSingleCompanyStocks = async (
  company_id: number
): Promise<Stocks[]> => {
  return axios
    .get(`http://127.0.0.1:8000/stocks/${company_id}/`)
    .then((response) => {
      return response.data;
    });
};
