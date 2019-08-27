import React from 'react';
import {Formik} from 'formik';
import './dashboard.css';
import * as Yup from 'yup';
import {actions} from './actions';
import {connect} from 'react-redux';
import { Link } from 'react-router-dom'
import styled from 'styled-components';

const Mainsection = styled.section`
img {
    width: 100px;
    height: auto;
  }
  @media (min-width: 768px) {
    img {
        width: 150px;
    }
  }
  @media (min-width: 992px) {
    img {
        width: 200px;
    }
  }
  @media (min-width: 1200px) {
    img {
        width: 250px;
    }
  }
  a:visited {
    color: whitesmoke;
  }
  a:hover {
    color: grey;
  }
  a:active {
    color: black;
  }
  
`;

class DashboardComponent extends React.Component {

    render() {
        return (
            <div>
                <Formik
                    initialValues={{name: ''}}
                    onSubmit={(values, {setSubmitting}) => {
                        this.props.loadUserData(values.name);
                        setSubmitting(false);
                    }}
                    validationSchema={Yup.object().shape({
                        name: Yup.string().required('Required')
                    })}
                >
                    {props => {
                        const {
                            values,
                            touched,
                            errors,
                            dirty,
                            isSubmitting,
                            handleChange,
                            handleBlur,
                            handleSubmit,
                            handleReset
                        } = props;
                        return (
                            <form onSubmit={handleSubmit}>
                                <label htmlFor="name"><b>GitHub</b></label>
                                <input
                                    id="name"
                                    placeholder="Enter your username"
                                    type="text"
                                    value={values.name}
                                    onChange={handleChange}
                                    onBlur={handleBlur}
                                    className={errors.name && touched.name ? 'error' : ''}
                                />
                                {errors.name && errors.touched && <div className="input-feedback">{errors.name}</div>}
                                <button type="submit" disabled={isSubmitting}>
                                    Search
                                </button>
                                <button
                                    type="button"
                                    className="outline"
                                    onClick={handleReset}
                                    disabled={!dirty || isSubmitting}
                                >
                                    Reset
                                </button>
                                
                            </form>
                        );
                    }}
                </Formik>
                <Mainsection className="output">
                    <div>
                        {/* {JSON.stringify(this.props.user.user, null, 2)} */}
                        {/* {this.repos()} */}
                        
                        <Link
                            to={{
                            pathname: "/repo",
                            data: this.props
                            }}
                        >
                            {this.name()}
                        </Link>
                    </div>
                    <div>
                        {this.image()}
                    </div>
                    <a href={this.git_url()}>{this.git_url()}</a>
                </Mainsection>
            </div>
        );
    }

    name() {
        if (this.props.user.user) {
            return this.props.user.user.name
        } 
    }

    image(){
        if (this.props.user.user) {
            return (<img class="img-fluid" alt="..." src={this.props.user.user.avatar_url} />)
        }
    }

    git_url(){
        if (this.props.user.user) {
            return this.props.user.user.html_url
        }
    }

}

const mapStateToProps = (state) => {
    return {
        user: state.user
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        loadUserData: name => dispatch(actions.loadUserData(name))
    };
};

export const Dashboard = connect(mapStateToProps, mapDispatchToProps)(DashboardComponent);

