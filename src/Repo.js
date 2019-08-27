import React from 'react';
import './App.css';
import {actions} from './actions';
import {connect} from 'react-redux';
import styled from 'styled-components';

const Reponame = styled.section`
    color: white;
    font-size: 30px;
    text-align:left;
`;

const Repodes = styled.section`
    color: grey;
    font-size: 20px;
    text-align:left;
`;

class RepoComponent extends React.Component {
    
    render() {
        return (
        <div>
            {this.loadmore_repo()}
        </div>
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
                            </Repodes>
                            <hr></hr>
                        </div>
                ))
    }

    loadmore_repo(){
        
        return (<section className="feed">
                    <h1>Repositories</h1>
                        {this.state.items.slice(0, this.state.visible).map((item, index) => {
                            return (
                                <div>
                                <Reponame>{index+1}{item.name}</Reponame>
                                <Repodes>{item.description}</Repodes>
                                <hr></hr>
                                </div>
                            );
                        })}
                {this.state.visible < this.state.items.length &&
                    <button onClick={this.loadMore} type="button" className="load-more">Load more</button>
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

