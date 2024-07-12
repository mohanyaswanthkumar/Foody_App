import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './UserProfile.css';
import { assets } from '../assets/assets';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
const UserProfile = () => {
    const [profile, setProfile] = useState(null);
    const [group, setGroup] = useState(null);
  useEffect(() => {
    const checkGroupIn = async () => {
      const resp = await axios.get('http://localhost:8000/group/');
      if (resp.data.group === 'admins') {
        setGroup('admins');
      } else if (resp.data.group === 'users') {
        setGroup('users');
      } else {
        setGroup(null);
      }
      console.log(resp.data.group);
    };
    checkGroupIn();
  }, []);
    const history = useNavigate();
    useEffect(() => {
        const fetchProfile = async () => {
            try {
                const response = await axios.get('http://localhost:8000/userprofile/');
                setProfile(response.data);
            } catch (error) {
                console.error('Error fetching user profile:', error);
            }
        };

        fetchProfile();
    }, []);

    const handleLogout = async () => {
        try {
            const response = await axios.get('http://localhost:8000/logout');
            console.log(response.data);
            toast.success("Logged out successfully");
            history('/');
            window.location.reload();
        } catch (error) {
            console.error('Error logging out:', error);
        }
    };
    const [toggle,setToggle]=useState(1);
    return (
            <div className='container'>
                <div className='block-tabs'>
                    <div className={toggle===1?"active-tabs":"tabs"} onClick={()=>{setToggle(1)}} >Profile</div>
                    {group === 'users' && (
                    <div className={toggle === 2 ? "active-tabs" : "tabs"} onClick={() => setToggle(2)}>Orders History</div>
                )}
                </div>
                <div className='content-tabs'>
                    <div className={toggle===1?"active-content":"content"} >
                        {profile ? (
                    <div className='profile'>
                        <img src={assets.profile_icon}/>
                        <p>Username: {profile.username}</p>
                        <p>Email: {profile.email}</p>
                        <p>First Name: {profile.firstname}</p>
                        <p>Last Name: {profile.lastname}</p>
                        <button onClick={handleLogout}>Logout</button>
                    </div>
                            ) : (
                                <div className={toggle===1?"active-content":"content"} >Loading...</div>
                        )}
                    </div>
                    <div className={toggle===2 ? "active-content" : "content"}>
                            Lorem ipsum dolor sit amet, consectetur adipisicing elit. Mollitia, amet?
                    </div>
                </div>
            </div>
    );
};

export default UserProfile;
