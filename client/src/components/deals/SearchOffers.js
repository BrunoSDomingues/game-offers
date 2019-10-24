import React, { Component } from "react";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { logoutUser } from "../../actions/authActions";

function checkRequired(name){
    const errors = [];

    if (name.length === 0) {
        errors.push("Nome obrigatório!");
    }

    return errors;
}

class SearchOffers extends Component {
    constructor(props){
        super(props);
        this.state = {
            errors : []
        };
    }

    handleSubmit = h => {
        h.preventDefault();

        let name = document.getElementById("title").value;
        let max = document.getElementById("maxprice").value;
        let qty = document.getElementById("qty").value;
        let errors = checkRequired(name);

        if (errors.length > 0) {
            this.setState({ errors });
            return;
        } else {
            let params;
            if (max.length == 0 && qty.length == 0){
                params = {title: name};
            } else if (max.length == 0){
                params = {title : name, pageSize : qty};
            } else if (qty.length == 0){
                params = {title : name, upperPrice : max};
            } else {
                params = {title : name, pageSize : qty, upperPrice : max}
            }
            console.log(params);
            this.props.history.push("/offer-results")
        }
    }      

    render() {
        const {errors} = this.state;

        return (
            <div style={{ height: "85vh" }} className="container valign-wrapper">
                <div className="row">
                    <Link to="/dashboard" className="btn-flat waves-effect">
                        <i className="material-icons left">keyboard_backspace</i> Voltar à página principal
                    </Link>
                    <br></br>
                    <div className="landing-copy col s12 center-align">
                        <h4>Pesquisa de ofertas</h4>
                        <p className="grey-text text-darken-1">
                            Pesquise uma oferta usando a barra de pesquisa abaixo e os filtros providenciados!
                        </p>
                        <form>
                            {errors.map(error => (
                                <p key={error}>Erro: {error}</p>
                            ))}
                            <input id="title" placeholder="Nome do jogo" type="text" />
                            <input id="maxprice" placeholder="Valor máximo" type="number"/>
                            <input id="qty" placeholder="Quantidade de resultados (máx. 60)" type="number"/>
                            <br></br>
                            <h6>Ordenar por</h6>
                            <br></br>
                            <select id="sortBy" className="browser-default">
                                <option value="default" defaultChecked>Escolha uma opção</option>
                                <option value="Title">Nome</option>
                                <option value="Price">Preço</option>
                                <option value="Metacritic">Nota</option>
                            </select>
                        </form>
                        <br></br>
                        <button
                            style={{
                                width: "250px",
                                borderRadius: "3px",
                                letterSpacing: "1.5px",
                                marginTop: "1rem"
                            }}
                            onClick={this.handleSubmit}
                            className="btn btn-large waves-effect waves-light hoverable blue accent-3"
                            >Pesquisar ofertas</button>
                    </div>
                </div>
            </div>
        );
    }
}

SearchOffers.propTypes = {
    auth: PropTypes.object.isRequired
}

const mapStateToProps = state => ({
    auth: state.auth
});

export default connect(
    mapStateToProps,
    { logoutUser }
)(SearchOffers);