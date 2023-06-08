import React, { useEffect, useState } from 'react'
import NewsItem from './NewsItem'
import Spinner from './Spinner';
import PropTypes from 'prop-types'
import InfiniteScroll from 'react-infinite-scroll-component';

const News =(props)=> {

  const [articles, setArticles] = useState([])
  const [loading, setLoading] = useState(true)
  const [page, setPage] = useState(1)
  const [totalResults, setTotalResults] = useState(0)


  
   const capitalizeFirstLetter=(string) => {
    return string.charAt(0).toUpperCase() + string.slice(1);
  
  }
  document.title = `${capitalizeFirstLetter(props.category)}Adda`

  
    const updateNews = async()=>{
      //console.log("ComponentDidMount");
      props.setProgress(10);
      let url = `https://newsapi.org/v2/top-headlines?country=${props.country}&category=${props.category}&apiKey=${props.apiKey}&page=${page}&pageSize=${props.pageSize}`;
     setLoading(true)
      props.setProgress(30);
      let data = await fetch(url);
      let parsedData = await data.json();
      props.setProgress(70);
      //console.log(parsedData);
      setArticles(parsedData.articles)
      setLoading(false)
      setTotalResults(parsedData.totalResults)
      props.setProgress(100);
  
    }
  
  useEffect(()=>{
    updateNews();
  })
  // async componentDidMount()
  // {
  //   // console.log("ComponentDidMount");
  //   // let url = `https://newsapi.org/v2/top-headlines?country=${props.country}&category=${props.category}&apiKey=a90a24e966ce4796927d94c7f0d3f1fa&page=1&pageSize=${props.pageSize}`;
  //   // this.setState({loading: true});
  //   // let data = await fetch(url);
  //   // let parsedData = await data.json();
  //   // console.log(parsedData);
  //   // this.setState({articles: parsedData.articles,
  //   // totalResults: parsedData.totalResults,
  //   // loading: false})
  //   this.updateNews();
  // }





//   handlePrevClick =async()=>{
//   // console.log("Previous")
//   // let url = `https://newsapi.org/v2/top-headlines?country=${props.country}&category=${props.category}&apiKey=a90a24e966ce4796927d94c7f0d3f1fa&page=${this.state.page-1}&pageSize=${props.pageSize}`;
//   // this.setState({loading: true});  
//   // let data = await fetch(url);
//   //   let parsedData = await data.json();
//   //   console.log(parsedData)
//   //   this.setState({
//   //     page: this.state.page-1,
//   //     articles: parsedData.articles,
//   //     loading: false})
//   this.setState({page: this.state.page-1})
//   this.updateNews();
// }



// handleNextClick=async ()=>{
//  // console.log("Next")
//   // let url = `https://newsapi.org/v2/top-headlines?country=${props.country}&category=${props.category}&apiKey=a90a24e966ce4796927d94c7f0d3f1fa&page=${this.state.page+1}&pageSize=${props.pageSize}`;
//   // this.setState({loading: true});
//   // let data = await fetch(url);
//   // let parsedData = await data.json();
//   // console.log(parsedData)
//   // this.setState({
//   //   page: this.state.page+1,
//   //   articles: parsedData.articles,
//   //   loading: false})
//   this.setState({page: this.state.page+1})
//   this.updateNews();
//   }


  const fetchMoreData = async() => {
    let url = `https://newsapi.org/v2/top-headlines?country=${props.country}&category=${props.category}&apiKey=${props.apiKey}&page=${page+1}&pageSize=${props.pageSize}`;
    setPage(page+1)  
    let data = await fetch(url);
    let parsedData = await data.json();
    //console.log(parsedData);
    
    setArticles(articles.concat(parsedData.articles));
    setTotalResults(parsedData.totalResults);
  
  };




  //console.log("render");
    return (
      <>
       {loading && <Spinner/>} 
      <h2 className ="text-center" style = {{margin: "23px 10px"}}> 
      NewsAdda-{capitalizeFirstLetter(props.category)} Headlines
      </h2>
      
      {/* {!this.state.loading && */} 
      <InfiniteScroll
          dataLength={articles.length}
          next={fetchMoreData}
          hasMore={articles.length !== totalResults}
          loader={<h4><Spinner/></h4>} >
            <div className='container'>
        < div className = "row my-6">
        {articles.map((elements)=>{ 
        return <div className = "col-md-4" key = {elements.url}>
        <NewsItem title={elements.title} description= {elements.description?elements.description:" "} imageUrl = {elements.urlToImage} newsUrl = {elements.url} author={elements.author? elements.author:"Unknown source"} publishedAt={elements.publishedAt} source={elements.source.name} />
              </div>
            })}
          </div> 
          </div>
          </InfiniteScroll>  
                {/* <div className="conatiner d-flex justify-content-between">
                <button disabled={this.state.page<=1} type="button" className="btn bt-sm btn-primary" onClick = {this.handlePrevClick}>
                &larr;Previous
                </button>
                <button disabled = {this.state.page+1 > Math.ceil(this.state.totalResults/props.pageSize)} type="button" className="btn btn-sm btn-primary" onClick = {this.handleNextClick}>
                Next &rarr;  
                </button>
                </div>  */}
      </>
    )
  }

News.defaultProps ={
  country: "in",
  pageSize: 6,
  category: "general"
}

News.propTypes = {
  country: PropTypes.string,
  pageSize: PropTypes.number,
  category: PropTypes.string
}


export default News
