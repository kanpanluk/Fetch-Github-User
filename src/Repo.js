import React from 'react';
import './App.css';
import styled from 'styled-components';
import { Mainsection } from './Dashboard';
import { Link } from 'react-router-dom'
import { Rabbit } from 'react-button-loaders'
import { Row, Col, Button, Card, CardHeader, CardBody, CardText } from 'reactstrap';
import axios from 'axios';

const Reponame = styled.section`
    color: grey;
    font-size: 20px;
    text-align:center;
    
`;

const Repodes = styled.section`
    color: grey;
    font-size: 15px;
    text-align:left;
    hr { 
        display: block;
        margin-top: 0.5em;
        margin-bottom: 0.5em;
        margin-left: auto;
        margin-right: auto;
        border-style: inset;
        border-width: 1px;
    } 
`;

class RepoComponent extends React.Component {

    constructor(props) {
        super(props);
    
        this.state = {
            user: {},
            items: [],
            visible: 2,
            error: false,
            sendState: '' 
        };
    
        this.loadMore = this.loadMore.bind(this);
    }
      
    handleClick = () => {
        this.setState({sendState: 'loading'})
        //simulating an API
        setTimeout(() => {
            this.setState({sendState: 'default'})
            this.loadMore()
        }, 300)
        
    }
      
    render() {
        return (
        <Mainsection>
            <div>
                {this.state.user.name}
                {/* {JSON.stringify(this.state.items[0], null, 2)} */}
            </div>
            <img class="img-fluid" alt="..." src={this.state.user.avatar_url} />
            <div>
                <a href={this.state.user.html_url}> {this.state.user.html_url} </a>
            </div>
            
            {this.loadmore_repo()}
        </Mainsection>
        )
    }

    

    loadMore() {
        this.setState((prev) => {
          return {visible: prev.visible + 4};
        });
    }

    loadmore_repo(){
        
        return (<section className="feed">
                    <h1>Repositories</h1>
                        {this.state.items.slice(0, this.state.visible).map((item, index) => {
                            return (
                                <Row>
                                    <Col>
                                        <Card>
                                            <CardHeader><Reponame>{item.name}</Reponame></CardHeader>
                                            <CardBody>
                                            <CardText><Repodes>
                                                {item.description}
                                            </Repodes></CardText>
                                            </CardBody>
                                        </Card>
                                    <hr></hr>
                                    </Col>
                                </Row>
                            );
                        })}
                {this.state.visible < this.state.items.length &&
                    <Rabbit onClick={this.handleClick} state={this.state.sendState}  speedProgress="300" bgColor="#227cd2" type="button" className="load-more">Load more</Rabbit>
                }

                {this.state.visible >= this.state.items.length &&
                     <Link to='/' style={{ textDecoration: 'none' }}><Button color="secondary">BACK</Button></Link>
                }   
                </section>)
    }

    componentDidMount() {
        const baseUrl = 'https://api.github.com/users';

        axios.get(`${baseUrl}/${this.props.history.location.data}`)
        .then(user => {
            axios.get(`${baseUrl}/${this.props.history.location.data}/repos`)
            .then(repo => {
                // var data = Object.assign([], user.data, repo.data);
                this.setState({ items: repo.data });
            })
            .catch(error => {
                console.log(error);
            });
            this.setState({ user: user.data });
        })
        .catch(error => {
            console.log(error);
        });
        
    }
}

// const mapStateToProps = (state) => {
//     return {
//         user: state.user
//     };
// };

// const mapDispatchToProps = (dispatch) => {
//     return {
//         loadUserData: name => dispatch(actions.loadUserData(name))
//     };
// };

// export const Repo = connect(mapStateToProps, mapDispatchToProps)(RepoComponent);

export default RepoComponent;
