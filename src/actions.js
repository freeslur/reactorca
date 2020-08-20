import * as api from './api/Patient';

function getPatientsSucceeded(patients) {
  console.log('getPatientsSucceeded', patients);
  return {
    type: 'GET_PATIENTS_SUCCEEDED',
    payload: {
      patients,
    },
  };
}

function getPatientsFailed(error) {
  console.log('getPatientsFailed', error);
  return {
    type: 'GET_PATIENTS_FAILED',
    payload: {
      error,
    },
  };
}

function getPatientsStarted() {
  console.log('getPatientsStarted');
  return {
    type: 'GET_PATIENTS_STARTED',
  };
}

export function getPatients() {
  return (dispatch) => {
    dispatch(getPatientsStarted());

    api
      .getPatients()
      .then((resp) => {
        dispatch(getPatientsSucceeded(resp.data));
      })
      .catch((err) => {
        dispatch(getPatientsFailed(err.message));
      });
  };
}

function addPatientSucceeded(patient) {
  return {
    type: 'ADD_PATIENT_SUCCEEDED',
    payload: {
      patient,
    },
  };
}

export function addPatient({ title, description, status = 'Unstarted' }) {
  return (dispatch) => {
    api.addPatient({ title, description, status }).then((resp) => {
      dispatch(addPatientSucceeded(resp.data));
    });
  };
}

function editPatientSucceeded(patient) {
  return {
    type: 'EDIT_PATIENT_SUCCEEDED',
    payload: {
      patient,
    },
  };
}

export function editPatient(id, params = {}) {
  return (dispatch, getState) => {
    const patient = getPatientById(getState().patients.patients, id);
    const updatedPatient = Object.assign({}, patient, params);
    api.editPatient(id, updatedPatient).then((resp) => {
      dispatch(editPatientSucceeded(resp.data));
    });
  };
}

function getPatientById(patients, id) {
  return patients.find((patient) => patient.id === id);
}

function deletePatientSucceeded(deleteParams) {
  return {
    type: 'DELETE_PATIENT_SUCCEEDED',
    payload: {
      deleteParams,
    },
  };
}

export function deletePatient(deleteParams) {
  return (dispatch, getState) => {
    api.deletePatient(deleteParams).then((resp) => {
      console.log('deletePatient : ', resp);
      dispatch(deletePatientSucceeded(deleteParams));
    });
  };
}
