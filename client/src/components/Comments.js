import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

class Comments extends Component {
  constructor(props) {
    super(props);
    this.state = {
      article: [],
    };
  }

  componentDidMount() {
    axios.defaults.headers.common['Authorization'] = localStorage.getItem('jwtToken');
    axios
      .get(`/api/article/${this.props.match.params.id}`)
      .then(res => {
        this.setState({ article: res.data });
        console.log(this.state.article);
      })
      .catch(error => {
        if (error.response.status === 401) {
          this.props.history.push('/login');
        }
      });
  }

  logout = () => {
    localStorage.removeItem('jwtToken');
    window.location.reload();
  };

  render() {
    return (
      <div className="container">
        <div className="panel panel-default">
          <div className="panel-heading">
            <h3 className="panel-title">
              ARTICLE CATALOG &nbsp;
              {localStorage.getItem('jwtToken') && (
                <button className="btn btn-primary" onClick={this.logout}>
                  Logout
                </button>
              )}
            </h3>
          </div>
          <div className="panel-body">
            <table className="table table-stripe">
              <thead>
                <tr>
                  <th>ISBN</th>
                  <th>Title</th>
                  <th>Author</th>
                  <th>Description</th>
                  <th>Published Date</th>
                  <th>Publisher</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>{this.state.article.isbn}</td>
                  <td>{this.state.article.title}</td>
                  <td>{this.state.article.author}</td>
                  <td>{this.state.article.description}</td>
                  <td>{this.state.article.published_date}</td>
                  <td>{this.state.article.publisher}</td>
                </tr>
              </tbody>
            </table>
          </div>
          <div>
            <Link to={`/`}>See All Articles</Link>
          </div>
        </div>
      </div>
    );
  }
}

export default Comments;
