import React from "react";
import { Route, Router } from "react-router-dom";
import CreateElection from "../containers/AdminOnly/CreateElection";
import App from "../containers/App/App";
import AuthCallback from "../containers/AuthCallback/AuthCallback";
import Election from "../containers/Election/Election";
import ElectionResults from "../containers/ElectionResults/ElectionResults";

import Ballot from "../containers/Ballot";
import Dashboard from "../containers/Dashboard";
import history from "../history";
import { store } from "../index";
import { handleAuthentication } from "../store/actions/auth";

import mockCandidates from "../mockData/mockCandidates";

const doAuthenticate = (nextState: any, _replace?: any) => {
  if (/access_token|id_token|error/.test(nextState.location.hash)) {
    handleAuthentication()(store.dispatch);
  }
};

export const makeMainRoutes = () => (
  <Router history={history}>
    <div>
      <Route exact path="/" render={props => <App {...props} />} />
      <Route
        exact
        path="/auth_callback"
        render={(props: any) => {
          doAuthenticate(props);
          return <AuthCallback {...props} />;
        }}
      />
      <Route
        exact
        path="/election/:electionId"
        render={(props: any) => {
          const { electionId } = props.match.params;
          return <Election electionId={electionId} {...props} />;
        }}
      />
      <Route
        exact
        path="/election/:electionId/ballot"
        render={(props: any) => {
          const { electionId } = props.match.params;
          return (
            <Ballot
              candidateList={mockCandidates}
              electionId={electionId}
              {...props}
            />
          );
        }}
      />
      <Route
        exact
        path="/election/:electionId/results"
        render={(props: any) => {
          const { electionId } = props.match.params;
          return <ElectionResults electionId={electionId} {...props} />;
        }}
      />
      <Route
        exact
        path="/admin/create-election"
        render={(props: any) => {
          return <CreateElection {...props} />;
        }}
      />

      <Route
        exact
        path="/dashboard/:userId"
        render={(props: any) => {
          const { userId } = props.match.params;
          return <Dashboard userId={userId} />;
        }}
      />
    </div>
  </Router>
);

export default makeMainRoutes;
