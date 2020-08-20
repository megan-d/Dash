import React, { Fragment, useContext, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Wrapper from '../../layout/Wrapper';
import Spinner from '../../layout/Spinner';
import Button from '@material-ui/core/Button';
import DeleteIcon from '@material-ui/icons/Delete';
import { TicketContext } from '../../../context/tickets/TicketContext';
import { ProjectContext } from '../../../context/projects/ProjectContext';
import ConfirmationNumberIcon from '@material-ui/icons/ConfirmationNumber';
import styled from 'styled-components';

const StyledLink = styled(Link)`
  color: white;
  background: grey;
  text-decoration: none;
  border-radius: 3px;
  padding: 10px;
  font-size: 14px;
  max-width: 160px;
  text-align: center;
  margin: 10px 0px;
  display: block;
  font-weight: bold;
  font-family: Roboto, sans-serif;
`;

const Ticket = (props) => {
  const { ticket, getTicketDetails, deleteTicket, isLoading } = useContext(TicketContext);

  useEffect(() => {
    getTicketDetails(props.match.params.ticketid);
  }, []);

  return (
    <Wrapper>
      {!ticket || isLoading ? (
        <Spinner />
      ) : (
        <Fragment>
          <ConfirmationNumberIcon />
          <div>{ticket.title}</div>
          <div>{ticket.description}</div>
          <ul>Ticket comments:</ul>
          {ticket.comments.length === 0 && !isLoading ? (
            <p>There are no comments for this ticket</p>
          ) : (
            ticket.comments.map((el) => <li key={el._id}>{el.text}</li>)
          )}
          <StyledLink
            variant='contained'
            color='primary'
            to={`/projects/tickets/comment/${ticket._id}`}
          >
            Comment on Ticket
          </StyledLink>
              <StyledLink
                variant='contained'
                color='primary'
                to={`/projects/tickets/updateticket/${ticket._id}`}
              >
                Edit Ticket
              </StyledLink>
          <Button
            variant='contained'
            color='secondary'
            startIcon={<DeleteIcon />}
            onClick={async () =>
              deleteTicket(ticket.project._id, ticket._id, props.history)
            }
          >
            Delete Ticket
          </Button>
        </Fragment>
      )}
    </Wrapper>
  );
};

export default Ticket;
