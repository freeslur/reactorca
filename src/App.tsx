import React, { Component } from 'react';
// import PatientsPage from './list/PatientPage';
import AcceptanceList from './list/materialui/AcceptanceList';

class App extends Component {
  render() {
    return (
      <>
        {/* <PatientsPage
          // patients={this.props.patients}
          // onAddPatient={this.onAddPatient}
          // onStatusChange={this.onStatusChange}
          // isLoading={this.props.isLoading}
          /> */}
        <AcceptanceList />
      </>
    );
  }
}

export default App;
