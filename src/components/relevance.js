import React from "react";
import './relevance.css';
import axios from 'axios';
import Thumbnail from '../assets/thumbnail.png';
import Loading from '../assets/loading-logo.png';
const thumnailUrl = 'https://static01.nyt.com';
class Relevance extends React.Component {
    state = {
        articles: [],
        imageArray: []
    }
    componentDidMount() {
        axios.get(`https://api.nytimes.com/svc/search/v2/articlesearch.json?api-key=zYBD3pNcDZpMCgiTlgqUtOBX8cKGDWkU`)
            .then(res => {
                const articles = res.data.response.docs;
                this.setState({ articles })
                let imageArray = []
                articles.map(item => {
                    if (item.multimedia.length !== 0)
                        imageArray.push(thumnailUrl + '/' + item.multimedia[0].url)
                    else
                        imageArray.push(Thumbnail)
                })
                this.setState({ imageArray })
            })
    }

    render() {
        if (this.state.articles.length !== 0) {
            return (
                <div>
                    <div className="display-4 trending-heading">Trending...</div>
                    <div className="relevance-block">
                        <div className="row">
                            {this.state.articles && this.state.articles.map((item, index) => {
                                return (
                                    <div key={index} className="card relevance-card">

                                        <img src={this.state.articles && this.state.imageArray[index]} className="card-img-top" alt="Newyork Times" />
                                        <div className="card-body">
                                            <h5 className="card-title">{item.headline.main}</h5>
                                            <p className="card-text"> {item.abstract}</p>
                                            <a href={item.web_url} className="btn btn-danger relevance-button">Details</a>
                                        </div>
                                    </div>
                                );
                            }
                            )}
                        </div>
                    </div>
                </div>
            );
        }
        else {
            return (
                <div style={{  
                    backgroundImage: `url(${Loading})`,
                    backgroundPosition: 'center',
                    backgroundSize: 'cover',
                    backgroundRepeat: 'no-repeat'
                  }} className="loader-relavance">
                   
                </div>);
        }
    }
}

export default Relevance;