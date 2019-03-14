import React, { Component } from "react";
import API from "../../utils/API";
import { Book } from '../../components/Book'
import Jumbotron from "../../components/Jumbotron";
import { H1, H3, H4 } from '../../components/Headings';
import { Container, Row, Col } from "../../components/Grid";
import { Panel, PanelHeading, PanelBody } from '../../components/Panel';
import { Form, Input, FormBtn, FormGroup, Label } from "../../components/Form";


export default class Books extends Component {
  state = {
    format: '', // book format i.e. hardcover-fiction
    page: '0',//page of search results
    books: [],//array of results returned from api
    previousSearch: {},//previous search term saved after search completed
    noResults: false,//boolean used as flag for conditional rendering
  };


  //function to save a book
  saveBook = (book) => {
    //creating new book object
    let newBook = {
      date: book.pub_date,
      title: book.headline.main,
      url: book.web_url,
      summary: book.description
    }

    //calling the API
    API
      .saveBook(newBook)
      .then(results => {
        //removing the saved book from the results in state
        let unsavedBooks = this.state.results.filter(book => book.headline.main !== newBook.title)
        this.setState({ results: unsavedBooks })
      })
      .catch(err => console.log(err));
  }

  //capturing state of inputs on change
  handleInputChange = event => {
    let { name, value } = event.target;
    this.setState({ [name]: value })
  };

  //generating the query for the search from store state
  handleFormSubmit = event => {
    event.preventDefault();
    let { topic, sYear, eYear } = this.state;
    let query = { topic, sYear, eYear }
    this.getBooks(query)

  };

  //function that queries the NYT API
  getBooks = query => {
    //clearing the results array if the user changes search terms
    if (query.topic !== this.state.previousSearch.topic ||
      query.eYear !== this.state.previousSearch.eYear ||
      query.sYear !== this.state.previousSearch.sYear) {
      this.setState({ results: [] })
    }
    let { topic, sYear, eYear } = query
    let queryUrl = `https://api.nytimes.com/svc/books/v3/lists/current/hardcover-fiction.json?api-key=you${this.state.page}`

    // Old query URL for comparison
    // let queryUrl = `https://api.nytimes.com/svc/search/v2/articlesearch.json?sort=newest&page=${this.state.page}`

    let key = `&api-key=TZBzEuyISaV432LqBahDZC1YwILc41s7`

    //removing spaces and building the query url conditionally
    //based on presence of optional search terms
    if (topic.indexOf(' ') >= 0) {
      topic = topic.replace(/\s/g, '+');
    }
    if (topic) {
      queryUrl += `&fq=${topic}`
    }
    if (sYear) {
      queryUrl += `&begin_date=${sYear}`
    }
    if (eYear) {
      queryUrl += `&end_date=${eYear}`
    }
    queryUrl += key;

    //calling the API
    API
      .queryNYT(queryUrl)
      .then(results => {
        //concatenating new results to the current state of results.  If empty will just show results,
        //but if search was done to get more, it shows all results.  Also stores current search terms
        //for conditional above, and sets the noResults flag for conditional rendering of components below
        this.setState({
          results: [...this.state.results, ...results.data.response.docs],
          previousSearch: query,
          topic: '',
          sYear: '',
          eYear: ''
        }, function () {
          this.state.results.length === 0 ? this.setState({ noResults: true }) : this.setState({ noResults: false })
        });
      })
      .catch(err => console.log(err))
  }

  //function that is called when user clicks the get more results button
  getMoreResults = () => {
    let { bookType } = this.state.previousSearch;
    let query = { bookType }
    //increments page number for search and then runs query
    let page = this.state.page;
    page++
    this.setState({ page: page }, function () {
      this.getBooks(query)
    });
  }

  render() {
    return (
      <Container fluid>
        <Row>
          <Col size="sm-10" offset='sm-1'>
            <Jumbotron>
              <H1 className='page-header text-center'>New York Times Best Seller Searcher</H1>
              <H4 className='text-center'>Search for and save books of interest. For example </H4>
            </Jumbotron>
            <Panel>
              <PanelHeading>
                <H3>Search</H3>
              </PanelHeading>
              <PanelBody>
                <Form style={{ marginBottom: '30px' }}>
                  <FormGroup>
                    <Label htmlFor="bookType">Enter a book type to search for: (e.g., e-book-fiction or hardcover-fiction, not
        E-Book Fiction or Hardcover Fiction)</Label>
                    <Input
                      onChange={this.handleInputChange}
                      name='Book Type'
                      value={this.state.bookType}
                      placeholder='Book Type'
                    />
                  </FormGroup>
                  <FormBtn
                    disabled={!(this.state.bookType)}
                    onClick={this.handleFormSubmit}
                    type='info'
                  >Submit
                  </FormBtn>
                </Form>
              </PanelBody>
            </Panel>
            {this.state.noResults ?
              (<H1>No results Found.  Please try again</H1>) :
              this.state.results.length > 0 ? (
                <Panel>
                  <PanelHeading>
                    <H3>Results</H3>
                  </PanelHeading>
                  <PanelBody>
                    {
                      this.state.results.map((book, i) => (
                        <Book
                          key={i}
                          title={book.headline.main}
                          url={book.web_url}
                          summary={book.snippet}
                          date={book.pub_date}
                          type='Save'
                          onClick={() => this.saveBook(book)}
                        />
                      )
                      )
                    }
                    <FormBtn type='warning' additional='btn-block' onClick={this.getMoreResults}>Get more results</FormBtn>
                  </PanelBody>
                </Panel>
              ) : ''
            }
          </Col>
        </Row>
      </Container>
    );
  }
}
