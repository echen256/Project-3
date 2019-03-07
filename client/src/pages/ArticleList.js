import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      articles: [],
    };
  }

  componentDidMount() {
    axios.defaults.headers.common['Authorization'] = localStorage.getItem('jwtToken');
    axios
      .get('/api/article')
      .then(res => {
        this.setState({ articles: res.data });
        console.log(this.state.articles);
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
                {this.state.articles.map(article => (
                  <tr>
                    <td>
                      <Link to={`/comments/${article._id}`}>{article.isbn}</Link>
                    </td>
                    <td>{article.title}</td>
                    <td>{article.author}</td>
                    <td>{article.description}</td>
                    <td>{article.published_date}</td>
                    <td>{article.publisher}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    );
  }
}

export default App;
