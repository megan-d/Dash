import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { useHistory } from 'react-router-dom';
import Card from '@material-ui/core/Card';
import Grid from '@material-ui/core/Grid';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import Avatar from '@material-ui/core/Avatar';

const useStyles = makeStyles({
  root: {
    minWidth: 200,
    width: 200,
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    marginLeft: 10,
    marginBottom: 10
  },
  bullet: {
    display: 'inline-block',
    margin: '0 2px',
    transform: 'scale(0.8)',
  },
  title: {
    fontSize: 14,
  },
  pos: {
    marginBottom: 6,
  },
  centered: {
    display: 'flex',
    alignItems: 'center',
    marginBottom: '10px',
    paddingTop: '2px'
  },
});

export default function ProfileCard({ username, skills, id, color }) {
  const classes = useStyles();

  let history = useHistory();
  let skillsList = skills;
  let skillsCut = skillsList.slice(0, 5);

  return (
    <Card className={classes.root}>
      <CardContent style={{paddingLeft: '8px', paddingBottom: 0}}>
        <div className={classes.centered}>
          <Avatar
            //   className={classes.root}
            style={{
              height: '40px',
              width: '40px',
              // color: '#e5e0db',
              backgroundColor: color,
              marginRight: '10px',
              padding: 0
            }}
          ></Avatar>

          <Typography variant='h6' component='h2'>
            {username}
          </Typography>
        </div>

        <Typography
          className={(classes.pos, classes.bullet)}
          color='textSecondary'
        >
          {skillsCut.map((el) => (
            <li>{el}</li>
          ))}
        </Typography>
      </CardContent>
      <CardActions>
        <Button
          onClick={async () => {
            history.push(`/profiles/${id}`);
          }}
        >
          View Profile
        </Button>
      </CardActions>
    </Card>
  );
}
