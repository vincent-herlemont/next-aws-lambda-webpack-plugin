import React,{useState} from 'react'
import Link from 'next/link'

const randomNumberGenerator = () => {
    return Math.round(Math.random(100)*1000);
}

const LinkToProfile = () => {
    let [profileName,setProfileName] = useState('Paul');
    
    return <React.Fragment>
        <li>Dynamic link : <br/>
            <input value={profileName} onChange={(event => setProfileName(event.target.value))}/> <br/>
            <Link prefetch={false} href={"/people/" + profileName +"/profile"}><a>Go to {profileName} profile</a></Link> </li>
    </React.Fragment>
}

const Home = ({randomNumber}) => {
    return <>
        <ul>
            {process.browser && <LinkToProfile />}
            <li>Random generate only by the server : {randomNumber}</li>
            {process.browser && <li><div>Random generate only by the browser : {randomNumberGenerator()}</div></li>}
            <li><Link href="/static_page"><a>Static web page</a></Link></li>
        </ul>
    </>
};

// This gets called on every request
export async function getServerSideProps() {

    return { props: { randomNumber:randomNumberGenerator() } }
}

export default Home
