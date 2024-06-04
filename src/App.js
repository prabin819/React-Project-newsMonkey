import logo from './logo.svg';
import './App.css';

import React, { Component } from 'react'
import Navbar from './components/Navbar';
import News from './components/News';
import LoadingBar from 'react-top-loading-bar'
import {
  BrowserRouter as Router,
  Routes,
  Route
} from "react-router-dom";


export default class App extends Component {

  state = {
    progress: 0
  }

  setProgress = (progress)=>{
    this.setState({
      progress : progress
    })
  }

  pageSize=6;
  apiKey = process.env.REACT_APP_NEWS_API;

  render() {
    return (
      <div>
        <Router>
        <Navbar title='News Monkey'/>
        <LoadingBar
        height={4}
        color='#f11946'
        progress={this.state.progress}
        // onLoaderFinished={() => setProgress(0)}
      />
        <Routes>
          <Route exact path="/" element={<News setProgress={this.setProgress} apiKey={this.apiKey}  key="general" pageSize ={this.pageSize} category="general"/>} />
          <Route exact path="/business" element={<News setProgress={this.setProgress} apiKey={this.apiKey}  key="business" pageSize ={this.pageSize} category="business"/>} />
          <Route exact path="/entertainment"element={<News setProgress={this.setProgress} apiKey={this.apiKey}  key="entertainment" pageSize ={this.pageSize} category="entertainment"/>} />
          <Route exact path="/general" element={<News setProgress={this.setProgress} apiKey={this.apiKey}  key="general" pageSize ={this.pageSize} category="general"/>} />
          <Route exact path="/health" element={<News setProgress={this.setProgress} apiKey={this.apiKey}  key="health" pageSize ={this.pageSize} category="health"/>} />
          <Route exact path="/science" element={<News setProgress={this.setProgress} apiKey={this.apiKey}  key="science" pageSize ={this.pageSize} category="science"/>} />
          <Route exact path="/sports" element={<News setProgress={this.setProgress} apiKey={this.apiKey}  key="sports" pageSize ={this.pageSize} category="sports"/>} />
          <Route exact path="/technology" element={<News setProgress={this.setProgress} apiKey={this.apiKey}  key="technology" pageSize ={this.pageSize} category="technology"/>} />
        </Routes>
        </Router>
      </div>
    )
  }
}

