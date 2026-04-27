import React from 'react';
import bandsService from '../../services/bands.service';
import './band-edit.page.css';

import { useNavigate, useParams } from "react-router-dom";


function withParams(Component) {
  return props => <Component {...props} 
    params={useParams()}
    navigate={useNavigate()}
  />;
}

class BandEditPage extends React.Component {

    constructor(props){
        super(props)

        this.state = {
            id: null,
            name : '',
            description : '',
            urlimg: ''
        }

    }

    componentDidMount(){
        const bandId = this.props.params.id ?? null;
        if(bandId) {
            this.loadBand(bandId);
        }
    }

    async loadBand(bandId){
        try {
            let res = await bandsService.getOne(bandId);
            let band = res.data;
            this.setState(band);
        } catch (error) {
            console.log(error);
            alert("Não foi possível carregar band.");
        }
    }

    async sendBand(){
        
        let data = {
            name : this.state.name,
            description : this.state.description,
            urlimg: this.state.urlimg ?? ""
        }

        if(!data.name || data.name === ''){
            alert("Nome é obrigatório!")
            return;
        }
        if(!data.description || data.description === ''){
            alert("Descrição é obrigatória!")
            return;
        }

        try {
            if(this.state.id){
                await bandsService.edit(data, this.state.id);
                alert("Banda editada com sucesso!");
            }
            else{
                await bandsService.create(data);
                alert("Banda criada com sucesso!")
            }
            this.props.navigate('/band-list');
        } 
        catch (error) {
            console.log(error);
            alert("Erro ao criar a banda.");
        }
    }

    render() {

        let title = this.state.id ? 'Editar registro' : 'Novo registro';
        let desc = this.state.id ? 'Editar informações da banda' : 'Criar uma nova banda';

        return (
            <div className="container">
                <div className="page-top">
                    <div className="page-top__title">
                        <h2>{title}</h2>
                        <p>{desc}</p>
                    </div>
                    <div className="page-top__aside">
                        <button className="btn btn-light" onClick={() => this.props.navigate('/band-list') }>
                            Cancelar
                        </button>
                        <button className="btn btn-primary" onClick={() => this.sendBand()}>
                            Salvar
                        </button>
                    </div>
                </div>
                <form onSubmit={e => e.preventDefault()}>
                    <div className="form-group">
                        <label htmlFor="title">Nome</label>
                        <input
                            type="text"
                            className="form-control"
                            id="title"
                            value={this.state.name}
                            onChange={e => this.setState({ name: e.target.value })} />
                    </div>

                    <div className="form-group">
                        <label htmlFor="content">Descrição</label>
                        <textarea
                            type="text"
                            className="form-control"
                            id="content"
                            value={this.state.description}
                            rows={4}
                            style={{resize: 'none'}}
                            onChange={e => this.setState({ description: e.target.value })} />
                    </div>

                    <div className="form-group">
                        <label htmlFor="batata">Url da imagem</label>
                        <input
                            type="text"
                            className="form-control"
                            id="batata"
                            value={this.state.urlimg}
                            onChange={e => this.setState({ urlimg: e.target.value })} />
                    </div>

                </form>
            </div>
        )
    }

}

export default withParams(BandEditPage);