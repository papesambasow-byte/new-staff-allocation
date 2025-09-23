import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import moment from "moment";
import { useSelector } from "react-redux";
import "@coreui/coreui/dist/css/coreui.min.css";
import {
  CButton,
  CModal,
  CModalHeader,
  CModalTitle,
  CModalBody,
  CModalFooter,
} from "@coreui/react";
import {MdOutlineCancel } from "react-icons/md";
import { GiConfirmed } from "react-icons/gi";
import { BiEdit } from "react-icons/bi";
import "datatables.net-dt/js/dataTables.dataTables";
import "datatables.net-dt/css/jquery.dataTables.min.css";
import "datatables.net-buttons/js/dataTables.buttons.js";
import "datatables.net-buttons/js/buttons.colVis.js";
import "datatables.net-buttons/js/buttons.flash.js";
import "datatables.net-buttons/js/buttons.html5.js";
import "datatables.net-buttons/js/buttons.print.js";
import "datatables.net-buttons/js/buttons.flash.min.js";
import * as jzip from "jszip";
import "pdfmake";
import "datatables.net-dt/css/jquery.dataTables.min.css";
import $ from "jquery";
import pdfMake from "pdfmake/build/pdfmake";
import pdfFonts from "pdfmake/build/vfs_fonts";
pdfMake.vfs = pdfFonts.pdfMake.vfs;
window.JSZip = jzip;

const ActivateUsersList = () => {
  const [userInActive, setUserInActive] = useState([]);
  const [visible, setVisible] = useState(false);
  const [userIdToUpdate, setUserIdToUpdate] = useState(null);

  const { user } = useSelector((state) => state.auth);

  const currentDate = moment().format("DD-MM-YYYY");
  const date = new Date();
  const current_time =
    date.getHours() +
    ":" +
    " " +
    date.getMinutes() +
    ":" +
    " " +
    date.getSeconds();
  const today = current_time + "  " + currentDate;

  useEffect(() => {
    getUserInActive();
  }, []);

  const getUserInActive = async () => {
    const token = localStorage.getItem("token");
    const authHeader = `Bearer ${token}`;

    try {
      const response = await axios.get(
        "http://172.25.160.235:2402/userInActive",
        {
          headers: {
            Authorization: authHeader,
          },
        }
      );
      setUserInActive(response.data);
      console.log(response);
    } catch (error) {
      console.error("Error:", error);
    }
  };

  const handleUpdateClick = (id) => {
    setUserIdToUpdate(id);
    setVisible(true);
  };

  const confirmUpdate = async () => {
    const token = localStorage.getItem("token");
    const authHeader = `Bearer ${token}`;
    try {
      await axios.patch(
        `http://172.25.160.235:2402/activateUser/${userIdToUpdate}`,
        null,
        {
          headers: {
            Authorization: authHeader,
          },
        }
      );
      getUserInActive();
      setVisible(false);
      setUserIdToUpdate(null);
      window.location.reload();
    } catch (error) {
      console.error("Error:", error);
    }
  };

   //data table
   $("#stsTokenDisplay").DataTable().destroy();
   setTimeout(() => {
     $(document).ready(function () {
       $("#stsTokenDisplay").DataTable({
         pagingType: "full_numbers",
         pageLength: 10,
         destroy: true,
         processing: true,
         dom: "Bfrtip",
         buttons: [
           {
             extend: "copy",
             className: "btn btn-primary",
           },
           {
             extend: "csv",
             className: "btn btn-success",
           },
           {
             extend: "pdf",
             className: "btn btn-danger",
            //  orientation: 'landscape',
           },
           {
             extend: "print",
             className: "btn btn-info",
           },
         ],
         initComplete: function () {
           $(".btn-primary");
           $(".btn-success");
           $(".btn-danger");
           $(".btn-info");
         },
       });
     });
   });

  return (
    <div style={{ width: "98%", marginRight: "auto", marginLeft: "auto", marginTop: "40px" }}>
      <table
        className="table is-striped is-fullwidth"
        id="stsTokenDisplay"
        style={{
          fontSize: "15px",
          boxShadow: "rgba(100, 100, 111, 0.2) 0px 7px 29px 0px",
        }}
      >
        <thead>
          <tr>
            <th>No</th>
            <th>Name</th>
            <th>Phone</th>
            <th>Email</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {userInActive.map((userInActive, index) => (
            <tr key={userInActive.id}>
              <td>{index + 1}</td>
              <td>{userInActive.userName}</td>
              <td>{userInActive.userPhone}</td>
              <td>{userInActive.userEmail}</td>
              <td>
                <CButton
                  className="btn bg-info"
                  style={{ fontWeight: 700 }}
                  onClick={() => handleUpdateClick(userInActive.id)}
                >
                  <BiEdit />
                </CButton>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <CModal visible={visible} onClose={() => setVisible(false)}>
        <CModalHeader onClose={() => setVisible(false)}>
          <CModalTitle>Confirm Update</CModalTitle>
        </CModalHeader>
        <CModalBody>Are you sure you want to update this user?</CModalBody>
        <CModalFooter>
          <CButton color="secondary" onClick={() => setVisible(false)}>
            <MdOutlineCancel /> Cancel
          </CButton>
          <CButton color="info" onClick={confirmUpdate}>
            <GiConfirmed /> Confirm
          </CButton>
        </CModalFooter>
      </CModal>
    </div>
  );
};

export default ActivateUsersList;
