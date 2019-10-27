import React, { Component } from "react";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { logoutUser } from "../../actions/authActions";
import { get } from "../../get-data.js";

class OfferResults extends Component {
    constructor(props){
        super(props)
        const url_deals = new URL("http://www.cheapshark.com/api/1.0/deals");
        let params = this.props.location.state;

        get(url_deals, params)
            .then(out =>{
                console.log(out)
            })
            .catch(err => {
                console.log(err)
            })
    }
    
    render() {  
        return (
            <div style={{ height: "85vh" }} className="container valign-wrapper">
                <div className="row">
                    <Link to="/dashboard" className="btn-flat waves-effect">
                        <i className="material-icons left">keyboard_backspace</i> Voltar à página principal
                    </Link>
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