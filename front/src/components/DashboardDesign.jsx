import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { getMe } from "../features/authSlice";
import axios from 'axios'
import {
  CRow,
  CCol,
  CWidgetStatsA,
  CCard
} from '@coreui/react'


const DashboardDesign = () => {
  const { user } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { isError } = useSelector((state) => state.auth);

  useEffect(() => {
    dispatch(getMe());
  }, [dispatch]);

  useEffect(() => {
    if (isError) {
      navigate("/");
    }
  }, [isError, navigate]);


  const [allTotalVoiceLogs, setAllTotalVoiceLogs] = useState([]);
  const [staffinformationTotalSumOfVoice, setStaffinformationTotalSumOfVoice] = useState([]);
  const [staffinformationTotalSumOfSms, setStaffinformationTotalSumOfSms] = useState([]);
  const [staffinformation, setStaffinformation] = useState([]);
  const [staffinformationTotalSumOfData, setStaffinformationTotalSumOfData] = useState([]);
  const [users, setUsers] = useState([]);
  const [allTotalDataLogs, setAllTotalDataLogs] = useState([]);
  const [allTotalSmsLogs, setAllTotalSmsLogs] = useState([]);



    
  useEffect(() => {
    getAllTotalSmsLogs();
  }, []);

  const getAllTotalSmsLogs = async () => {
    const token = localStorage.getItem("token");
    const authHeader = `Bearer ${token}`;
    const response = await axios.get("http://172.25.160.235:2402/allTotalSmsLogs",{
        headers: {
            Authorization: authHeader,
          },
    });
    setAllTotalSmsLogs(response.data);
    console.log(response)
  };

  
  useEffect(() => {
    getAllTotalDataLogs();
  }, []);

  const getAllTotalDataLogs = async () => {
    const token = localStorage.getItem("token");
    const authHeader = `Bearer ${token}`;
    const response = await axios.get("http://172.25.160.235:2402/allTotalDataLogs",{
        headers: {
            Authorization: authHeader,
          },
    });
    setAllTotalDataLogs(response.data);
    console.log(response)
  };



  useEffect(() => {
    getAllTotalVoiceLogs();
  }, []);

  const getAllTotalVoiceLogs = async () => {
    const token = localStorage.getItem("token");
    const authHeader = `Bearer ${token}`;
    const response = await axios.get("http://172.25.160.235:2402/allTotalVoiceLogs",{
        headers: {
            Authorization: authHeader,
          },
    });
    setAllTotalVoiceLogs(response.data);
    console.log(response)
  };



  useEffect(() => {
    getStaffinformationTotalSumOfVoice();
  }, []);

  const getStaffinformationTotalSumOfVoice = async () => {
    const token = localStorage.getItem("token");
    const authHeader = `Bearer ${token}`;
    const response = await axios.get("http://172.25.160.235:2402/staffinformationSumOfVoice",{
        headers: {
            Authorization: authHeader,
          },
    });
    setStaffinformationTotalSumOfVoice(response.data);
    console.log(response)
  };


  useEffect(() => {
    getStaffinformationTotalSumOfSms();
  }, []);

  const getStaffinformationTotalSumOfSms = async () => {
    const token = localStorage.getItem("token");
    const authHeader = `Bearer ${token}`;
    const response = await axios.get("http://172.25.160.235:2402/staffinformationSumOfSms",{
        headers: {
            Authorization: authHeader,
          },
    });
    setStaffinformationTotalSumOfSms(response.data);
    console.log(response)
  };


  useEffect(() => {
    getStaffinformation();
  }, []);

  const getStaffinformation = async () => {
    const token = localStorage.getItem("token");
    const authHeader = `Bearer ${token}`;
    const response = await axios.get("http://172.25.160.235:2402/staffEntitlement_tb",{
        headers: {
            Authorization: authHeader,
          },
    });
    setStaffinformation(response.data);
    console.log(response)
  };


  useEffect(() => {
    getStaffinformationTotalSumOfData();
  }, []);

  const getStaffinformationTotalSumOfData = async () => {
    const token = localStorage.getItem("token");
    const authHeader = `Bearer ${token}`;
    const response = await axios.get("http://172.25.160.235:2402/staffinformationSumOfData",{
        headers: {
            Authorization: authHeader,
          },
    });
    setStaffinformationTotalSumOfData(response.data);
    console.log(response)
  };


  useEffect(() => {
    getUsers();
  }, []);

  const getUsers = async () => {
    const token = localStorage.getItem("token");
    const authHeader = `Bearer ${token}`;
    const response = await axios.get("http://172.25.160.235:2402/users",{
        headers: {
            Authorization: authHeader,
          },
    });
    setUsers(response.data);
    console.log(response)
  };

  // getting the month and the year in the dashboard
  var date = new Date();
  const formatter = new Intl.DateTimeFormat('en', { month: 'long' });
  const month1 = formatter.format(new Date());
  const value = date.getFullYear();
  const dateTime = month1 + " " + value
 

  return (
    <CCard className="p-4">
    <CRow>


 {/* Total Voice Given */}
      {/* <CCol sm={6} lg={3}>
        <CWidgetStatsA
          className="mb-4"
          color="success"
          value={
            <>
              <span style={{fontSize:"20px"}}>NLE: {allTotalVoiceLogs.totalSum}</span>
              <span className="fs-6 fw-normal">
                <img src="https://www.svgrepo.com/show/528084/call-chat.svg" alt="" style={{ width: "40px", marginLeft:"80px",  marginTop: "5px"}} />
              </span>
            </>
          }
          title="Total Voice Given"
        />
      </CCol> */}


  {/* Total Data Given  */}
      {/* <CCol sm={6} lg={3}>
        <CWidgetStatsA
          className="mb-4"
          color="info"
          value={
            <>
             <span  style={{fontSize:"20px"}}>{allTotalSmsLogs.totalSum}<strong style={{color:"orangered"}}>GB</strong>{' '}</span> 
              <span className="fs-6 fw-normal">
                <img src="https://www.svgrepo.com/show/492653/data.svg" alt="" style={{ width: "40px", marginLeft: "80px", marginTop: "5px", }} />
              </span>
            </>
          }
          title="Total Data Given"
        />
      </CCol> */}

      
   {/*Total SMS Given  */}
      {/* <CCol sm={6} lg={3}>
        <CWidgetStatsA
          className="mb-4"
          color="warning"
          value={
            <>
              <span style={{fontSize:"20px"}}>SMS: {allTotalDataLogs.totalSum}{' '}</span>
              <span className="fs-6 fw-normal">
                <img src="https://www.svgrepo.com/show/209736/sms.svg" alt="" style={{ width: "40px", marginLeft: "80px", marginTop: "5px" }} />
              </span>
            </>
          }
          title="Total SMS Given"
        />
      </CCol> */}



 {/* Total VOICE for Distrubution */}
      <p>Employee Allocation for the month of : <span style={{color:"orangered"}}>{dateTime}</span></p>
      <CCol sm={6} lg={3}>
        <CWidgetStatsA
          className="mb-4"
          color="warning"
          value={
            <>
               <span style={{fontSize:"20px"}}>Voice: NLE {staffinformationTotalSumOfVoice.totalVoiceAllocated}</span>
              <span className="fs-6 fw-normal">
              </span>
              <img src="https://www.svgrepo.com/show/336073/phone-outgoing-one.svg" alt="" style={{ width: "40px", marginLeft: "30px", marginTop: "5px" }} />
             
              
            </>
          }
          title="Total VOICE per month"
        />
      </CCol>


  {/*Total SMS for Distrubution  */}
      <CCol sm={6} lg={3}>
        <CWidgetStatsA
          className="mb-4"
          color="info"
          value={
            <>
              <span style={{fontSize:"20px"}}>SMS: {staffinformationTotalSumOfSms.totalSmsAllocated}{' '}</span>
              <span className="fs-6 fw-normal">
                <img src="https://www.svgrepo.com/show/209736/sms.svg" alt="" style={{ width: "40px", marginLeft: "70px", marginTop: "5px" }} />
              </span>
            </>
          }
          title="Total SMS per Month"
        />
      </CCol>

  {/*Total DATA for Distrubution  */}
      <CCol sm={6} lg={3}>
        <CWidgetStatsA
          className="mb-4"
          color="success"
          value={
            <>
               <span style={{fontSize:"20px"}}>Data: {staffinformationTotalSumOfData.totalDataAllocated}<strong style={{color:"orangered"}}> GB</strong>{' '}</span>
              <span className="fs-6 fw-normal">
                <img src="https://www.svgrepo.com/show/12462/wifi.svg" alt="" style={{ width: "40px", marginLeft: "50px", marginTop: "5px", }} />
              </span>
            </>
          }
          title="Total DATA per month"
        />
      </CCol>

  {/* total number of staffs */}
      <CCol sm={6} lg={3}>
        <CWidgetStatsA
          className="mb-4"
          color="primary"
          value={
            <>
              <span>{staffinformation.length}{' '}</span>
              <span className="fs-6 fw-normal">
                <img src="https://www.svgrepo.com/show/493502/men-and-women-who-bow-and-apologize.svg" alt="" style={{ width: "40px", marginLeft: "150px", marginTop: "5px", }} />
              </span>
            </>
          }
          title="Total Employees"
        />
      </CCol>


        {user && user.role === "admin" && (
        <CCol sm={6} lg={3}>
        <CWidgetStatsA
          className="mb-4"
          color="primary"
          value={
            <>

              <span style={{fontSize:"20px"}}>{users.length}</span>
              <span className="fs-6 fw-normal">
              </span>
              <img src="https://www.svgrepo.com/show/407091/person-pouting-dark-skin-tone.svg" alt="" style={{ width: "40px", marginLeft: "180px", marginTop: "5px" }} />
            </>
          }
          title="Total Users"
        />
      </CCol>

        )}
      

    </CRow>
      </CCard>
  )
}

export default DashboardDesign
