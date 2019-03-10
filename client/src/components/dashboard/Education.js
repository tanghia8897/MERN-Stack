import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import Moment from 'react-moment';
import {deleteEducation} from '../../action/profileAction';
import {Link} from 'react-router-dom';

class Education extends Component {
    
    onclick = (id)=>{
        if (window.confirm('Are you sure delete education?')) {
            this.props.deleteEducation(id);
        } else {
            return false
        }
    }
    render() {
        const education = this.props.education.map(edu=>(
            <tr key={edu._id}>
                <td>{edu.school}</td>
                <td>{edu.degree}</td>
                <td>
                    <Moment format='DD/MM/YYYY'>{edu.from}</Moment> - <Moment format='DD/MM/YYYY'>{ edu.to}</Moment>
                </td>
               <td><button onClick={()=>this.click(edu._id)} className='btn btn-danger' >Delete</button></td>
               <td>
               <Link to={`/edit-education/${edu._id}`}>
                <button className='btn btn-info' >Edit Education</button>
               </Link>
               </td>
            </tr>
        ))
        return (    
            <div>
                <h4 className='mb-4'>Education Creadentials</h4>
                <table className='table'>
                    <thead>
                        <tr>
                            <th>School</th>
                            <th>Degree</th>
                            <th>Years</th>
                        </tr>
                        {education}
                    </thead>
                </table>
            </div>
        );
    }
}
Education.propTypes = {
    deleteEducation: PropTypes.func.isRequired
}
export default connect(null,{deleteEducation})(Education);