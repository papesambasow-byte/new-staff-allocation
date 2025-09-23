import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { ResponsiveContainer, LineChart, Line, BarChart, Bar, CartesianGrid, XAxis, YAxis, Tooltip, Legend } from 'recharts';
import DashboardDesign from "./DashboardDesign"
import axios from "axios"
import {
  CRow,
  CCol,
  CWidgetStatsA,
  CCard
} from '@coreui/react'

const Welcome = () => {
  const { user } = useSelector((state) => state.auth);
  const [selectedYear, setSelectedYear] = useState(new Date().getFullYear());
  const [selectedYears, setSelectedYears] = useState(new Date().getFullYear());
  const [selectedYearss, setSelectedYearss] = useState(new Date().getFullYear());
  const [selectedYearsss, setSelectedYearsss] = useState(new Date().getFullYear());
  const [staffinformationTotalVoiceSum, setStaffinformationTotalVoiceSum] = useState([]);
  const [staffinformationTotalDataSum, setStaffinformationTotalDataSum] = useState([]);
  const [selectedMonth, setSelectedMonth] = useState((new Date().getMonth() + 1).toString().padStart(2, '0'));
  const [selectedMonths, setSelectedMonths] = useState((new Date().getMonth() + 1).toString().padStart(2, '0'));
  const [sortedData, setSortedData] = useState([]);
  const [sortedDatas, setSortedDatas] = useState([]);
  const [departmentsData, setDepartmentsData] = useState([]);
  const [departmentsDatas, setDepartmentsDatas] = useState([]);

  const handleYearChange = (event) => {
    setSelectedYear(event.target.value);
  };
  const handleYearChanges = (event) => {
    setSelectedYearss(event.target.value);
  };
  const handleYearChangess = (event) => {
    setSelectedYears(event.target.value);
  };
  const handleYearChangesss = (event) => {
    setSelectedYearsss(event.target.value);
  };


  // voice
  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      const authHeader = `Bearer ${token}`;

      axios.get(`http://172.25.160.235:2402/staffinformationTotalVoiceSum/${selectedYear}`, {
        headers: {
          Authorization: authHeader,
        },
      })
        .then((response) => {
          const { yearlyMonthlySums } = response.data;

          // Extract data for the selected year
          const dataForSelectedYear = yearlyMonthlySums[selectedYear];

          // Transform the data into the format expected by Recharts
          const transformedData = Object.keys(dataForSelectedYear).map((month) => ({
            label: month,
            value: dataForSelectedYear[month],
          }));

          console.log("Transformed Data:", transformedData);

          setStaffinformationTotalVoiceSum(transformedData);
        })
        .catch((error) => {
          console.error("Error fetching data:", error);
        });
    } else {
      console.error("No token found. User not authenticated.");
    }
  }, [selectedYear]);

  // data
  useEffect(() => {
    console.log("Effect is running...");

    const token = localStorage.getItem("token");
    if (token) {
      const authHeader = `Bearer ${token}`;

      axios.get(`http://172.25.160.235:2402/staffinformationTotalDataSum/${selectedYearss}`, {
        headers: {
          Authorization: authHeader,
        },
      })
        .then((response) => {
          const { yearlyMonthlySums } = response.data;

          // Extract data for the selected year
          const dataForSelectedYear = yearlyMonthlySums[selectedYearss];

          // Transform the data into the format expected by Recharts
          const transformedData = Object.keys(dataForSelectedYear).map((month) => ({
            label: month,
            value: dataForSelectedYear[month],
          }));

          console.log("Transformed Data:", transformedData);

          setStaffinformationTotalDataSum(transformedData);
        })
        .catch((error) => {
          console.error("Error fetching data:", error);
        });
    } else {
      console.error("No token found. User not authenticated.");
    }

    console.log("Effect is finished...");
  }, [selectedYearss]);



  // Data by month
  const handleMonthChange = (event) => {
    setSelectedMonth(event.target.value);
  };

  useEffect(() => {
    const token = localStorage.getItem('token');
    const authHeader = `Bearer ${token}`;
    const fetchData = async () => {
      try {
        const response = await axios.get(`http://172.25.160.235:2402/monthlyDataSums/${selectedYears}/${selectedMonth}`, {
          headers: {
            Authorization: authHeader,
          },
        });
        setSortedData(response.data.sortedData);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    if (selectedYears && selectedMonth) {
      fetchData();
    }
  }, [selectedYears, selectedMonth]);

  const formattedData = sortedData.map((item) => ({
    label: item.label,
    count: item.count,
    sum: item.sum,
  }));

  // VOICE by month
  const handleMonthChanges = (event) => {
    setSelectedMonths(event.target.value);
  };

  useEffect(() => {
    const token = localStorage.getItem("token");
    const authHeader = `Bearer ${token}`;
    const fetchDatas = async () => {
      try {
        const response = await axios.get(`http://172.25.160.235:2402/monthlyVoiceSums/${selectedYearsss}/${selectedMonths}`, {
          headers: {
            Authorization: authHeader,
          },
        });
        setSortedDatas(response.data.sortedDatas);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    if (selectedYearsss && selectedMonths) {
      fetchDatas();
    }
  }, [selectedYearsss, selectedMonths]);

  const formattedDatas = sortedDatas.map((item) => ({
    label: item.label,
    count: item.count,
    sum: item.sum,
  }));


  // LEVEL
  useEffect(() => {
    const fetchDatas = async () => {
      const token = localStorage.getItem("token");
      const authHeader = `Bearer ${token}`;
      try {
        const response = await axios.get("http://172.25.160.235:2402/monthlyVoiceSumss", {
          headers: {
            Authorization: authHeader,
          },
        });
        setDepartmentsData(response.data.departments);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchDatas();
  }, []);


  // DEPARTMENT
  useEffect(() => {
    const departmentss = async () => {
      const token = localStorage.getItem("token");
      const authHeader = `Bearer ${token}`;
      try {
        const response = await axios.get("http://172.25.160.235:2402/departmentData", {
          headers: {
            Authorization: authHeader,
          },
        });
        setDepartmentsDatas(response.data.departments);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    departmentss();
  }, []);


  return (
    <>
      <div style={{ marginTop: "25px" }}>
        <DashboardDesign />
      </div>
      <br />
      {/* Voice charts */}
      <CRow>
        <div className="row">
          {/* <CCard className="p-4" style={{ marginLeft: "10px" }}>
            <div>
              <label>Select Year:</label>
              <select value={selectedYear} onChange={handleYearChange}>
                {Array.from({ length: 10 }, (_, i) => new Date().getFullYear() - i).map((year) => (
                  <option key={year} value={year}>
                    {year}
                  </option>
                ))}
              </select>
            </div>
            <div className="section col-md-12">
              <h6 className="section-title">Voice Chart</h6>
              <div className="section-content">
                <ResponsiveContainer width="100%" height={300}>
                  <LineChart
                    data={staffinformationTotalVoiceSum}
                    margin={{ top: 15, right: 0, bottom: 15, left: 0 }}
                  >
                    <Tooltip />
                    <XAxis dataKey="label" />
                    <YAxis dataKey="value" />
                    <CartesianGrid stroke="#ccc" strokeDasharray="5 5" />
                    <Legend />
                    <Line type="monotone" dataKey="value" stroke="#F94C10" name="Voice Monthly Total" />
                  </LineChart>
                </ResponsiveContainer>
              </div>
            </div>
          </CCard> */}

          <CCard className="p-4" style={{ marginTop: "20px", marginLeft: "10px" }}>
            <div>
              <label>Select Year:</label>
              <select value={selectedYear} onChange={handleYearChange}>
                {/* Generate options for last 10 years */}
                {Array.from({ length: 10 }, (_, i) => new Date().getFullYear() - i).map((year) => (
                  <option key={year} value={year}>
                    {year}
                  </option>
                ))}
              </select>
            </div>
            <div className="section col-md-12">
              <h6 className="section-title">Voice Chart</h6>
              <div className="section-content">
                <ResponsiveContainer width="100%" height={300}>
                  <BarChart
                    data={staffinformationTotalVoiceSum}
                    margin={{ top: 15, right: 0, bottom: 15, left: 0 }}
                  >
                    <XAxis dataKey="label" />
                    <YAxis dataKey="value" />
                    <CartesianGrid stroke="#ccc" strokeDasharray="5 5" />
                    <Tooltip />
                    <Legend />
                    <Bar dataKey="value" fill="#F94C10" name="Voice Monthly Total" />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </div>
          </CCard>


          <CCard className="p-4" style={{ marginTop: "20px", marginLeft: "10px" }}>
            <div>
              <label>Select Year:</label>
              <select value={selectedYearss} onChange={handleYearChanges}>
                {/* Generate options for last 10 years */}
                {Array.from({ length: 10 }, (_, i) => new Date().getFullYear() - i).map((year) => (
                  <option key={year} value={year}>
                    {year}
                  </option>
                ))}
              </select>
            </div>
            <div className="section col-md-12">
              <h6 className="section-title">Data Chart</h6>
              <div className="section-content">
                <ResponsiveContainer width="100%" height={300}>
                  <BarChart
                    data={staffinformationTotalDataSum}
                    margin={{ top: 15, right: 0, bottom: 15, left: 0 }}
                  >
                    <XAxis dataKey="label" />
                    <YAxis dataKey="value" />
                    <CartesianGrid stroke="#ccc" strokeDasharray="5 5" />
                    <Tooltip />
                    <Legend />
                    <Bar dataKey="value" fill="#F94C10" name="Data Monthly Total" />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </div>
          </CCard>

          <div className="col">
           {/* monthly total voice for level */}
          <CCard className="p-4" style={{ marginTop: '20px', marginLeft: '10px' }}>
            <div>
              <label>Select Year:</label>
              <select value={selectedYears} onChange={handleYearChangess}>
                {Array.from({ length: 10 }, (_, i) => new Date().getFullYear() - i).map((year) => (
                  <option key={year} value={year.toString()}>
                    {year}
                  </option>
                ))}
              </select>
              <label>Month:</label>
              <select value={selectedMonth} onChange={handleMonthChange}>
                {Array.from({ length: 12 }, (_, i) => (i + 1).toString().padStart(2, '0')).map((month) => (
                  <option key={month} value={month}>
                    {month}
                  </option>
                ))}
              </select>
            </div>
            <div className="section col-md-12">
              <h6 className="section-title">Data Chart</h6>
              <div className="section-content">
                <ResponsiveContainer width="100%" height={300}>
                  <BarChart data={formattedData} margin={{ top: 15, right: 0, bottom: 15, left: 0 }}>
                    <XAxis dataKey="label" />
                    <YAxis />
                    <CartesianGrid stroke="#ccc" strokeDasharray="5 5" />
                    <Tooltip />
                    <Legend />
                    <Bar dataKey="count" fill="#8884d8" name="Total Level" />
                    <Bar dataKey="sum" fill="#F94C10" name="Total Data" />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </div>
          </CCard>

          {/* monthly total voice for level */}
          <CCard className="p-4" style={{ marginTop: '20px', marginLeft: '10px' }}>
            <div>
              <label>Select Year:</label>
              <select value={selectedYearsss} onChange={handleYearChangesss}>
                {Array.from({ length: 10 }, (_, i) => new Date().getFullYear() - i).map((year) => (
                  <option key={year} value={year.toString()}>
                    {year}
                  </option>
                ))}
              </select>
              <label>Month:</label>
              <select value={selectedMonths} onChange={handleMonthChanges}>
                {Array.from({ length: 12 }, (_, i) => (i + 1).toString().padStart(2, '0')).map((month) => (
                  <option key={month} value={month}>
                    {month}
                  </option>
                ))}
              </select>
            </div>
            <div className="section col-md-12">
              <h6 className="section-title">Voice Chart</h6>
              <div className="section-content">
                <ResponsiveContainer width="100%" height={300}>
                  <BarChart data={formattedDatas} margin={{ top: 15, right: 0, bottom: 15, left: 0 }}>
                    <XAxis dataKey="label" />
                    <YAxis />
                    <CartesianGrid stroke="#ccc" strokeDasharray="5 5" />
                    <Tooltip />
                    <Legend />
                    <Bar dataKey="count" fill="#8884d8" name="Total Level" />
                    <Bar dataKey="sum" fill="#F94C10" name="Total Voice" />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </div>
          </CCard>
          </div>

          <CCard className="p-4" style={{ marginTop: '20px', marginLeft: '10px' }}>
            <div className="p-4" style={{ marginTop: "20px", marginLeft: "10px" }}>
              <div className="section col-md-12">
                <h6 className="section-title">LEVEL Chart</h6>
                <div className="section-content">
                  <ResponsiveContainer width="100%" height={300}>
                    <BarChart
                      data={departmentsData}
                      margin={{ top: 15, right: 0, bottom: 15, left: 0 }}
                    >
                      <CartesianGrid stroke="#ccc" strokeDasharray="5 5" />
                      <XAxis dataKey="LEVEL" />
                      <YAxis />
                      <Tooltip />
                      <Legend />
                      <Bar dataKey="LEVEL" fill="#8E3E63" name="LEVEL" />
                      <Bar dataKey="POSITION" fill="#FF0000" name="POSITION" />
                      <Bar dataKey="VOICE" fill="#F94C10" name="VOICE" />
                      <Bar dataKey="DATA" fill="#82ca9d" name="DATA" />
                      <Bar dataKey="SMS" fill="#8884d8" name="SMS" />
                    </BarChart>
                  </ResponsiveContainer>
                </div>
              </div>
            </div>
          </CCard>

          <CCard className="p-4" style={{ marginTop: '20px', marginLeft: '10px' }}>
            <div className="p-4" style={{ marginTop: "20px", marginLeft: "10px" }}>
              <div className="section col-md-12">
                <h6 className="section-title">Department Chart</h6>
                <div className="section-content">
                  <ResponsiveContainer width="100%" height={400}>
                    <BarChart
                      data={departmentsDatas}
                      margin={{ top: 15, right: 0, bottom: 15, left: 0 }}
                    >
                      <CartesianGrid stroke="#ccc" strokeDasharray="5 5" />
                      <XAxis dataKey="DEPARTMENT" />
                      <YAxis />
                      <Tooltip />
                      <Legend />
                      <Bar dataKey="DEPARTMENT" fill="#8E3E63" name="DEPARTMENT" />
                      <Bar dataKey="STAFF" fill="#FF0000" name="STAFF" />
                      <Bar dataKey="VOICE" fill="#F94C10" name="VOICE" />
                      <Bar dataKey="DATA" fill="#82ca9d" name="DATA" />
                      <Bar dataKey="SMS" fill="#8884d8" name="SMS" />
                    </BarChart>
                  </ResponsiveContainer>
                </div>
              </div>
            </div>
          </CCard>
        </div>
      </CRow>
    </>
  );

};

export default Welcome;
