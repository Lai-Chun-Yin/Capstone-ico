import * as PropTypes from 'prop-types';
import * as React from 'react';
// tslint:disable-next-line:no-var-requires
const withStyles = require("@material-ui/core/styles").withStyles;
import LinearProgress from '@material-ui/core/LinearProgress';

const styles = {
  root: {
    flexGrow: 1,
  },
};

const LinearIndeterminate: React.StatelessComponent = (props:any) => {
  const { classes } = props;
  return (
    <div className={classes.root}>
      <LinearProgress />
      {/* <LinearProgress color="secondary" /> */}
    </div>
  );
}

LinearIndeterminate.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(LinearIndeterminate);