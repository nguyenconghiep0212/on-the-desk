import React, { useEffect } from "react";
import {
  RecoilRoot,
  atom,
  selector,
  useRecoilState,
  useRecoilValue,
} from "recoil";
// API
// import { fetchLandingData } from "api/index";
// COMPONENTS
import Header from "./components/header";
// STORE
import { currentTab } from "store/root.ts";
import { Box, Typography } from "@mui/material";

interface TabPanelProps {
  children?: React.ReactNode;
  index: number;
  value: number;
}
function CustomTabPanel(props: TabPanelProps) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box sx={{ p: 3 }}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

function Landing() {
  const [tab] = useRecoilState(currentTab);

  // async function getCat() {
  //   const params = {
  //     limit: 10,
  //     offset: 0,
  //   };
  //   const res = await fetchLandingData(params);
  //   if(res){
  //     console.log(res)
  //   }
  // }

  return (
    <div className="text-white">
      {tab}
      <Header />
      {/* <CustomTabPanel value={value} index={0}>
        Item One
      </CustomTabPanel>
      <CustomTabPanel value={value} index={1}>
        Item Two
      </CustomTabPanel> */}
    </div>
  );
}

export default Landing;
