import React from 'react';
import {Formik} from 'formik';
import './dashboard.css';
import * as Yup from 'yup';
import {actions} from './actions';
import {connect} from 'react-redux';
import styled from 'styled-components';
import { Container , Button , Form , Label , Input , Row , Col} from 'reactstrap';
import { CarouselSlide } from './CarouselSlide';
import { Lion as ButtonLoading} from 'react-button-loaders'

export const Mainsection = styled.section`
    img {
        width: 200px;
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
        color: white;
    }
    a:hover {
        color: grey;
    }
    a:active {
        color: black;
    }
    Button {
        margin : auto;
    }
`;

class DashboardComponent extends React.Component {
    
    state = {
        sendState: '' 
    }

    render() {
        return (
            <Container>
                <Row>
                <Col xs="6" sm="4"></Col>
                <Col xs="6" sm="4">
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
                            <Form onSubmit={handleSubmit}>
                                <Label htmlFor="name"><b>GitHub</b></Label>
                                <Input
                                    id="name"
                                    placeholder="Enter your username"
                                    type="text"
                                    value={values.name}
                                    onChange={handleChange}
                                    onBlur={handleBlur}
                                    className={errors.name && touched.name ? 'error' : ''}
                                />
                                <hr></hr>
                                <Row>
                                    <Col>
                                        {errors.name && errors.touched && <div className="input-feedback">{errors.name}</div>}
                                        <ButtonLoading
                                            onClick={this.handleClick} 
                                            state={this.state.sendState} 
                                            bgColor="#4AD481" 
                                            bgLoading="#4AD481" 
                                            speedProgress="300" 
                                            type="submit" 
                                            disabled={isSubmitting}>
                                            Search
                                        </ButtonLoading>
                                    </Col>
                                    <Col>
                                        <ButtonLoading 
                                            type="button"
                                            className="outline"
                                            onClick={handleReset}
                                            disabled={!dirty || isSubmitting}
                                        >
                                            Reset
                                        </ButtonLoading>
                                    </Col>
                                </Row>
                            </Form>
                        );
                    }}
                </Formik>
                </Col>
                </Row>
                <hr></hr>
                <Row>
                <Col xs="6" sm="4"></Col>
                <Col xs="6" sm="4">
                <Mainsection className="output">
                    <div>
                        {/* {JSON.stringify(this.props.user.user, null, 2)} */}
                        {/* {this.repos()} */}
                        {this.list_users()}
                            
                        {/* <Link
                            to={{
                            pathname: "/repo",
                            data: this.props
                            }} 
                            style={{ textDecoration: 'none' }}
                        >
                            {this.name()}
                        </Link> */}
                    </div>
                    <div>
                        {/* {this.image()} */}
                    </div>
                    {/* <a href={this.git_url()}>{this.git_url()}</a> */}
                </Mainsection>
                </Col>
                </Row>
            </Container>
        );
    }

    list_users(){
        if (this.props.user.user) {
            var items = []
            for (var i=0;i<this.props.user.user.items.length;i++){
                items.push({
                    src: this.props.user.user.items[i].avatar_url,
                    altText: this.props.user.user.items[i].html_url,
                    caption: this.props.user.user.items[i].login
                })
            }

            return (<Row><CarouselSlide items={items} /></Row>)
        }
    }

    handleClick = () => {
        this.setState({sendState: 'loading'})
        //simulating an API
        setTimeout(() => {
            this.setState({sendState: 'default'})
        }, 300)
        
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