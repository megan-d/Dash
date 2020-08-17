import React, { useContext, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import AlertBanner from '../../layout/AlertBanner';
import { TicketContext } from '../../../context/tickets/TicketContext';
import { ProjectContext } from '../../../context/projects/ProjectContext';
import Wrapper from '../../layout/Wrapper';
import Spinner from '../../layout/Spinner';
import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import TextField from '@material-ui/core/TextField';
import Paper from '@material-ui/core/Paper';
import DateFnsUtils from '@date-io/date-fns';
import {
  MuiPickersUtilsProvider,
  KeyboardDatePicker,
} from '@material-ui/pickers';
import FormControl from '@material-ui/core/FormControl';
import InputLabel from '@material-ui/core/InputLabel';
import Select from '@material-ui/core/Select';
import styled from 'styled-components';

const StyledGreyLink = styled(Link)`
  color: white;
  font-family: Roboto, sans-serif;
  background-color: #808080;
  text-decoration: none;
  border-radius: 3px;
  padding: 10px;
  font-size: 14px;
  max-width: 160px;
  text-align: center;
  margin: 10px 0px;
  display: block;
  font-weight: bold;
  box-shadow: 2px 2px 5px rgba(0, 0, 0, 0.25);
  display: inline-block;
`;

const StyledRedLink = styled(Link)`
  color: white;
  font-family: Roboto, sans-serif;
  background-color: #f50757;
  text-decoration: none;
  border-radius: 3px;
  padding: 10px;
  font-size: 14px;
  max-width: 150px;
  text-align: center;
  margin: 10px 0px;
  display: block;
  font-weight: bold;
  box-shadow: 2px 2px 5px rgba(0, 0, 0, 0.25);
  display: inline-block;
`;

const StyledBlueButton = styled.button`
  color: white;
  font-family: Roboto, sans-serif;
  cursor: pointer;
  background-color: #3f51b5;
  text-decoration: none;
  border: none;
  border-radius: 3px;
  padding: 10px;
  font-size: 14px;
  max-width: 150px;
  text-align: center;
  margin: 10px 0px;
  display: block;
  font-weight: bold;
  box-shadow: 2px 2px 5px rgba(0, 0, 0, 0.25);
  display: inline-block;
`;

const useStyles = makeStyles((theme) => ({
  root: {
    // height: '100vh',
  },
  paper: {
    margin: theme.spacing(4, 4),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
  },
  form: {
    width: '100%', // Fix IE 11 issue.
    marginTop: theme.spacing(1),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
  formControl: {
    margin: theme.spacing(1),
    minWidth: 120,
  },
  selectEmpty: {
    marginTop: theme.spacing(2),
  },
  textField: {
    marginLeft: theme.spacing(1),
    marginRight: theme.spacing(1),
    width: 200,
  },
  buttons: {
    marginRight: '10px',
    marginTop: '20px',
  },
  findButton: {
    fontSize: '11px',
    marginBottom: '10px',
    marginTop: '1px',
  },
}));

export default function UpdateTicket(props) {
  const classes = useStyles();

  const { ticket, updateTicket } = useContext(TicketContext);

  const { project } = useContext(ProjectContext);

  const [formData, updateFormData] = useState({
    title: '',
    type: '',
    description: '',
    priority: '',
    assignedDeveloper: '',
    history: '',
    status: '',
    resolutionSummary: '',
    dateDue: '',
    dateCompleted: '',
  });

  //TODO: Need to fix how target completion date is shown in placeholder text.
  //TODO: Need to find way to display username rather than id. Try populate.
  // const [dateDue, setSelectedDueDate] = useState(new Date());
  // const [completionDate, setSelectedCompletionDate] = useState(null);

  // const handleTargetDateChange = (date) => {
  //   setSelectedTargetDate(date);
  // };

  // const handleCompletionDateChange = (date) => {
  //   setSelectedCompletionDate(date);
  // };

  //Pull out variables from formData and userData
  const {
    title,
    type,
    description,
    priority,
    assignedDeveloper,
    history,
    status,
    resolutionSummary,
    dateDue,
    dateCompleted,
  } = formData;

  // Function to update state on change using updateFormData
  const onChange = (e) =>
    updateFormData({ ...formData, [e.target.name]: e.target.value });

  //Function to send data that's in formData to database endpoint when submit is clicked
  const onSubmit = async (e) => {
    e.preventDefault();
    const ticketUpdates = {
      title: title,
      type: type,
      description: description,
      priority: priority,
      assignedDeveloper: assignedDeveloper,
      history: history,
      status: status,
      resolutionSummary: resolutionSummary,
      dateDue: dateDue,
      dateCompleted: dateCompleted,
    };
    //call add project action
    await updateTicket(ticketUpdates, project._id, ticket._id, props.history);
  };

  return (
    <Wrapper>
      <h2>Update Ticket</h2>
      <hr></hr>

      {!ticket ? (
        <Spinner />
      ) : (
        <Grid container component='main' className={classes.root}>
          <Grid
            item
            xs={12}
            sm={8}
            md={8}
            component={Paper}
            elevation={6}
            square
          >
            <div className={classes.paper}>
              <form
                className={classes.form}
                action=''
                onSubmit={(e) => onSubmit(e)}
              >
                <TextField
                  autoComplete='title'
                  label='Title'
                  placeholder={ticket.title}
                  name='title'
                  variant='outlined'
                  fullWidth
                  id='title'
                  autoFocus
                  value={title}
                  onChange={(e) => onChange(e)}
                  margin='normal'
                  InputLabelProps={{
                    shrink: true,
                  }}
                />
                <FormControl variant='outlined' className={classes.formControl}>
                  <InputLabel htmlFor='history'>Change Type</InputLabel>
                  <Select
                    required
                    native
                    value={history}
                    onChange={(e) => onChange(e)}
                    label='Type of Change'
                    inputProps={{
                      name: 'history',
                      id: 'history',
                    }}
                  >
                    <option aria-label='None' value='' />
                    <option value={'UpdateDetails'}>
                      Update Ticket Details
                    </option>
                    <option value={'UpdateAssignedDev'}>
                      Update Assigned Dev
                    </option>
                    <option value={'UpdateStatus'}>Update Status</option>
                    <option value={'Completed'}>Add Info for Completion</option>
                    <option value={'Other'}>Other</option>
                  </Select>
                </FormControl>
                <AlertBanner />
                <StyledBlueButton
                  type='submit'
                  className={classes.buttons}
                  onClick={(e) => onSubmit(e)}
                >
                  SUBMIT
                </StyledBlueButton>
                <StyledRedLink
                  to={`/ticket/${ticket._id}`}
                  className={classes.buttons}
                >
                  CANCEL
                </StyledRedLink>
              </form>
            </div>
          </Grid>
        </Grid>
      )}
    </Wrapper>
  );
}
