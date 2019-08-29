import React from 'react';
import './App.css';
import Navbar from './components/navbar.js';
import Relevance from './components/relevance';
import Newest from './components/newest';
import SearchResult from './components/searchResult';
class App extends React.Component {
  state = {
    search: ''
  }
  onsubmitSearch = (search) => {
    console.log(search)
    this.setState({ search })
  }
  render() {

    if (this.state.search !== '')
      return (<div className="row">

        <div className="col-12">
          <Navbar onSubmit={this.onsubmitSearch} />
        </div>
        <div className="col-12">
          <SearchResult search={this.state.search}  />
        </div>
      </div>);
    else {
      return (
        <div>
          <Navbar onSubmit={this.onsubmitSearch} />
          <div className="container-fluid">
            <div className="row">
              <div className="col-lg-6 col-sm-12">
                <Newest />
              </div>
              <div className="col-lg-6 col-sm-12">

                
                  <Relevance />
                
              </div>
            </div>
          </div>
        </div>

      );
    }
  }
}

export default App;
