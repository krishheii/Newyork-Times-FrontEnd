import React from "react";
import './newest.css';
import axios from 'axios';
import Thumbnail from '../assets/thumbnail.png';
import Loading from '../assets/loading-logo.png';
const thumnailUrl = 'https://static01.nyt.com';
class Newest extends React.Component {
    state = {
        articles: [],
        imageArray: []
    }
    componentDidMount() {
        axios.get(`https://api.nytimes.com/svc/search/v2/articlesearch.json?sort=newest&api-key=zYBD3pNcDZpMCgiTlgqUtOBX8cKGDWkU`)
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
                <div >
                    <p className="display-4 Newest-heading">Newest</p>
                    <div className="Newest-block">
                        {this.state.articles && this.state.articles.map((item, index) => {
                            return (


                                <div key={index} className="card mb-3 newest-card" >
                                    <div className="row no-gutters">
                                        <div className="col-md-4">
                                            <img src={this.state.articles && this.state.imageArray[index]} className="card-img" alt="..." />
                                        </div>
                                        <div className="col-md-8">
                                            <div className="card-body">
                                                <h5 className="card-title">{item.headline.main}</h5>
                                                <p className="card-text">{item.abstract}</p>
                                                <p className="card-text"><small className="text-muted">{item.pub_date.slice(0, 10)}</small></p>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            );
                        }
                        )}
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
                  }} className="loader-relavance"
                className="loader-newest"></div>);
        }
    }
}

export default Newest;