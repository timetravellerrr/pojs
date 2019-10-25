import React, { Component } from 'react';
import data from "./data"; 

const socialMediaList = data.SocialMedias;

class E1 extends Component {
	render() {
		return (
            <ul>
                {socialMediaList.map(s => (<li key={s}>{s}</li>))}
            </ul>
        );
    }
} 
export default E1;