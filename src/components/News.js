import React, { Component } from 'react'
import NewsItem from './NewsItem'

export class News extends Component {

    constructor(){
        super();
        this.state={
            articles: [],
            loading: false,
            page: 1
        }
    }

    async componentDidMount(){
        let url = "https://newsapi.org/v2/top-headlines?country=us&apiKey=2481577306154c9980d444f68bc5e800&page=1&pageSize=20";
        let data = await fetch(url);// here data itself is a promise because fetch(url) returns a promise
        let parsedData = await data.json();
        //console.log(parsedData);
        this.setState({articles: parsedData.articles, totalResults: parsedData.totalResults});
    }


    handleNextClick=async ()=>{
        if(this.state.page+1 > Math.ceil(this.state.totalResults/20)){

        }
        else{
        let url = `https://newsapi.org/v2/top-headlines?country=us&apiKey=2481577306154c9980d444f68bc5e800&page=${this.state.page+1}&pageSize=20`;
        let data = await fetch(url);// here data itself is a promise because fetch(url) returns a promise
        let parsedData = await data.json();
        //console.log(parsedData);
        this.setState({
            page: this.state.page+1,
            articles: parsedData.articles
        })
    }
    }

    handlePrevClick=async ()=>{
        let url = `https://newsapi.org/v2/top-headlines?country=us&apiKey=2481577306154c9980d444f68bc5e800&page=${this.state.page-1}&pageSize=20`;
        let data = await fetch(url);// here data itself is a promise because fetch(url) returns a promise
        let parsedData = await data.json();
        //console.log(parsedData);
        this.setState({
            page: this.state.page-1,
            articles: parsedData.articles
        })
    }
    

  render() {
    return (
      <div className='container'>
        <h2 className="row ms-4">NewsMonkey - Top news</h2>
        <div className="row ms-4">
            {this.state.articles?.map((element)=>{
                return <div className='col-md-4' key={element.url}>
                    <NewsItem title={element.title} description={element.description==null?null:element.description.slice(0,50)} imageUrl={element.urlToImage} newsUrl={element.url}/>
                    </div>
            })}
            
        </div>

        <div className='container d-flex justify-content-between'>
            <button disabled={this.state.page<=1} type='button' className="btn btn-primary" onClick={this.handlePrevClick}>&larr; Previous</button>
            <button disabled={this.state.page>=Math.ceil(this.state.totalResults/20)}type='button' className="btn btn-primary" onClick={this.handleNextClick}>Next &rarr;</button>

        </div>
      </div>
    )
  }
}

export default News
