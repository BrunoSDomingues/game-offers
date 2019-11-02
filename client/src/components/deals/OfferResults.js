import React, { Component } from "react";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { logoutUser } from "../../actions/authActions";
import { stores } from "../stores";
const fetch = require('node-fetch');

const url_deals = new URL('http://www.cheapshark.com/api/1.0/deals');

class OfferResults extends Component {
    constructor(props) {
        super(props)

        let params = this.props.location.state;
        Object.keys(params).forEach(key => url_deals.searchParams.append(key, params[key]))
        this.state = {
            output: null,
            isLoading: true,
            error: null
        };
    }

    async componentDidMount() {
        const response = await fetch(url_deals);
        const data = await response.json();
        this.setState({ output: data, isLoading: false });
    }

    getRedirect(deal_id) {
        let redir = new URL("http://www.cheapshark.com/redirect?");
        let params = { dealID: deal_id };

        Object.keys(params).forEach(key => {
            if (params[key] !== decodeURIComponent(params[key])) {
                while (params[key] !== decodeURIComponent(params[key])) {
                    params[key] = decodeURIComponent(params[key])
                }
            }
            redir.searchParams.append(key, params[key])
        })

        return redir;
    }

    createResults() {
        let res = [];
        let len = Object.keys(this.state.output).length;

        for (let i = 0; i < len; i++) {
            let r = this.state.output[i];
            let store_info = stores[r.storeID];
            let logo = new URL("http://www.cheapshark.com" + store_info.images.logo)
            res.push(
                <div className="result" key={i}>
                    <div className="game">
                        <div className="thumbnail">
                            <img src={r.thumb} alt="" />
                        </div>
                        <div className="game-title">
                            {r.title}
                        </div>
                    </div>
                    <div className="prices">
                        <div className="store">
                            <img src={logo} style={{ maxWidth: "15%" }} />
                            <a href={this.getRedirect(r.dealID)}>{store_info.storeName}</a>
                        </div>
                        <div className="price">
                            <h7>US$ {r.salePrice}</h7>
                        </div>
                    </div>
                </div>
            )
        }

        return res;
    }

    render() {
        return (
            <div style={{ height: "100%" }} className="container valign-wrapper">
                <div classNameName="row">
                    <Link to="/dashboard" className="btn-flat waves-effect">
                        <i className="material-icons left">keyboard_backspace</i> Voltar à página principal
                            </Link>
                    <br/>
                    <br/>
                    <br/>
                    {this.state.isLoading || !this.state.output ? (
                        <div classNameName="row">
                            <h5>Carregando...</h5>
                        </div>
                    ) : (
                            <div id="results" style={{ width: "100%" }}>
                                {this.createResults()}
                            </div>
                        )}
                </div>
            </div>
        )
    }
}

OfferResults.propTypes = {
    auth: PropTypes.object.isRequired
}

const mapStateToProps = state => ({
    auth: state.auth
});

export default connect(
    mapStateToProps,
    { logoutUser }
)(OfferResults);