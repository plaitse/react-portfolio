import React from 'react';

/* Components */
import Button from '../Button/Button';
import Input from '../Input/Input';
import Link from '../Link/Link';
import Tetrahedron from '../Tetrahedron/Tetrahedron';

const cockpit = (props) => {
    const infosStyle = {
        marginLeft: '10px'
    }
    const moodStyle = {
        marginBottom: '10px',
        display: 'block'
    };

    let infos = null;
    props.show ? infos = (<Link style={infosStyle} to="http://www.google.com" >Instagram</Link>) : infos = null;

    return (
        <div>
            <h1>hello world.</h1>
            <h2>I'm Pierre. I'm a developer. But I also do other things.</h2>
            <Link to="http://www.google.com">Programming projects</Link>
            <br /><br />
            <Link to="http://www.google.com">LinkedIn account</Link>
            <br /><br />
            <Link to="http://www.google.com">Spotify playlists</Link>
            <br /><br />
            <Button click={props.incremented}>I like this Website</Button>
            <br /><br />
            <span>{props.likes} likes</span>
            <br /><br />
            <span>What\'s your mood today?</span>
            <br /><br />
            <span style={moodStyle}>I'm {props.mood}</span>
            <Input changed={props.changed} value={props.mood} />
            <br /><br />
            <Button click={props.showed}>Photography</Button>
            {infos}
            <Tetrahedron />
        </div>
    );
};

export default cockpit;