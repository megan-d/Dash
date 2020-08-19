import React, { useEffect, useContext, Fragment } from 'react';
import { useHistory } from 'react-router-dom';
import { SprintContext } from '../../../context/sprints/SprintContext';
import Wrapper from '../../layout/Wrapper';
import Spinner from '../../layout/Spinner';
import MaterialTable from 'material-table';

const Sprints = () => {

  const { sprints, sprint, isLoading, getUserSprints, clearSprint } = useContext(SprintContext);

  useEffect(() => {
    getUserSprints();
    clearSprint();
  }, []);

  const columns = [
    { title: 'Title', field: 'title' },
    { title: 'Start Date', field: 'startDate' },
    { title: 'Planned End Date', field: 'plannedEndDate' },
    { title: 'Status', field: 'status' },
  ];

  let history = useHistory();

  //TODO: Need to fix loading so there aren't two spinners. One is coming from PrivateRoute component
  return (
    <Wrapper>
      {isLoading && !sprint ? (
        <Fragment>
          <h2>My Sprints</h2>
          <p>
            View your sprints. Select a sprint to view details.
          </p>
          <hr></hr>
          <Spinner />
        </Fragment>
      ) : (
        <Fragment>
          <h2>My Sprints</h2>
          <p>
            View your sprints. Select a sprint to view details.
          </p>
          <hr></hr>
          <MaterialTable
            localization={{
              header: {
                actions: '',
              },
            }}
            title='Sprints'
            columns={columns}
            data={sprints}
            onRowClick={async (event, rowData) => {
              history.push(`/sprint/${rowData._id}`)
            }}
            options={{
              pageSize: 5,
              pageSizeOptions: [5, 10, 20, 30],
              toolbar: true,
              paging: true,
          }}
          />
        </Fragment>
      )}
    </Wrapper>
  );
};

export default Sprints;

