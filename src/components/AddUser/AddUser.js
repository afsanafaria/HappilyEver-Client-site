import React from 'react';
import { Col, Container, Form, Row,Button } from 'react-bootstrap';
import { useForm } from 'react-hook-form';

const AddUser = () => {
    const { register, handleSubmit ,reset} = useForm();
  const onSubmit = data => {
    //   console.log(data)
      fetch('https://stormy-ravine-03735.herokuapp.com/profiles', {
        method: 'POST',
        headers: {
            'content-type': 'application/json',
        },
        body: JSON.stringify(data)
    })
        .then(res => res.json())
        .then(data => {
            if (data.insertedId) {
                alert('Succesfully profile added')
               reset(); 
               window.location.reload()
               
            }
        })
};
    return (
        <div>
        <Container>
            <Row>
                <Col>
                <h2 className='text-center'>Add user</h2>
                <Form onSubmit={handleSubmit(onSubmit)}>
                <Row className="mb-3">
    <Form.Group as={Col} >
      <Form.Label>Name</Form.Label>
      <Form.Control   {...register("Name")}/>
    </Form.Group>
    <Form.Group as={Col} >
      <Form.Label>Date</Form.Label>
      <Form.Control type="date"  {...register("DOB")} />
    </Form.Group>
    <Form.Group as={Col} >
      <Form.Label>Status</Form.Label>
      <Form.Select defaultValue="ACTIVE"  {...register("Status")}>
        <option>ACTIVE</option>
        <option>PAUSED</option>
      </Form.Select>
    </Form.Group>

   
  </Row>
  <Button variant="primary" type="submit">
    Submit
  </Button>
                </Form>
                </Col>
            </Row>
        </Container>
           

        </div>
    );
};

export default AddUser;