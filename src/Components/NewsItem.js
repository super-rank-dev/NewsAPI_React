import React from 'react'





const NewsItem= (props)=>  {

 
    let {title, description, imageUrl, newsUrl, author, publishedAt, source} = props;
    return (
      <div>
        <div className="card my-5">
        <span className="position-absolute top-0 translate-middle p-2 bg-danger border border-light rounded-circle" style = {{left: "90%", zindex: "1"}}> 
          {source}
          </span>
         
         <img src={imageUrl? imageUrl : "https://www.relisto.com/wp-content/uploads/2017/10/breaking-news.jpg"} className="card-img-top" alt="..."/>
          <div className="card-body">
          <h6 className="card-title">{title}
          
          </h6>
          <p className="card-text">{description}</p>
          <p className="card-text"><small className="text-danger"> By {author} Published at {new Date(publishedAt).toLocaleString()}</small></p>
          <a rel = "noreference" href = {newsUrl} target = "-blank" className="btn btn-sm btn-dark">See details</a>
          </div>
        </div>
      </div>
    )
  }


export default NewsItem
