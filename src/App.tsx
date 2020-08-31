import React, { Component } from 'react';
// import PatientsPage from './list/PatientPage';
import AcceptanceList from './list/AcceptanceList';

class App extends Component {
  render() {
    return (
      <>
        <div>
          {/* <PatientsPage
          // patients={this.props.patients}
          // onAddPatient={this.onAddPatient}
          // onStatusChange={this.onStatusChange}
          // isLoading={this.props.isLoading}
          /> */}
          <AcceptanceList />
        </div>
      </>
    );
  }
}

export default App;
