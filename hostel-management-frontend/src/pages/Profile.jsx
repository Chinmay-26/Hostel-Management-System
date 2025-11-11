import React, { useState } from 'react';

const Profile = () => {
    const [isEditing, setIsEditing] = useState(false);
    const [profile, setProfile] = useState({
        name: "John Doe",
        email: "john.doe@example.com",
    });

    const handleEditClick = () => {
        setIsEditing(true);
    };

    const handleSaveClick = () => {
        setIsEditing(false);
        // Add logic to save the updated profile (e.g., API call)
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setProfile((prevProfile) => ({
            ...prevProfile,
            [name]: value,
        }));
    };

    return (
        <div>
            <h1>Profile</h1>
            {isEditing ? (
                <div>
                    <label>
                        Name:
                        <input
                            type="text"
                            name="name"
                            value={profile.name}
                            onChange={handleChange}
                        />
                    </label>
                    <br />
                    <label>
                        Email:
                        <input
                            type="email"
                            name="email"
                            value={profile.email}
                            onChange={handleChange}
                        />
                    </label>
                    <br />
                    <button onClick={handleSaveClick}>Save</button>
                </div>
            ) : (
                <div>
                    <p>Name: {profile.name}</p>
                    <p>Email: {profile.email}</p>
                    <button onClick={handleEditClick}>Edit Profile</button>
                </div>
            )}
        </div>
    );
};

export default Profile;