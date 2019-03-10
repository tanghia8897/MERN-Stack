import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import Moment from 'react-moment';
import {deleteExperience} from '../../action/profileAction';

class Experience extends Component {
    
    onclick = (id)=>{
        if (window.confirm('Are you sure delete experience?')) {
            this.props.deleteExperience(id);
        } else {
            return false
        }
    }
    render() {
        const experience = this.props.experience.map(exp=>(
            <tr key={exp._id}>
                <td>{exp.company}</td>
                <td>{exp.title}</td>
                <td>
                    <Moment format='DD/MM/YYYY'>{exp.from}</Moment> - <Moment format='DD/MM/YYYY'>{ exp.to}</Moment>
                </td>
               <td><button onClick={()=>this.onclick(exp._id)} className='btn btn-danger' >Delete</button></td>
            </tr>
        ))
        return (    
            <div>
                <h4 className='mb-4'>Experience Creadentials</h4>
                <table className='table'>
                    <thead>
                        <tr>
                            <th>Company</th>
                            <th>Title</th>
                            <th>Years</th>
                        </tr>
                        {experience}
                    </thead>
                </table>
            </div>
        );
    }
}
Experience.propTypes = {
    deleteExperience: PropTypes.func.isRequired
}
export default connect(null,{deleteExperience})(Experience);