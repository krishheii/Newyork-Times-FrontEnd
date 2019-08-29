import React from "react";
import './searchResult.css';
import axios from 'axios';
import Thumbnail from '../assets/thumbnail.png';
import Loading from '../assets/loading-logo.png';
const thumnailUrl = 'https://static01.nyt.com';
class Searchresult extends React.Component {
    constructor(props) {
        super(props)
        this.imagRef = React.createRef();
    }
    state = {
        articles: [],
        imageArray: [],
        search: this.props.search,
        call: false
    }

    componentDidMount() {

        axios.get(`https://api.nytimes.com/svc/search/v2/articlesearch.json?q=${this.state.search}&api-key=zYBD3pNcDZpMCgiTlgqUtOBX8cKGDWkU`)
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
                this.setState({ call: true })
            })

    }

    componentDidUpdate() {
        if (this.state.search !== this.props.search && this.state.call === true) {
            console.log(this.props.search, "state", this.state.search)
            axios.get(`https://api.nytimes.com/svc/search/v2/articlesearch.json?q=${this.props.search}&api-key=zYBD3pNcDZpMCgiTlgqUtOBX8cKGDWkU`)
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
                    this.setState({ search: this.props.search })
                })
        }

    }


    render() {
        if (this.state.articles.length !== 0) {
            return (
                <div className="search-holeder">
                    <div className="row">
                        {this.state.articles && this.state.articles.map((item, index) => {
                            return (
                                <div key={index} ref={this.imagRef} style={{ width: '18rem' }} className="card search-card ">

                                    <img src={this.state.articles && this.state.imageArray[index]} alt="Newyork Times" className="card-img-top" />
                                    <div className="card-body">
                                        <h5 className="card-title">{item.headline.main}</h5>
                                        <p className="card-text"> {item.abstract}</p>
                                        <a href={item.web_url} className="btn btn-danger search-button">Details</a>
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
                <div
                    style={{
                        backgroundImage: `url(${Loading})`,
                        backgroundPosition: 'center',
                        backgroundSize: 'cover',
                        backgroundRepeat: 'no-repeat'
                    }} className="loader-relavance"
                    className="loader-newest"
                    className="loader-search">

                </div>);
        }
    }
}

export default Searchresult;