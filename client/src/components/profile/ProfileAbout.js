import React, { Component } from 'react';
import isEmpty from '../../validation/is-Empty';


class ProfileAbout extends Component {
    
    render() {
        const {profile}=this.props;
        const skills = profile.skills.map((skill, index) => (
            <div key={index} className="p-3">
              <i className="fa fa-check" /> {skill}
            </div>
          ));
        return (
            <div className="row">
            <div className="col-md-12">
              <div className="card card-body bg-light mb-3">
                <h3 className="text-center text-info">{profile.user.name}</h3>
                <p className="lead">
                {profile.bio} {isEmpty(profile.bio) ? (<span>{profile.name} does not hava a bio</span>) : (<span>{profile.bio}</span>)}
                </p>
                <hr />
                <h3 className="text-center text-info">Skill Set</h3>
                <div className="row">
                  <div className="d-flex flex-wrap justify-content-center align-items-center">
                    {skills}
                  </div>
                </div>
              </div>
            </div>
          </div>
        );
    }
}

export default ProfileAbout;