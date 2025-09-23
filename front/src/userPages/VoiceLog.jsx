import React, { useEffect } from "react";
import Layout from "../pages/Layout";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { getMe } from "../features/authSlice";
import VoiceLogsList from "../userComponent/VoiceLogsList";

const VoiceLog = () => {
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

  return (
    <Layout>
      <VoiceLogsList />
    </Layout>
  );
};

export default VoiceLog;
