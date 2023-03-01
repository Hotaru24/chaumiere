import React, { useEffect } from "react";
import { navigate } from "gatsby";

import CircularProgress from '@mui/material/CircularProgress';


const NotFoundPage = () => {
  useEffect(() => {
    if (localStorage.getItem('locale')) {
     const locale = localStorage.getItem('locale');    
     navigate(`/${locale}/home`);
    }
  }, []);

  return (
    <CircularProgress />
  )
}

export default NotFoundPage;
