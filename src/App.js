
import './App.css';

import React, { Component } from 'react'
import Navbar from './Components/Navbar';
import News from './Components/News';
import LoadingBar from 'react-top-loading-bar';

import {
BrowserRouter as Router,
Routes,
Route
}from 'react-router-dom';


export default class App extends Component {
  pageSize = 12;
  apiKey = 'a90a24e966ce4796927d94c7f0d3f1fa'
  //process.env.REACT_APP_NEWS_API;

  state= {
    progress:10
  };

  setProgress=(progress)=> {
    this.setState({progress: progress})
  }
  render() {
    return (
        <div>
         <Router>
         <LoadingBar
        color='#f11946'
        height = {4}
        progress={this.state.progress}
        shadow={true}
        //onLoaderFinished={() => setProgress(0)}
      />
         <Navbar/>
            <Routes>
            <Route exact path="/" element = {<News setProgress={this.setProgress} apiKey= {this.apiKey} key="general" pageSize={this.pageSize} category= {"general"} country = {"in"}/>}/>
            <Route exact path="/business"  element = {<News setProgress={this.setProgress} apiKey= {this.apiKey} key="business" pageSize={this.pageSize} category= {"business"} country = {"in"}/>}/>
            <Route exact path="/sports"  element = {<News setProgress={this.setProgress} apiKey= {this.apiKey} key="sports" pageSize={this.pageSize} category= {"sports"} country = {"in"}/>}/>
            <Route exact path="/entertainment"  element = {<News setProgress={this.setProgress} apiKey= {this.apiKey} key="entertainment" pageSize={this.pageSize} category= {"entertainment"} country = {"in"}/>}/>
            <Route exact path="/health"  element = {<News setProgress={this.setProgress} apiKey= {this.apiKey} key="health" pageSize={this.pageSize} category= {"health"} country = {"in"}/>}/>
            <Route exact path="/science"  element = {<News setProgress={this.setProgress} apiKey= {this.apiKey} key="science" pageSize={this.pageSize} category= {"science"} country = {"in"}/>}/>
            <Route exact path="/technology"element = {<News setProgress={this.setProgress} apiKey= {this.apiKey} key="technology" pageSize={this.pageSize} category= {"technology"} country = {"in"}/>}/>
            </Routes>
           </Router>
        </div>
      
  
    )
  }
}

