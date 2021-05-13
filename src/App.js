// import logo from './logo.svg';
import React, { useState, useEffect } from "react";
import axios from "axios";
import "./App.css";
import {
  Grid,
  FormControl,
  FormControlLabel,
  FormLabel,
  Radio,
  RadioGroup,
} from "@material-ui/core";
import ControlledTreeView from "./Component/ControlledTreeView";
import TreeViewTable from "./Component/TreeViewTable";
import Sidebar from "./Component/Sidebar";

function App() {
  const [listData, setListData] = useState({});
  const [dataKey, setDataKey] = useState([]);
  const [value, setValue] = useState("");

  useEffect(() => {
    loadData();
  }, []);

  const loadData = () => {
    axios.get("http://localhost:3009/").then((response) => {
      const key = Object.keys(response.data);
      setListData(response.data);
      setDataKey(key);
    });
  };

  const handleRadioChange = (e) => {
    setValue(e.target.value);
  };
  return (
    <Grid container>
      <Grid item md={2}>
        <Sidebar
          value={value}
          hangleChange={handleRadioChange}
          dataKey={dataKey}
        />
      </Grid>
      <Grid md={10}>
        {listData[value] && (
          <TreeViewTable
            tableData={listData[value]}
            treeLabel="tree"
            gridTemplate={[2, 2]}
            label={value}
          />
        )}
      </Grid>
    </Grid>
    // <div className="App">
    //   <ControlledTreeView />
    // </div>
  );
}

export default App;
