import React, { Component } from "react";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { getJSON } from "../../get-data";

class SearchResults extends Component{
    render(){
        const url_deals = new URL("http://www.cheapshark.com/api/1.0/deals");
        const {output} = getJSON(url_deals, this.props.params);
    }
}