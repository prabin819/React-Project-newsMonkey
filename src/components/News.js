import React, { Component } from 'react'
import NewsItem from './NewsItem'
import Loading from './Loading';
import PropTypes from 'prop-types'


export class News extends Component {

    static defaultProps = {
        country: 'in',
        pageSize: 1,
        category: "general",
      }

      static propTypes = {
        country: PropTypes.string,
        pageSize: PropTypes.number,
        category: PropTypes.string,
      }

    constructor(){
        super();
        this.state={
            articles: [],
            loading: false,
            page: 1
        }
    }

    async updateNews(){
      let url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=2481577306154c9980d444f68bc5e800&page=${this.state.page}&pageSize=${this.props.pageSize}`;
        this.setState({loading: true});
        let data = await fetch(url);// here data itself is a promise because fetch(url) returns a promise
        let parsedData = await data.json();
        //console.log(parsedData);
        this.setState({articles: parsedData.articles, totalResults: parsedData.totalResults,
            loading: false});
    }

    async componentDidMount(){
        // let url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=2481577306154c9980d444f68bc5e800&page=1&pageSize=${this.props.pageSize}`;
        // this.setState({loading: true});
        // let data = await fetch(url);// here data itself is a promise because fetch(url) returns a promise
        // let parsedData = await data.json();
        // //console.log(parsedData);
        // this.setState({articles: parsedData.articles, totalResults: parsedData.totalResults,
        //     loading: false});
    this.updateNews();
    }


    handleNextClick=async ()=>{
    //     if(this.state.page+1 > Math.ceil(this.state.totalResults/this.props.pageSize)){

    //     }
    //     else{
    //     let url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=2481577306154c9980d444f68bc5e800&page=${this.state.page+1}&pageSize=${this.props.pageSize}`;
    //     this.setState({loading: true});
    //     let data = await fetch(url);// here data itself is a promise because fetch(url) returns a promise
    //     let parsedData = await data.json();
    //     //console.log(parsedData);
    //     this.setState({
    //         page: this.state.page+1,
    //         articles: parsedData.articles,
    //         loading: false
    //     })
    // }
    // }
    
    this.setState({
      page: this.state.page+1
    })
    this.updateNews();
  }

    handlePrevClick=async ()=>{
        // let url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=2481577306154c9980d444f68bc5e800&page=${this.state.page-1}&pageSize=${this.props.pageSize}`;
        // this.setState({loading: true});
        // let data = await fetch(url);// here data itself is a promise because fetch(url) returns a promise
        // let parsedData = await data.json();
        // //console.log(parsedData);
        // this.setState({
        //     page: this.state.page-1,
        //     articles: parsedData.articles,
        //     loading: false
        // })
        
        this.setState({
          page: this.state.page-1
        })
        
        this.updateNews();
    }
    

  render() {
    return (
      <div className='container'>
        <h2 className="row ms-4">NewsMonkey - Top news</h2>
        {this.state.loading && <Loading/>}
        <div className="row ms-4">
            {!this.state.loading && this.state.articles?.map((element)=>{
                return <div className='col-md-4' key={element.url}>
                    <NewsItem title={element.title} description={element.description==null?null:element.description.slice(0,50)} imageUrl={element.urlToImage} newsUrl={element.url} author={element.author} date={element.publishedAt} source={element.source.name}/>
                    </div>
            })}
            
        </div>

        <div className='container d-flex justify-content-between'>
            <button disabled={this.state.page<=1} type='button' className="btn btn-primary" onClick={this.handlePrevClick}>&larr; Previous</button>
            <button disabled={this.state.page>=Math.ceil(this.state.totalResults/this.props.pageSize)}type='button' className="btn btn-primary" onClick={this.handleNextClick}>Next &rarr;</button>

        </div>
      </div>
    )
  }
}

export default News
