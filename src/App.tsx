import React, { Component } from 'react';
// import PatientsPage from './list/PatientPage';
import AcceptanceList from './list/AcceptanceList';
import { AcceptanceStatusContextProvider } from './contexts/AcceptanceStatusContext';

class App extends Component {
  render() {
    return (
      <>
        <AcceptanceStatusContextProvider>
          {/* <PatientsPage
          // patients={this.props.patients}
          // onAddPatient={this.onAddPatient}
          // onStatusChange={this.onStatusChange}
          // isLoading={this.props.isLoading}
          /> */}
          <AcceptanceList />
        </AcceptanceStatusContextProvider>
      </>
    );
  }
}

export default App;
