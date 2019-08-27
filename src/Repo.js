import React from 'react';
import './App.css';
import {actions} from './actions';
import {connect} from 'react-redux';
import styled from 'styled-components';
import { Mainsection, Dashboard } from './Dashboard';
import { Link } from 'react-router-dom'

const Reponame = styled.section`
    color: white;
    font-size: 30px;
    text-align:center;
    
`;

const Repodes = styled.section`
    color: grey;
    font-size: 20px;
    text-align:left;
    margin-left: 20%;
    margin-right: 20%;
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
    
    render() {
        return (
        <Mainsection>
            <div>
                {this.props.user.user.name}
            </div>
            <img class="img-fluid" alt="..." src={this.props.user.user.avatar_url} />
            <div>
                <a href={this.props.user.user.html_url}> {this.props.user.user.html_url} </a>
            </div>
            
            {this.loadmore_repo()}
        </Mainsection>
        )
    }

    constructor(props) {
        super(props);
    
        this.state = {
          items: this.props.user.user,
          visible: 2,
          error: false
        };
    
        this.loadMore = this.loadMore.bind(this);
    }

    loadMore() {
        this.setState((prev) => {
          return {visible: prev.visible + 4};
        });
    }

    test(){
        // alert(this.props.user.user.length);
        return this.props.user.user.length;

    }

    list_repo(){

        return this.state.items.map(repo => (
                        <div>
                            <Reponame>
                                {repo.name}
                            </Reponame>
                            <Repodes>
                                {repo.description}
                                <hr></hr>
                            </Repodes>
                        </div>
                ))
    }

    loadmore_repo(){
        
        return (<section className="feed">
                    <h1>Repositories</h1>
                        {this.state.items.slice(0, this.state.visible).map((item, index) => {
                            return (
                                <div>
                                <Reponame>{item.name}</Reponame>
                                <Repodes>
                                    {item.description}
                                    <hr></hr>
                                </Repodes>
                                </div>
                            );
                        })}
                {this.state.visible < this.state.items.length &&
                    <button onClick={this.loadMore} type="button" className="load-more">Load more</button>
                }

                {this.state.visible >= this.state.items.length &&
                     <button><Link to='/' style={{ textDecoration: 'none' }}>BACK</Link></button>
                }   
                </section>)
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

export const Repo = connect(mapStateToProps, mapDispatchToProps)(RepoComponent);

