import React, { Fragment, useContext, useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { useHistory } from 'react-router-dom';
import { ProjectContext } from '../../context/projects/ProjectContext';
import { AuthContext } from '../../context/auth/AuthContext';
import CssBaseline from '@material-ui/core/CssBaseline';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import PlainHeader from '../layout/PlainHeader';
import Footer from '../layout/Footer';

const useStyles = makeStyles((theme) => ({
  root: {
    minWidth: 250,
    width: 160,
    margin: '5px',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between',
    color: '#333333',
    minHeight: '100vh',
  },
  bullet: {
    display: 'inline-block',
    margin: '0 2px',
    transform: 'scale(0.8)',
  },
  title: {
    fontSize: 17,
    fontWeight: 500,
    fontStyle: 'italic',
  },
  pos: {
    marginBottom: 12,
  },
  content: {
    flexGrow: 1,
    minHeight: '97vh',
    overflow: 'auto',
    position: 'relative',
  },
}));

export default function DemoPage(props) {
  const { getUserProjects, clearProject, createDemoProject1, createDemoProject2 } = useContext(ProjectContext);

  const { user, loadUser, isAuthenticated, login } = useContext(AuthContext);

  const classes = useStyles();

  useEffect(() => {
    loadUser();
  }, [isAuthenticated]);

  // //on button click, run function that generates projects, tickets, sprints, and comments and then redirect to dashboard
  // const generateDemoData = async (e) => {
  //     e.preventDefault();
  //     props.history.push('/dashboard')
  // }

 const loginDemo = async (e) => {
  e.preventDefault();
    const demo = {
      email: 'jamie@demo.com',
      password: '11111111',
    };
    await login(demo);
    props.history.push('/dashboard')
  };

  return (
    <Fragment>
      <CssBaseline />
      <PlainHeader />
      <main className={classes.content}>
        <div style={{ margin: '20vh 20vw 0 20vw', textAlign: 'center' }}>
          <p>
            This demo features allows you to login with demo user credentials. The demo profile has pre-populated data to allow you to explore the application better. Click the button
            below to begin exploring all of the functionality, like adding
            projects, exploring developer profiles, and more!
          </p>
          <Button
            variant='contained'
            style={{ backgroundColor: '#43aa8b', color: '#f3f3f3' }}
            onClick={(e) => loginDemo(e)}
          >
            Try it Now
          </Button>
        </div>
      </main>

      <Footer />
    </Fragment>
  );
}
