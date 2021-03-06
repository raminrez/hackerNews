import React, { Component } from "react";
import axios from "axios";

import "./App.css";
import Search from "./components/Search/Search";
import Table from "./components/Table/Table";
import Button from "./components/Button/Button";

import {
  DEFAULT_QUERY,
  DEFAULT_HPP,
  PATH_BASE,
  PATH_SEARCH,
  PARAM_SEARCH,
  PARAM_PAGE,
  PARAM_HPP
} from "./constants/index.js";

const updateSearchTopStoriesState = (hits, page) => prevState => {
  const { searchKey, results } = prevState;
  const oldHits = results && results[searchKey] ? results[searchKey].hits : [];
  const updatedHits = [...oldHits, ...hits];
  return {
    results: {
      ...results,
      [searchKey]: { hits: updatedHits, page }
    },
    isLoading: false
  };
};

/**
 * @todo write all sides test for components
 */
class App extends Component {
  _isMount = false; // check mount status for managing http requests and prevent send requests on unMounted lifecycle
  constructor() {
    super();
    this.state = {
      results: null,
      searchKey: "",
      searchTerm: DEFAULT_QUERY,
      error: null,
      isLoading: false
    };

    this.onDismiss = this.onDismiss.bind(this);
    this.onSearchChange = this.onSearchChange.bind(this);
    this.setSearchTopStories = this.setSearchTopStories.bind(this);
    this.onSearchSubmit = this.onSearchSubmit.bind(this);
    this.fetchSearchTopStories = this.fetchSearchTopStories.bind(this);
    this.needsToSearchTopStories = this.needsToSearchTopStories.bind(this);
  }

  /**
   * @param {Object} result get fetchet data and check old values then set in state
   */

  /**
   * check if already don't have data in state
   * @param {String} searchTerm
   * @returns {boolean}
   */
  needsToSearchTopStories(searchTerm) {
    return !this.state.results[searchTerm];
  }

  onSearchSubmit(event) {
    const { searchTerm } = this.state;
    if (this.needsToSearchTopStories(searchTerm)) {
      this.fetchSearchTopStories(searchTerm);
    }
    this.setState({ searchKey: searchTerm });
    event.preventDefault();
  }

  fetchSearchTopStories(searchTerm, page = 0) {
    this.setState({ isLoading: true });
    axios(
      `${PATH_BASE}${PATH_SEARCH}?${PARAM_SEARCH}${searchTerm}&${PARAM_PAGE}${page}&${PARAM_HPP}${DEFAULT_HPP}`
    )
      .then(result => this._isMount && this.setSearchTopStories(result.data))
      .catch(error => this._isMount && this.setState({ error }));
  }

  setSearchTopStories(result) {
    const { hits, page } = result;
    this.setState(updateSearchTopStoriesState(hits, page));
  }

  /**
   * remove passed id from results in state
   * @param {String} id selected row id
   */
  onDismiss(id) {
    this.setState(prevState => {
      const { searchKey, results } = prevState;
      const { hits, page } = results[searchKey];
      const isNotId = item => item.objectID !== id;
      const updatedHits = hits.filter(isNotId);
      return {
        results: {
          ...results,
          [searchKey]: { hits: updatedHits, page }
        }
      };
    });
  }

  onSearchChange(event) {
    this.setState({ searchTerm: event.target.value });
  }

  componentDidMount() {
    this._isMount = true;
    const { searchTerm } = this.state;
    this.setState({ searchKey: searchTerm });
    this.fetchSearchTopStories(searchTerm); //fetch on default values
  }

  componentWillUnmount = () => {
    this._isMount = false; //its prevent unnecessary http requests in unMounted state
  };

  render() {
    const { searchTerm, results, searchKey, error, isLoading } = this.state;
    const page =
      (results && results[searchKey] && results[searchKey].page) || 0; //check current page value

    const list =
      (results && results[searchKey] && results[searchKey].hits) || [];

    return (
      <div className="page">
        <div className="interactions">
          <Search
            onSubmit={this.onSearchSubmit}
            onChange={this.onSearchChange}
            value={searchTerm}
          >
            Search
          </Search>
        </div>
        {error ? (
          <p>Something went wrong.</p>
        ) : (
          <TableWithData onDismiss={this.onDismiss} list={list} />
        )}
        <div className="interactions">
          <ButtonWithLoading
            isLoading={isLoading}
            onClick={() => this.fetchSearchTopStories(searchKey, page + 1)}
          >
            More
          </ButtonWithLoading>
        </div>
      </div>
    );
  }
}
const withLoading = Component => ({ isLoading, ...rest }) =>
  isLoading ? <Loading /> : <Component {...rest} />;

const ButtonWithLoading = withLoading(Button);

const Loading = () => {
  return <div>Loading ...</div>;
};

const withData = Component => ({ ...props }) => {
  return props.list.length ? <Component {...props} /> : null;
};

const TableWithData = withData(Table);

export default App;
