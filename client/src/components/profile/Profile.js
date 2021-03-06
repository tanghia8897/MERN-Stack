import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import Spinner from '../common/Spinner';
import {getProfileByHandle} from '../../action/profileAction';
import {Helmet} from 'react-helmet';

import ProfileAbout from './ProfileAbout';
import ProfileCreds from './ProfileCreds';
import ProfileGithub from './ProfileGithub';
import ProfileHeader from './ProfileHeader';

class Profile extends Component {
    componentDidMount() {
        if(this.props.match.params.handle){
            this.props.getProfileByHandle(this.props.match.params.handle);
        }
    }
    componentWillReceiveProps(nextProps){
        if(nextProps.profile.profile === null && this.props.profile.loading){
            this.props.history.push('/not-found');
        }
    }
    
    render() {
        const {profile , loading} = this.props.profile;
        let profileContent;
        if(profile === null || loading){
            profileContent = <Spinner/>
        }else{
            profileContent = (

                <div>
                    <div className="row">
                        <div className="col-md-6">
                        <Link to="/profiles" className="btn btn-light mb-3 float-left">
                            Back To Profiles
                        </Link>
                        </div>
                        
                    </div>
                        <ProfileHeader profile={profile}/>
                        <ProfileAbout profile={profile}/>
                        <ProfileCreds experience={profile.experience} education={profile.education}/>
                        { profile.githubusername ? <ProfileGithub username={profile.githubusername}/> : null} 
                </div>
            )
        }
        return (
            <div className='profile'>
                <Helmet>
                    <meta name="description" content="This is what you want to show as the page content in the Google SERP Listing,page profiles" />
                </Helmet>
                <div className="container">
                    <div className="row">
                        <div className="col-md-12">
                            {profileContent}
                        </div>
                    </div>
                </div> 
            </div>
        );
    }
}

Profile.propTypes = {
    getProfileByHandle:PropTypes.func.isRequired,
    profile:PropTypes.object.isRequired
}

const mapStateToProps = state=>({
    profile: state.profile
})

export default connect(mapStateToProps,{getProfileByHandle})(Profile);