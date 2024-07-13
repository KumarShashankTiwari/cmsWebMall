import React from 'react';
import { Col, Form, Row } from 'react-bootstrap';
// import DateTimePicker from 'react-datetime-picker';
import './index.scss';

const Calender = ({
  setStartDate,
  startDate,
  setEndDate,
  endDate,
  validated,
  activate,
}) => {

  /* format='yyyy-MM-dd' */
  return (
    <div className='calender'>
      <Form.Group className='pt-3'>
        <Row>
          <Col md={5}>
            <Form.Label> Start Date</Form.Label>
            {/* <DateTimePicker
              onChange={(value) => {
                setStartDate(value);
              }}
              value={startDate}
              minDate={new Date()}
              amPmAriaLabel='Select AM/PM'
            /> */}
          </Col>
          <Col md={5}>
            <Form.Label>End Date</Form.Label>
            {/* <DateTimePicker
              onChange={(value) => {
                setEndDate(value);
              }}
              value={endDate}
              minDate={new Date()}
            /> */}
          </Col>
          {!validated &&
            (startDate.length === 0 || endDate.length === 0) &&
            activate && (
              <p className='blogsForm_alert1'>
                Please select Start Time and End Time
              </p>
            )}
        </Row>
      </Form.Group>
    </div>
  );
};

export default Calender;
