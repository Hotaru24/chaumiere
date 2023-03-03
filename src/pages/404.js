import React, { useEffect } from "react";
import { navigate } from "gatsby";

import CircularProgress from '@mui/material/CircularProgress';

import Layout from "../components/Layout/Layout";


const NotFoundPage = () => {
  useEffect(() => {
    if (localStorage.getItem('locale')) {
     const locale = localStorage.getItem('locale');    
     navigate(`/${locale}/home`);
    }    
  }, []);

  return (
    <Layout>
      <div className="spinner-page">
        <CircularProgress />
      </div>
    </Layout>
  )
}

export default NotFoundPage;
