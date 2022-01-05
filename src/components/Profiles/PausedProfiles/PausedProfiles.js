import React, { useEffect, useState } from 'react';
import { Col, Container, Row, Table } from 'react-bootstrap';

const PausedProfiles = () => {
    const [pauseProfiles,setPausedProfiles]=useState([]);
    useEffect(() => {
        fetch('https://stormy-ravine-03735.herokuapp.com/profiles')
        .then(res => res.json())
        .then(data => setPausedProfiles(data))
    }, [])
    const matchedPaused=pauseProfiles.filter(p=>p.Status=='PAUSED')

    return (
        <div>
            <Container>
                <Row>
                    <Col>
                        <h2 className='text-center my-4'>Listed all Pause profiles</h2>
                        <Table striped bordered hover responsive="sm">
  <thead>
    <tr>
      {/* <th>#</th> */}
      <th>Name</th>
      <th>Date of Birth</th>
      <th>Status</th>
    </tr>
  </thead>
  <tbody>
        {
            matchedPaused.map(profile => (
                <>
                    <tr>
                        <td>{profile.Name}</td>
                        <td>{profile.DOB}</td>
                        <td>{profile.Status}</td>                                       
                    </tr>
                </>
                                ))
        }

    </tbody>
</Table>
                    </Col>
                </Row>
            </Container>
        </div>
    );
};

export default PausedProfiles;