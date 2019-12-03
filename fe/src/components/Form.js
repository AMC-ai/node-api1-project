import React, { useState } from "react";

const Form = props => {
    const [user, setUser] = useState({
        name: '',
        bio: ''
    })

    const handleChanges = e => {
        setUser({
            ...user,
            [e.target.name]: e.target.value
        })
    }

    const handleSubmit = e => {
        e.preventDefault();
        setUser({
            ...user,
            name: '',
            bio: ''
        });
    };

    return (
        <form onSubmit={handleSubmit}>
            <label >Name
            <input
                    maxLength="20"
                    type="text"
                    name="name"
                    id="name"
                    onChange={handleChanges}
                    value={user.name}
                    placeholder="Name"
                />
            </label>
            <label forHtml="smfHeight">Bio</label>
            <input
                type="text-area"
                name="bio"
                id="bio"
                onChange={handleChanges}
                value={user.bio}
                placeholder="about me"
            />

            <button onClick={handleSubmit}> Add User </button>
        </form >
    );
}

export default Form;


