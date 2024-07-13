import React from 'react';
import { Col, Form, Row } from 'react-bootstrap';
import DateTime from '../DateTime';
import moment from 'moment';
import './index.scss';

const dateTimeFormat = 'YYYY-MM-DD HH:mm:ss';

const Calender = ({
  startDate = null,
  endDate = null,
  onStartDateSelected,
  onEndDateSelected,
  validated,
  activate,
  isFilter,
  mandatory = null,
}) => {
  const onStartDateChange = (event) => {
    if (!onStartDateSelected) return;
    if (event) {
      onStartDateSelected(event.format(dateTimeFormat));
    } else {
      onStartDateSelected('');
    }
  };

  const onEndDateChange = (event) => {
    if (!onEndDateSelected) return;
    if (event) {
      onEndDateSelected(event.format(dateTimeFormat));
    } else {
      onEndDateSelected('');
    }
  };

  var yesterday = moment().subtract(1, 'day');
  var valid = function (current) {
    return current.isAfter(yesterday);
  };

  if (isFilter === true) {
    return (
      <div className='calender'>
        <Form.Group>
          <Row>
            <Col>
              <Row>
                <Form.Label> Start Date{mandatory ? '*' : ''}</Form.Label>
                <DateTime
                  dateFormat='DD-MM-yyyy'
                  onChange={onStartDateChange}
                  isValidDate={valid}
                  value={startDate && startDate}
                />
              </Row>
              <Row className='mt1' style={{ marginTop: '1rem' }}>
                <Form.Label>End Date{mandatory ? '*' : ''}</Form.Label>
                <DateTime
                  dateFormat='DD-MM-yyyy'
                  onChange={onEndDateChange}
                  isValidDate={valid}
                  value={endDate && endDate}
                />
              </Row>
              {!validated &&
                (startDate.length === 0 || endDate.length === 0) &&
                activate && (
                  <p className='blogsForm_alert1'>
                    Please select Start Time and End Time
                  </p>
                )}
            </Col>
          </Row>
        </Form.Group>
      </div>
    );
  }

  return (
    <div className='calender'>
      <Form.Group>
        <Row>
          <Col>
            <Form.Label> Start Date{mandatory ? '*' : ''}</Form.Label>
            <DateTime
              dateFormat='DD-MM-yyyy'
              onChange={onStartDateChange}
              isValidDate={valid}
              value={startDate}
            />
          </Col>

          <Col>
            <Form.Label>End Date{mandatory ? '*' : ''}</Form.Label>
            <DateTime
              dateFormat='DD-MM-yyyy'
              onChange={onEndDateChange}
              isValidDate={valid}
              value={endDate}
            />
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
