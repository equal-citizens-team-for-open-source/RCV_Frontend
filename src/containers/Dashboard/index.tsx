import React, { Component } from "react";

import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import IconButton from "@material-ui/core/IconButton";
import MenuIcon from "@material-ui/icons/Menu";
import SwipeableViews from "react-swipeable-views";
import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";
import CurrentElections from "./CurrentElections";

import "./Dashboard.sass";

interface ITabContainerProps {
  children?: React.ReactNode;
  dir: string;
}
const TabContainer = ({ children, dir }: ITabContainerProps) => (
  <Typography component="div" dir={dir} style={{ padding: 8 * 3 }}>
    {children}
  </Typography>
);

enum TabListing {
  currentElections,
  upcomingElections,
  myCreatedElections,
  myVotedElections,
  electionResults
}

class Dashboard extends Component<{ userId: string }> {
  public state: { selectedTab: TabListing } = {
    selectedTab: TabListing.currentElections
  };
  public handleTabChange = (
    _event: React.ChangeEvent<{}>,
    newValue: TabListing
  ) => {
    console.log(newValue);
    this.setState({ selectedTab: newValue });
  };
  public handleSwipe = (newValue: TabListing) => {
    this.setState({ selectedTab: newValue });
  };
  public render() {
    const { userId } = this.props;
    const { selectedTab } = this.state;
    return (
      <div>
        <AppBar className="app-bar" position="static">
          <Toolbar className="app-bar__toolbar">
            <IconButton
              className="app-bar__menu-button"
              edge="start"
              color="inherit"
              aria-label="Menu"
            >
              <MenuIcon />
            </IconButton>
            <Typography variant="h6" className="app-bar__title">
              Dashboard for {userId}
            </Typography>
            <Button color="inherit">Login</Button>
          </Toolbar>
        </AppBar>
        <Tabs
          value={selectedTab}
          onChange={this.handleTabChange}
          indicatorColor="primary"
          textColor="primary"
          variant="fullWidth"
        >
          <Tab
            label="Current Elections/Vote Now"
            value={TabListing.currentElections}
          />
          <Tab
            label="Upcoming Elections"
            value={TabListing.upcomingElections}
          />
          <Tab
            label="Elections You Created"
            value={TabListing.myCreatedElections}
          />
          <Tab
            label="Elections You Voted In"
            value={TabListing.myVotedElections}
          />
          <Tab label="Election Results" value={TabListing.electionResults} />
        </Tabs>
        <SwipeableViews
          axis={"x"}
          index={selectedTab}
          onChangeIndex={this.handleSwipe}
        >
          <TabContainer dir={"ltr"}>
            <CurrentElections />
          </TabContainer>
          <TabContainer dir={"ltr"}>Item Two</TabContainer>
          <TabContainer dir={"ltr"}>Item Three</TabContainer>
          <TabContainer dir={"ltr"}>Item Four</TabContainer>
          <TabContainer dir={"ltr"}>Item Five</TabContainer>
        </SwipeableViews>
      </div>
    );
  }
}

export default Dashboard;
