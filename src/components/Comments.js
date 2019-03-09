/* eslint-disable class-methods-use-this */
/* eslint-disable react/destructuring-assignment */
/* eslint-disable jsx-a11y/label-has-for */
/* eslint-disable jsx-a11y/label-has-associated-control */
import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

class Comments extends Component {
  constructor(props) {
    super(props);
    this.state = {
      article: [],
      comments: [],
      subjectForm: '',
      authorForm: '',
      commentForm: '',
    };
  }

  componentDidMount = () => {
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
  };

  handleFormSubmit = event => {
    // When the form is submitted, prevent its default behavior, get recipes update the recipes state
    event.preventDefault();
    if (
      this.state.subjectForm === `` ||
      this.state.authorForm === `` ||
      this.state.commentForm === ``
    ) {
      // eslint-disable-next-line no-alert
      alert(`Please fill out all the forms!`);
    } else {
      axios
        .post(`/api/article/comment/${this.props.match.params.id}`, {
          subject: this.state.subjectForm,
          author: this.state.authorForm,
          comment: this.state.commentForm,
        })
        .then(res => {
          this.setState({ comments: res.data });
          console.log(this.state.comments);
        })
        .catch(error => {
          console.log(error);
        });

      this.setState({
        subjectForm: '',
        authorForm: '',
        commentForm: '',
      });
    }
  };

  handleInputChange = event => {
    // Destructure the name and value properties off of event.target
    // Update the appropriate state
    const { name, value } = event.target;
    this.setState({
      [name]: value,
    });
  };

  logout() {
    localStorage.removeItem('jwtToken');
    window.location.reload();
  }

  render() {
    return (
      <div className="container">
        <div className="panel panel-default">
          <div className="panel-heading">
            <h3 className="panel-title">
              ARTICLE CATALOG &nbsp;
              {localStorage.getItem('jwtToken') && (
                <button type="button" className="btn btn-primary" onClick={this.logout}>
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
            <Link to="/">See All Articles</Link>
          </div>
          <div id="bodyDiv" className="col-12">
            <h2>Comment Section</h2>
            <label className="labelTitle">Subject:</label>
            <div>
              <input
                className="form-control"
                name="subjectForm"
                value={this.state.subjectForm}
                onChange={this.handleInputChange}
                type="text"
                style={{ width: 400 }}
                placeholder="Type in subject!"
              />
            </div>
            <label className="labelTitle">Author:</label>
            <div>
              <input
                className="form-control"
                name="authorForm"
                value={this.state.authorForm}
                onChange={this.handleInputChange}
                type="text"
                style={{ width: 400 }}
                placeholder="Type in author!"
              />
            </div>
            <label className="labelTitle">Body:</label>
            <div>
              <input
                className="form-control"
                name="commentForm"
                value={this.state.commentForm}
                onChange={this.handleInputChange}
                type="text"
                style={{ width: 400 }}
                placeholder="Type in body!"
              />
            </div>
            <br />
            <br />
            <div>
              <button type="submit" onClick={this.handleFormSubmit}>
                Save
              </button>
            </div>
            <br />
          </div>
        </div>
      </div>
    );
  }
}

export default Comments;
