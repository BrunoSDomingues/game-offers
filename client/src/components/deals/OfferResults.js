import React, { Component } from "react";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { logoutUser } from "../../actions/authActions";
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
        this.setState({output: data, isLoading: false});
    }

    render() {
        return (
            <div style={{ height: "85vh" }} className="container valign-wrapper">
                <div className="row">
                            <Link to="/dashboard" className="btn-flat waves-effect">
                                <i className="material-icons left">keyboard_backspace</i> Voltar à página principal
                            </Link>
                    {this.state.isLoading || !this.state.output ? (
                        <div className="row">
                            <h5>Carregando...</h5>
                        </div>
                    ) : (
                        <div id="results" style={{ width: "100%"}}>
                            <div class="result">
                                <div class="game">
                                    <div class="thumbnail">
                                        <img src={this.state.output[0].thumb}/>
                                    </div>
                                    <div class="game-title">
                                        {this.state.output[0].title}
                                    </div>
                                </div>
                                <div class="prices">
                                    <table>
                                        <tr class="price-line">
                                            <td class="store"></td>
                                            <td class="price"></td>
                                        </tr>
                                    </table>
                                </div>
                            </div>
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