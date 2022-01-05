import React, { useEffect, useState } from 'react';
import { Button, Col, Container, Row, Table } from 'react-bootstrap';

const Profiles = () => {
    const [profiles,setProfiles]=useState([]);
    const [singleProfile,setSingleProfile]=useState([]);
    const [active, setActive] = useState('');
    const statusHandler = e => {
        setActive(e.target.value)
    }
    useEffect(() => {
        fetch('https://stormy-ravine-03735.herokuapp.com/profiles')
        .then(res => res.json())
        .then(data => setProfiles(data))
    }, [])


    const updateOrderStatus = id => {
        fetch(`https://stormy-ravine-03735.herokuapp.com/profiles/${id}`)
            .then(res => res.json())
            .then(data => setSingleProfile(data))

        const updatedSingleProfile = {
            Name: singleProfile.Name,
            DOB: singleProfile.DOB,
            Status: active,
        };
        setSingleProfile(updatedSingleProfile);
        fetch(`https://stormy-ravine-03735.herokuapp.com/profiles/${id}`, {
            method: 'PUT',
            headers: {
                'content-type': 'application/json'
            },
            body: JSON.stringify(updatedSingleProfile)
        })
            .then(res => res.json())
            .then(data => {
                if (data.modifiedCount > 0) {
                    const proceed = window.confirm('Are you sure?');
                    if (proceed) {
                        alert("You successfully updated the status")
                        window.location.reload()

                    }
                }
            })

    }


    const handleDelete = id => {
        const proceed = window.confirm('Are you sure,You want to delete?');
        if (proceed) {
            fetch(`https://stormy-ravine-03735.herokuapp.com/profiles/${id}`, {
                method: 'DELETE'
            })
                .then(res => res.json())
                .then(data => {
                    if (data.deletedCount > 0) {
                        alert('Deleted successfully');
                        const remainingUsers = profiles.filter(p => p._id !== id);
                        setProfiles(remainingUsers);
                        window.location.reload()
                    }
                })
        }
    }


    return (
        <div>
          <Container>
          <Row>
              <Col>
              <h2 className='text-center my-4'>Listed All Profiles</h2>
              
          <Table striped bordered hover responsive="sm">
  <thead>
    <tr>
      {/* <th>#</th> */}
      <th>Name</th>
      <th>Date of Birth</th>
      <th>Status</th>
      <th>Action</th>
    </tr>
  </thead>
  <tbody>
        {
            profiles.map(profile => (
                <>
                    <tr>
                        <td>{profile.Name}</td>
                        <td>{profile.DOB}</td>
                        <td>
                        <select onChange={statusHandler} defaultValue={profile.Status}>
                                                    <option >PAUSED</option>
                                                    <option>ACTIVE</option>
                                                </select>
                        </td>                                       
                        <td>
                        <Button onClick={() => updateOrderStatus(profile._id)} className="mx-lg-2 my-sm-2">Update</Button>
                        <Button onClick={() => handleDelete(profile._id)}>Delete</Button>
                        </td>                                       
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

export default Profiles;