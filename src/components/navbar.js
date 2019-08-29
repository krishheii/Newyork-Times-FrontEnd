import React from "react";
import './navbar.css';
import Logo from '../assets/logo.png';
class Navbar extends React.Component {
    state = {

        search:''

    }
    searchValue = (event) => {
        this.setState({
            search: event.target.value
        });

    }
    formSubmit = event => {
        event.preventDefault();
        console.log(this.state.search)
        this.props.onSubmit(this.state.search)
    }
    render() {

        return (
            <div>

                <div className="nav-bar">
                    <div className="container">
                        <div className="row">
                            <div className=" col-12 col-sm-12 col-lg-6">
                                <a href="http://localhost:3000/">
                                    <img className="logo" alt="Newyork Times" src={Logo}></img>
                                </a>
                            </div>
                            <div className=" col-12 col-sm-12 col-lg-6">
                                <form onSubmit={this.formSubmit}>
                                    <input className="form-control search mr-sm-2" value={this.state.search} onChange={this.searchValue} type="search" placeholder="Type and press enter" aria-label="Search" />
                                </form>
                            </div>
                        </div>
                    </div>
                </div>

            </div>
        );
    }
}

export default Navbar;