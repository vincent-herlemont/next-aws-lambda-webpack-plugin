import React from 'react'

const Profile = ({query}) => {
    return <>This is the profile of <b>{query.name}</b> </>
};

Profile.getInitialProps = async ({ query }) => {
    return { query }
};

export default Profile;

