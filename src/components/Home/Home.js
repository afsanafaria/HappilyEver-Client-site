import React from 'react';
import AddUser from '../AddUser/AddUser';
import PausedProfiles from '../Profiles/PausedProfiles/PausedProfiles';
import Profiles from '../Profiles/Profiles';
import './Home.css'

const Home = () => {
    return (
        <div>
           <Profiles></Profiles>
           <PausedProfiles></PausedProfiles>
           <AddUser></AddUser>
        </div>
    );
};

export default Home;


