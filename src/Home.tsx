import React, { useEffect, useState } from "react";
import { Container, Dropdown } from "react-bootstrap";
import {
  Company,
  getAllCompany,
  getAllStocks,
  getSingleCompanyStocks,
  Stocks,
} from "./service.tsx";
import StockLineChart from "./Chart.tsx";
import Calculation from "./Calculation.tsx";

export const Home = () => {
  const [allData, setAllData] = useState<Stocks[]>([]);
  const [companyList, setCompanyList] = useState<Company[]>([]);
  const [companies, setCompanies] = useState<Company[]>([]);
  const [companyNameDisplay, setCompanyNameDisplay] =
    useState<string>("All Company");

  const allStocks = async (): Promise<Stocks[]> => {
    try {
      const response = await getAllStocks();
      setAllData(response);
      return response;
    } catch (error) {
      alert("Failed to get stock data.");
      return [];
    }
  };

  const getCompanies = async () => {
    try {
      const response = await getAllCompany();
      setCompanies(response);
      response.push({
        id: 0,
        name: "All Company",
        sector_level1: "",
        sector_level2: "",
      });
      setCompanyList(response);
      console.log("Fetched companies:", response);
    } catch (error) {
      alert("Failed to get company list.");
    }
  };

  const handleDropdownSelect = async (val: Company) => {
    try {
      let data: Stocks[] = [];
      if (val.id === 0) {
        data = await allStocks();
      } else {
        data = await getSingleCompanyStocks(val.id);
      }
      setAllData(data);
      setCompanyNameDisplay(val.name);
    } catch (error) {
      alert("Failed to get data");
    }
  };

  // Initial data fetch
  useEffect(() => {
    getCompanies();
    allStocks();
  }, []);

  return (
    <Container
      style={{
        maxWidth: "1440px",
        paddingLeft: "0px",
        paddingRight: "0px",
        marginLeft: "auto",
        marginRight: "auto",
        backgroundColor: "white",
        backgroundAttachment: "inherit",
        backgroundRepeat: "no-repeat",
        backgroundSize: "100% auto",
      }}
    >
      <StockLineChart data={allData} />
      <div style={{ display: "flex", justifyContent: "center" }}>
        <Dropdown>
          <Dropdown.Toggle variant="blank" id="dropdown-basic">
            {companyNameDisplay}
          </Dropdown.Toggle>
          <Dropdown.Menu>
            {companyList.map((val) => (
              <Dropdown.Item
                key={val.id}
                className="dropdown-item"
                onClick={() => handleDropdownSelect(val)}
              >
                {val.name}
              </Dropdown.Item>
            ))}
          </Dropdown.Menu>
        </Dropdown>
      </div>
      <Calculation companies={companies} />
    </Container>
  );
};
