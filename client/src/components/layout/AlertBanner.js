import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Alert from '@material-ui/lab/Alert';

const useStyles = makeStyles((theme) => ({
  root: {
    width: '100%',
    '& > * + *': {
      marginTop: theme.spacing(2),
    },
  },
}));

const AlertBanner = (props) => {
  const classes = useStyles();
  return (
    <div className={classes.root}>
      {props.errors !== null &&
        props.errors.length > 0 &&
        props.errors.map((el, index) => (
          <Alert severity='error' key={index}>
            {el.msg}
          </Alert>
        ))}
    </div>
  );
};

export default AlertBanner;