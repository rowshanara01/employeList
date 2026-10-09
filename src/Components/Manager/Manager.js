import React, { useEffect, useState } from "react";
import { styled } from "@mui/material/styles";

import MuiAccordion from "@mui/material/Accordion";

import { TreeView } from "@mui/lab";
import { ChevronRight, ExpandMore } from "@mui/icons-material";
import axios from "axios";
import Items from "../Items/Items";

const Manager = () => {
  const [userInfo, setUserInfo] = useState([]);
  useEffect(() => {
    axios
      .get(
        "https://opensheet.elk.sh/1gH5Kle-styszcHF2G0H8l1w1nDt1RhO9NHNCpHhKK0M/employees"
      )
      .then((res) => setUserInfo(res.data));
  }, []);

  const id = [];
  userInfo.filter((user) =>
    user.manager_id.length > 1 ? id.push(user.manager_id) : ""
  );

  let managers = [];
  userInfo.filter((user) =>
    user.manager_id.length > 0 ? managers.push(user) : ""
  );

  // const useEmployes = (employes) => {
  //   const data = formateTheData(employes);
  //   if (data.length == 0) {
  //     return employes;
  //   }
  //   return useEmployes(data);
  // };

  const useEmployes = (employes) => {
    const data = formateTheData(employes);
    const data2 = formateTheData(data);
    const data3 = formateTheData(data2);
    const data4 = formateTheData(data3);
    return data4;
  };

  const formateTheData = (employes) => {
    const formatedData = [];

    employes.forEach((employe) => {
      const id = employe.id;
      const herEmployes = employes?.filter(
        (employe) => employe?.manager_id === id
      );
      if (herEmployes.length) {
        const empWmanager = { ...employe, herEmployes };
        formatedData.push(empWmanager);
      }
    });
    return formatedData;
  };

  const managersData = useEmployes(managers);
  if (managersData.length < 1) {
    return;
  }
  console.log("ma", managersData);
  if (managersData.length < 1) {
    return;
  }

  return (
    <TreeView
      aria-label="file system navigator"
      defaultCollapseIcon={<ExpandMore />}
      defaultExpandIcon={<ChevronRight />}
      sx={{ width: 500, flexGrow: 1, mx: "auto", mt: 3 }}
    >
      {managersData.map((manager) => (
        <Items key={manager.id} {...manager} />
      ))}
    </TreeView>
  );
};

export default Manager;
