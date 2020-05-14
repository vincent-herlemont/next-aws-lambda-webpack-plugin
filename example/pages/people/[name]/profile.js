import React from 'react'

const Profile = ({query}) => {
    return <>This is the profile of <b>{query.name}</b> (generate by the server) </>
};

// This gets called on every request
export async function getServerSideProps({query}) {
    return { props: { query } }
}


export default Profile;

