import React from 'react';

import bandsService from '../../services/bands.service';
import './band-detail.page.css';

import { useNavigate, useParams } from "react-router-dom";


function withParams(Component) {
  return props => <Component {...props} 
    params={useParams()}
    navigate={useNavigate()}
  />;
}

class BandDetailPage extends React.Component {
    
    constructor(props) {
        super(props)
        this.state = {
            // Atributo para armazenar os dados do band
            band: null
        }
    }

    // Função que é executada assim que o componente carrega
    componentDidMount() {
        const bandId = this.props.params.id;
        this.loadBand(bandId);
    }

    // Função que carrega os dados do band e salva no state
    async loadBand(bandId) {
        try {
            let res = await bandsService.getOne(bandId);
            this.setState({ band: res.data })
        } catch (error) {
            console.log(error);
            alert("Não foi possível carregar a banda.")
        }
    }

    // Função que exclui o band, chamada ao clicar no botão "Excluir"
    async deleteBand(bandId) {
        if (!window.confirm("Deseja realmente excluir esta banda?")) return;

        try {
            await bandsService.delete(bandId)
            alert("Band excluído com sucesso")
            this.props.navigate('/band-list');
        } catch (error) {
            console.log(error);
            alert("Não foi excluir a banda.")
        }

    }


    render() {

        return (
            <div className="container">

                <div className="page-top">
                    <div className="page-top__title">
                        <h2>Banda</h2>
                        <p>Detalhes</p>
                    </div>
                    <div className="page-top__aside">
                        <button className="btn btn-light" onClick={() => this.props.navigate('/band-list') }>
                            Voltar
                        </button>
                    </div>
                </div>

                <div className="row">
                    <div className="col-6">
                        <img className="band-img" src={this.state?.band?.urlimg ?? ""} alt="image" />
                    </div>
                    <div className="col-6">
                        <div className="band-info">
                            <h4>ID</h4>
                            <p>{this.state.band?.id}</p>
                        </div>
                        <div className="band-info">
                            <h4>Nome</h4>
                            <p>{this.state.band?.name}</p>
                        </div>
                        <div className="band-info">
                            <h4>Descrição</h4>
                            <p>{this.state.band?.description}</p>
                        </div>
                        <div className="btn-group" role="group" aria-label="Basic example">
                            <button
                                type="button"
                                className="btn btn-sm btn-outline-danger"
                                onClick={() => this.deleteBand(this.state.band.id)}>
                                Excluir
                            </button>
                            <button
                                type="button"
                                className="btn btn-sm btn-outline-primary"
                                onClick={() => this.props.navigate('/band-edit/' + this.state.band.id) }>
                                Editar
                            </button>
                        </div>
                    </div>

                </div>
            </div>
        )
    }

}

export default withParams(BandDetailPage)