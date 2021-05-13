// import from react
import React, { Fragment } from "react";
import TreeView from "@material-ui/lab/TreeView";
import TreeItem from "@material-ui/lab/TreeItem";
import { makeStyles } from "@material-ui/core/styles";
import {
  Checkbox,
  FormControlLabel,
  Grid,
  SvgIcon,
  fade,
} from "@material-ui/core";

const useItemStyles = makeStyles((theme) => ({
  root: {
    "& > .MuiTreeItem-content > .MuiTreeItem-label": {
      display: "flex",
      alignItems: "center",
      padding: "4px 0",
      background: "transparent !important",
      pointerEvents: "none",
    },
    "& > .MuiTreeItem-content  > .MuiTreeItem-label::before": {
      content: "''",
      display: "inline-block",
      width: 12,
      height: 12,
      marginRight: 8,
      border: "1px solid #ccc",
      background: "white",
    },
  },
  iconContainer: {
    marginRight: 12,
    "& > svg": {
      padding: 8,
      "&:hover": {
        opacity: 0.6,
      },
    },
  },
  label: {
    padding: 0,
  },
  selected: {
    "& > .MuiTreeItem-content  > .MuiTreeItem-label::before": {
      background: theme.palette.primary.main,
      border: "1px solid transparent",
    },
  },
  group: {
    marginLeft: 7,
    paddingLeft: 18,
    border: `1px solid ${fade(theme.palette.text.primary, 0.4)}`,
  },
}));

const TreeViewTable = (props) => {
  const classesItem = useItemStyles();

  const getHeaderName = () => {
    const { tableData, treeLabel } = props;
    const head = Object.keys(tableData[0]);
    head.splice(head.indexOf(treeLabel), 1);
    return head;
  };

  const MinusButton = () => {
    return (
      <SvgIcon fontSize="inherit" style={{ width: 14, height: 14 }}>
        <path d="M22.047 22.074v0 0-20.147 0h-20.12v0 20.147 0h20.12zM22.047 24h-20.12q-.803 0-1.365-.562t-.562-1.365v-20.147q0-.776.562-1.351t1.365-.575h20.147q.776 0 1.351.575t.575 1.351v20.147q0 .803-.575 1.365t-1.378.562v0zM17.873 11.023h-11.826q-.375 0-.669.281t-.294.682v0q0 .401.294 .682t.669.281h11.826q.375 0 .669-.281t.294-.682v0q0-.401-.294-.682t-.669-.281z" />
      </SvgIcon>
    );
  };

  const PlusButton = () => {
    return (
      <SvgIcon fontSize="inherit" style={{ width: 14, height: 14 }}>
        <path d="M22.047 22.074v0 0-20.147 0h-20.12v0 20.147 0h20.12zM22.047 24h-20.12q-.803 0-1.365-.562t-.562-1.365v-20.147q0-.776.562-1.351t1.365-.575h20.147q.776 0 1.351.575t.575 1.351v20.147q0 .803-.575 1.365t-1.378.562v0zM17.873 12.977h-4.923v4.896q0 .401-.281.682t-.682.281v0q-.375 0-.669-.281t-.294-.682v-4.896h-4.923q-.401 0-.682-.294t-.281-.669v0q0-.401.281-.682t.682-.281h4.923v-4.896q0-.401.294-.682t.669-.281v0q.401 0 .682.281t.281.682v4.896h4.923q.401 0 .682.281t.281.682v0q0 .375-.281.669t-.682.294z" />
      </SvgIcon>
    );
  };

  const renderInnerTreeView = (obj, parentIndex, index) => {
    const { treeLabel, gridTemplate } = props;
    const heads = getHeaderName();
    return (
      <TreeItem
        group={classesItem.group}
        classes={classesItem}
        key={parentIndex + "_" + index}
        nodeId={"list" + parentIndex + "_" + index}
        label={
          <Grid container>
            <Grid item md={1}>
              <FormControlLabel
                control={<Checkbox name="checkedB" color="primary" />}
              />
            </Grid>
            {heads.map((head, index) => {
              return (
                <Grid
                  key={"item" + parentIndex + "_" + index}
                  item
                  md={gridTemplate[index]}
                >
                  {obj[head]}
                </Grid>
              );
            })}
          </Grid>
        }
      >
        {obj.hasOwnProperty(treeLabel) &&
          obj[treeLabel].map((item, ind) => {
            return renderInnerTreeView(item, parentIndex + "_" + index, ind);
          })}
      </TreeItem>
    );
  };

  const { tableData, treeLabel, label, gridTemplate } = props;
  const heads = getHeaderName();
  return (
    <Fragment>
      <Grid container>
        <Grid item md={1}></Grid>
        {heads.map((head, index) => {
          return (
            <Grid key={index} item md={gridTemplate[index]}>
              <strong>{head.toUpperCase()}</strong>
            </Grid>
          );
        })}
      </Grid>
      <TreeView
        defaultCollapseIcon={MinusButton()}
        defaultExpandIcon={PlusButton()}
      >
        {tableData.map((row, index) => {
          const node = (
            <Grid container key={label + "_" + index}>
              <Grid item md={1}>
                <FormControlLabel
                  control={<Checkbox name="checkedB" color="primary" />}
                />
              </Grid>
              {heads.map((head, index) => {
                return (
                  <Grid key={"head" + index} item md={gridTemplate[index]}>
                    {row[head]}
                  </Grid>
                );
              })}
            </Grid>
          );
          const wrapper = React.createRef();
          return (
            <TreeItem
              group={classesItem.group}
              classes={classesItem}
              ref={wrapper}
              key={index}
              nodeId={"list" + index}
              label={node}
            >
              {row[treeLabel].map((sub, ind) => {
                return renderInnerTreeView(sub, index, ind);
              })}
            </TreeItem>
          );
        })}
      </TreeView>
    </Fragment>
  );
};

export default TreeViewTable;
