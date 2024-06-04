import './App.css';

import React, { useState } from 'react'
import Navbar from './components/Navbar';
import News from './components/News';
import LoadingBar from 'react-top-loading-bar'
import {
  BrowserRouter as Router,
  Routes,
  Route
} from "react-router-dom";


const App = () => {

  const [progress, setprogress] = useState(0);

  // state = {
  //   progress: 0
  // }

  // setProgress = (progress)=>{
  //   this.setState({
  //     progress : progress
  //   })
  // }

  const setProgress= (progress) => {
    setprogress(progress);
  }

  let pageSize=6;
  let apiKey = process.env.REACT_APP_NEWS_API;

 
    return (
      <div>
        <Router>
        <Navbar title='News Monkey'/>
        <LoadingBar
        height={4}
        color='#f11946'
        progress={progress}
        // onLoaderFinished={() => setProgress(0)}
      />
        <Routes>
          <Route exact path="/" element={<News setProgress={setProgress} apiKey={apiKey}  key="general" pageSize ={pageSize} category="general"/>} />
          <Route exact path="/business" element={<News setProgress={setProgress} apiKey={apiKey}  key="business" pageSize ={pageSize} category="business"/>} />
          <Route exact path="/entertainment"element={<News setProgress={setProgress} apiKey={apiKey}  key="entertainment" pageSize ={pageSize} category="entertainment"/>} />
          <Route exact path="/general" element={<News setProgress={setProgress} apiKey={apiKey}  key="general" pageSize ={pageSize} category="general"/>} />
          <Route exact path="/health" element={<News setProgress={setProgress} apiKey={apiKey}  key="health" pageSize ={pageSize} category="health"/>} />
          <Route exact path="/science" element={<News setProgress={setProgress} apiKey={apiKey}  key="science" pageSize ={pageSize} category="science"/>} />
          <Route exact path="/sports" element={<News setProgress={setProgress} apiKey={apiKey}  key="sports" pageSize ={pageSize} category="sports"/>} />
          <Route exact path="/technology" element={<News setProgress={setProgress} apiKey={apiKey}  key="technology" pageSize ={pageSize} category="technology"/>} />
        </Routes>
        </Router>
      </div>
    )
  
}

export default App