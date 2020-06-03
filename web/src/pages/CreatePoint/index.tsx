import React, { useEffect, useState, useCallback, ChangeEvent } from 'react';
import { Link } from 'react-router-dom';
import { FiArrowLeft } from 'react-icons/fi';
import { Map, TileLayer, Marker } from 'react-leaflet';

import { LeafletMouseEvent } from 'leaflet';

import axios from 'axios';
import api from '../../services/api';

import { Container } from './styles';

import logo from '../../assets/logo.svg';

interface Item {
  id: string;
  title: string;
  image_url: string;
}

interface ResponseUF {
  sigla: string;
}

interface ResponseCity {
  nome: string;
}

const SignUp: React.FC = () => {
  const [itens, setItens] = useState<Item[]>([]);

  const [ufs, setUfs] = useState<string[]>([]);
  const [cities, setCities] = useState<string[]>([]);

  const [selectedUF, setSelectedUF] = useState('0');
  const [selectedCity, setSelectedCity] = useState('0');

  const [selectedPosition, setSelectedPosition] = useState<[number, number]>([0, 0]);

  useEffect(() => {
    api.get('itens').then(response => setItens(response.data));
  }, []);

  useEffect(() => {
    axios.get<ResponseUF[]>('https://servicodados.ibge.gov.br/api/v1/localidades/estados').then(response =>{
      const initials = response.data.map((uf) => uf.sigla);
    
      setUfs(initials);
    });
  }, []);

  useEffect(() => {
    axios.get<ResponseCity[]>(`https://servicodados.ibge.gov.br/api/v1/localidades/estados/${selectedUF}/municipios`).then(response =>{
      const cityNames = response.data.map((city) => city.nome);
    
      setCities(cityNames);
    });
  }, [selectedUF]);

  const handleSelectedUF = useCallback((e : ChangeEvent<HTMLSelectElement>) => {
    const UF = e.target.value;
    
    setSelectedUF(UF);
  }, []);

  const handleSelectedCity = useCallback((e : ChangeEvent<HTMLSelectElement>) => {
    const city = e.target.value;
    
    setSelectedCity(city);
  }, []);

  const handleMapClick = useCallback((e : LeafletMouseEvent) => {
    setSelectedPosition([
      e.latlng.lat,
      e.latlng.lng,
    ]);
  }, []);

  return (
    <Container>
      <header>
        <img src={logo} alt="Ecoleta"/>
      
        <Link to="/">
          <FiArrowLeft />
          Voltar para home
        </Link>
      </header>

      <form action="">
        <h1>Cadastro do <br /> ponto de coleta</h1>
      
        <fieldset>
          <legend>
            <h2>Dados</h2>
          </legend>

          <div className="field">
            <label htmlFor="name">Nome da entidade</label>
            <input type="text" name="name" id="name"/>
          </div>

          <div className="field-group">
            <div className="field">
              <label htmlFor="email">E-mail</label>
              <input type="email" name="email" id="email"/>
            </div>

            <div className="field">
              <label htmlFor="whatsapp">Whatsapp</label>
              <input type="text" name="whatsapp" id="whatsapp"/>
            </div>
          </div>
        </fieldset>

        <fieldset>
          <legend>
            <h2>Endereço</h2>
            <span>Selecione o endereço no mapa</span>
          </legend>

          <Map center={[-1.4515086,-48.4487568]} zoom={15} onClick={handleMapClick} >
            <TileLayer
              attribution='&amp;copy <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
              url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            />

            <Marker position={selectedPosition} />
          </Map>

          <div className="field-group">
            <div className="field">
              <label htmlFor="uf">Estado (UF)</label>
                <select
                  name="uf"
                  id="uf"
                  value={selectedUF}
                  onChange={handleSelectedUF}
                >
                <option value="0" >Selecione uma UF</option>
                {ufs.map(uf => (
                  <option value={uf} key={uf} >{uf}</option>
                ))}
              </select>
            </div>

            <div className="field">
              <label htmlFor="city">Cidade</label>
                <select
                  name="city"
                  id="city"
                  value={selectedCity}
                  onChange={handleSelectedCity}
                >
                <option value="0" >Selecione uma cidade</option>
                {cities.map(city => (
                  <option value={city} key={city} >{city}</option>
                ))}
              </select>
            </div>
          </div>
        </fieldset>

        <fieldset>
          <legend>
            <h2>Itens de coleta</h2>
            <span>Selecione um ou mais itens abaixo</span>
          </legend>

          <ul className="items-grid">
            {itens.map((item: Item) => (
              <li key={item.id} >
                <img src={item.image_url} alt={item.title} />
                <span>{item.title}</span>
              </li>
            ))}
          </ul>
        </fieldset>

        <button type="submit">
          Cadastrar ponto de coleta
        </button>
      </form>
    </Container>
  );
}

export default SignUp;