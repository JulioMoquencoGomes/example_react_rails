import React from 'react';
import { Link } from 'react-router-dom';
import bandsService from '../../services/bands.service';
import './band-list.page.css';

import { useNavigate, useParams } from "react-router-dom";

function withParams(Component) {
  return props => <Component {...props} 
    params={useParams()}
    navigate={useNavigate()}
  />;
}

class BandListPage extends React.Component {

    constructor(props) {
        super(props)
        this.state = {
            // Atributo para armazenar o array de posts vindos da API.
            bands: [],
        }
    }

    // Função que é executada assim que o componente carrega.
    componentDidMount() {
        this.loadPosts()
    }

    // Função responsável por chamar o serviço e carregar os posts.
    async loadPosts() {
        try {
            let res = await bandsService.list();
            console.log(res.data);
            this.setState({ bands: res.data })
        } catch (error) {
            console.log(error);
            alert("Não foi possível listar os posts.")
        }
    }

    render() {

        return (
            <div className="container">

                <div className="page-top">
                    <div className="page-top__title">
                        <h2>Bandas</h2>
                        <p>Lista</p>
                    </div>
                    <div className="page-top__aside">
                        <button className="btn btn-primary" onClick={() => this.props.navigate('/band-add')}>
                            Adicionar
                        </button>
                    </div>
                </div>

                {/* Percorrendo o array de posts do state e renderizando cada um
                dentro de um link que leva para a página de detalhes do post específico */}
                {this.state.bands.map(band => (
                    <Link to={"/band-detail/" + band.id} key={band.id}>
                        <div className="band-card">
                            <div className="band-card__img">
                                <img src={band.urlimg ?? ""}/>
                            </div>
                            <div className="band-card__text">
                                <h4>{band.name}</h4>
                                <p>{band.description}</p>
                            </div>
                        </div>
                    </Link>
                ))}

            </div>
        )
    }

}

export default withParams(BandListPage);