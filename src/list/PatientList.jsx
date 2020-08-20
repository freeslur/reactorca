import React from 'react';
import { List, Card, Button } from 'antd';
import { PATIENT_STATUSES } from '../constants';

const PatientList = (props) => {
  console.log('patients', props.patients);
  return (
    <List
      grid={{ gutter: 16, column: 4 }}
      dataSource={props.patients}
      renderItem={(item) => (
        <List.Item>
          <Card title={item.id}>{item.name}</Card>
          <select
            value={item.status}
            onChange={(e) => {
              onStatusChange(e, item.id);
            }}
          >
            {PATIENT_STATUSES.map((status) => (
              <option key={status} value={status}>
                {status}
              </option>
            ))}
          </select>
          <Button
            type='danger'
            onClick={() => {
              props.onDeletePatient(item.id);
            }}
          >
            タスク削除
          </Button>
        </List.Item>
      )}
    />
  );

  function onStatusChange(e, id) {
    props.onStatusChange(id, e.target.value);
  }
};

export default PatientList;
