import React, { useEffect, useState, useCallback, ChangeEvent, FormEvent } from 'react';
import { Link, useHistory } from 'react-router-dom';
import { FiArrowLeft } from 'react-icons/fi';
import { Map, TileLayer, Marker } from 'react-leaflet';

import { LeafletMouseEvent } from 'leaflet';

import axios from 'axios';
import api from '../../services/api';

import Dropzone from '../../components/Dropzone';

import { Container } from './styles';

import logo from '../../assets/logodarkalternative.png';

interface Item {
  id: number;
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

  const [initialPosition, setInitialPosition] = useState<[number, number]>([0, 0]);

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    whatsapp: '',
  });

  const [selectedUF, setSelectedUF] = useState('0');
  const [selectedCity, setSelectedCity] = useState('0');
  const [selectedItens, setSelectedItens] = useState<number[]>([]);  
  const [selectedPosition, setSelectedPosition] = useState<[number, number]>([0, 0]);
  const [selectedFile, setSelectedFile] = useState<File>();

  const history = useHistory();

  useEffect(() => {
    navigator.geolocation.getCurrentPosition(position => {
      const { latitude, longitude } = position.coords;

      setInitialPosition([latitude, longitude]);
    });
  }, []);

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

  const handleInputChange = useCallback((e : ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    
    setFormData({
      ...formData,
      [name]: value
    })
  }, [formData]);

  const handleSelectItem = useCallback((id: number) => {
    const alreadySelected = selectedItens.findIndex(item => item === id);

    if (alreadySelected >= 0) {
      const filteredItens = selectedItens.filter(item => item !== id);

      setSelectedItens(filteredItens);
    } else {
      setSelectedItens([...selectedItens, id]);
    }
  }, [selectedItens]);

  const handleSubmit = useCallback(async (e : FormEvent) => {
    e.preventDefault();

    const { email, name, whatsapp } = formData;

    const uf = selectedUF;
    const city = selectedCity;
    const [latitude, longitude] = selectedPosition;

    const itens = selectedItens;

    const data = new FormData();

    data.append('name', name);
    data.append('email', email);
    data.append('whatsapp', whatsapp);
    data.append('uf', uf);
    data.append('city', city);
    data.append('latitude', String(latitude));
    data.append('longitude', String(longitude));
    data.append('itens', itens.join(','));

    if (selectedFile) {
      data.append('image', selectedFile);
    }

    await api.post('points', data);

    alert('Ponto de coleta criado!');

    history.push('/');
  }, [formData, history, selectedCity, selectedFile, selectedItens, selectedPosition, selectedUF]);

  return (
    <Container>
      <header>
        <img src={logo} alt="Ecoleta"/>
      
        <Link to="/">
          <FiArrowLeft />
          Voltar para home
        </Link>
      </header>

      <form onSubmit={handleSubmit}>
        <h1>Cadastro do <br /> ponto de coleta</h1>

        <Dropzone onFileUploaded={setSelectedFile} />

        <fieldset>
          <legend>
            <h2>Dados</h2>
          </legend>

          <div className="field">
            <label htmlFor="name">Nome da entidade</label>
            <input
              type="text"
              name="name"
              id="name"
              onChange={handleInputChange}
            />
          </div>

          <div className="field-group">
            <div className="field">
              <label htmlFor="email">E-mail</label>
              <input
                type="email"
                name="email"
                id="email"
                onChange={handleInputChange}
              />
            </div>

            <div className="field">
              <label htmlFor="whatsapp">Whatsapp</label>
              <input
                type="text"
                name="whatsapp"
                id="whatsapp"
                onChange={handleInputChange}
              />
            </div>
          </div>
        </fieldset>

        <fieldset>
          <legend>
            <h2>Endereço</h2>
            <span>Selecione o endereço no mapa</span>
          </legend>

          <Map center={initialPosition} zoom={15} onClick={handleMapClick} >
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
              <li
                key={item.id}
                onClick={() => handleSelectItem(item.id)}
                className={selectedItens.includes(item.id) ? 'selected' : ''}
              >
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