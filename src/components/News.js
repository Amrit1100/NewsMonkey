import React, { Component } from 'react'
import NewsItem from './NewsItem'
import Spinner from './Spinner';

export class News extends Component {
  articles = [
  ]

  capitalizeFirstLetter(string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
}
  constructor(props){
    super(props);
    console.log("Hello, I am a constructor function.")
    this.state = {
      articles : this.articles,
      loading : true,
      page_size : 20,
      page : 1
    }

   document.title = `${this.capitalizeFirstLetter(this.props.category)} - NewsMonkey` 
  }

  async componentDidMount(){
    this.setState({
      loading : true
    })
    let data = await fetch(`https://newsapi.org/v2/top-headlines?country=us&category=${this.props.category}&apiKey=57cf5a978cc74fd4907f0c80fa49fdca&page=${this.state.page}&pageSize=${this.props.pageSize}`)
    let parsedData = await data.json()
    console.log(parsedData)
    this.setState({articles : parsedData.articles, totalArticles : parsedData.totalResults, loading:false})
  }


  handlePrevious = async ()=>{
    console.log("Previous")
    this.setState({
      loading : true
    })
    let data = await fetch(`https://newsapi.org/v2/top-headlines?country=us&category=${this.props.category}&apiKey=57cf5a978cc74fd4907f0c80fa49fdca&page=${this.state.page - 1}&pageSize=${this.props.pageSize}`)
    let parsedData = await data.json()
    this.setState({articles : parsedData.articles, loading : false})
    console.log(parsedData.articles)
    this.setState({
      page: this.state.page - 1
    })
  }

  

  handleNext = async ()=>{
    console.log("Next")
    this.setState({
      loading:true
    })
    let data = await fetch(`https://newsapi.org/v2/top-headlines?country=us&category=${this.props.category}&apiKey=57cf5a978cc74fd4907f0c80fa49fdca&page=${this.state.page+1}&pageSize=${this.props.pageSize}`)
    let parsedData = await data.json()
    console.log(parsedData.articles)
    this.setState({articles : parsedData.articles, loading : false})
    this.setState({
      page : this.state.page + 1
    })

  }
  
  
  render() {
    return (
      <div className='container my-3'>
        <h2 className = "text-center" style={{margin : "35px 0px"}}>NewsMonkey - Top Headlines on {this.capitalizeFirstLetter(this.props.category)} </h2>
        {this.state.loading && <Spinner/>}
        <div className="row">
        {!this.state.loading && this.state.articles.map((element)=>{
            return  <div className="col-md-3" key ={element.url}><NewsItem title = {element.title} description = {element.description} imageUrl ={element.urlToImage} newsUrl = {element.url} author = {element.author}  date = {element.publishedAt} source = {element.source.name}/></div>
          })}
        </div>
        <div className="container d-flex justify-content-between">
        <button type="button" className="btn btn-dark" disabled = {this.state.page<=1}onClick={this.handlePrevious}>&#8592;Previous</button>
        <button type="button" className="btn btn-dark" onClick={this.handleNext} disabled = {this.state.page+1 > Math.ceil(this.state.totalArticles/this.props.pageSize)}>Next&#8594;</button>
        </div>
      </div>
    )
  }
}

export default News
        

