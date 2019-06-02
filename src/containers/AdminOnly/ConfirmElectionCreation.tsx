import React, { Fragment } from "react";
import Typography from "@material-ui/core/Typography";

const ConfirmElectionCreation = (props: any) => {
  return (
    <Fragment>
      <Typography component="h6" variant="h6" align="left">
        Thank you. The election has been stored in the database.
      </Typography>
      <pre>{JSON.stringify(props, null, 2)}</pre>
    </Fragment>
  );
};

export default ConfirmElectionCreation;
