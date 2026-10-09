import React from "react";
import { TreeItem } from "@mui/lab";

const Items = ({ id, first_name, herEmployes }) => {
  const hasChildren = first_name && herEmployes?.length;

  return (
    <>
      <TreeItem nodeId={id} label={first_name}>
        {hasChildren &&
          herEmployes?.map((manager) => (
            <Items key={manager.id} {...manager} />
          ))}
      </TreeItem>
    </>
  );
};
export default Items;
