import React, {useEffect, useState} from 'react'
import NewsItem from './NewsItem'
import Loading from './Loading';
import PropTypes from 'prop-types'
import InfiniteScroll from 'react-infinite-scroll-component';



const News = (props) => {

    const [articles, setArticle] = useState([]);
    const [loading, setLoading] = useState(true);
    const [page, setPage] = useState(1);
    const [totalResults, setTotalResults] = useState(0);

  

    const updateNews = async () => {
      props.setProgress(0);
      let url = `https://newsapi.org/v2/top-headlines?country=${props.country}&category=${props.category}&apiKey=${props.apiKey}&page=${page}&pageSize=${props.pageSize}`;
      setLoading(true);//this.setState({loading: true});
        let data = await fetch(url);// here data itself is a promise because fetch(url) returns a promise
        props.setProgress(30);
        let parsedData = await data.json();
        props.setProgress(70);
        // this.setState({articles: parsedData.articles, totalResults: parsedData.totalResults,
        //     loading: false, page:this.state.page+1});
        setArticle(parsedData.articles);
        setTotalResults(parsedData.totalResults);
        setLoading(false);
        setPage(page+1);

        props.setProgress(100);
        
    }

    useEffect(()=>{
      updateNews();
      //eslint-disable-next-line
    },[]);

    const fetchMoreData = async()=>{

      setPage(page+1);

      let url = `https://newsapi.org/v2/top-headlines?country=${props.country}&category=${props.category}&apiKey=${props.apiKey}&page=${page}&pageSize=${props.pageSize}`;
      setLoading(true);
        let data = await fetch(url);// here data itself is a promise because fetch(url) returns a promise
        let parsedData = await data.json();
        //console.log(parsedData);
        
          setArticle(articles.concat(parsedData.articles));
          setTotalResults(parsedData.totalResults);
          setLoading(false);

    }


  //   handleNextClick=async ()=>{
  //   //     if(this.state.page+1 > Math.ceil(this.state.totalResults/this.props.pageSize)){

  //   //     }
  //   //     else{
  //   //     let url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=2481577306154c9980d444f68bc5e800&page=${this.state.page+1}&pageSize=${this.props.pageSize}`;
  //   //     this.setState({loading: true});
  //   //     let data = await fetch(url);// here data itself is a promise because fetch(url) returns a promise
  //   //     let parsedData = await data.json();
  //   //     //console.log(parsedData);
  //   //     this.setState({
  //   //         page: this.state.page+1,
  //   //         articles: parsedData.articles,
  //   //         loading: false
  //   //     })
  //   // }
  //   // }
    
  //   this.setState({
  //     page: this.state.page+1
  //   })
  //   this.updateNews();
  // }

    // handlePrevClick=async ()=>{
    //     // let url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=2481577306154c9980d444f68bc5e800&page=${this.state.page-1}&pageSize=${this.props.pageSize}`;
    //     // this.setState({loading: true});
    //     // let data = await fetch(url);// here data itself is a promise because fetch(url) returns a promise
    //     // let parsedData = await data.json();
    //     // //console.log(parsedData);
    //     // this.setState({
    //     //     page: this.state.page-1,
    //     //     articles: parsedData.articles,
    //     //     loading: false
    //     // })
        
    //     this.setState({
    //       page: this.state.page-1
    //     })
        
    //     this.updateNews();
    // }
    
    
  
    return (
      <>
        <h2 className="text-center" style={{marginTop: '90px'}}>NewsMonkey - Top news</h2>
        {loading && <Loading/>}
        
            {/* {!this.state.loading && this.state.articles?.map((element)=>{ */}
            <InfiniteScroll
            dataLength={articles.length}
            next={fetchMoreData}
            hasMore={articles.length !== totalResults}
            loader={loading && <Loading/>}
            >
              <div className="container">
            <div className="row">
            {/* {console.log(this.state.articles.length)} */}
            {articles?.map((element)=>{
                return <div className='col-md-4' key={element.url}>
                    <NewsItem title={element.title} description={element.description==null?null:element.description.slice(0,50)} imageUrl={element.urlToImage} newsUrl={element.url} author={element.author} date={element.publishedAt} source={element.source.name}/>
                    </div>
            })}
            </div>
            </div>
            </InfiniteScroll>
        

        {/* <div className='container d-flex justify-content-between'>
            <button disabled={this.state.page<=1} type='button' className="btn btn-primary" onClick={this.handlePrevClick}>&larr; Previous</button>
            <button disabled={this.state.page>=Math.ceil(this.state.totalResults/this.props.pageSize)}type='button' className="btn btn-primary" onClick={this.handleNextClick}>Next &rarr;</button>
        </div> */}
      </>
    )
  
}

News.defaultProps = {
  country: 'in',
  category: "general",
}

News.propTypes = {
  country: PropTypes.string,
  pageSize: PropTypes.number,
  category: PropTypes.string,
}


export default News
