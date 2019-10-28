import React, { Component  } from 'react';
import Pokemon from './helper/Pokemon';
import PokeSpecies from './helper/PokeSpecies';
import Utils from './utilities/Utils';
import ButtonToolbar from 'react-bootstrap/ButtonToolbar'
import OverlayTrigger from 'react-bootstrap/OverlayTrigger';
import Popover from 'react-bootstrap/Popover';
import Button from 'react-bootstrap/Button';

// import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
// import { faEye } from '@fortawesome/free-solid-svg-icons';

// import data from "./data";

class PB extends Component {

  state = {
    obj_arr: [],
    pokemon: {},
    species: {},
    utils: new Utils()
  }

  render() {
    const {pokemon, species} = this.state;
    return (
      <React.Fragment>
        <div className="container">
          <div className="row justify-content-md-center">
            <div className="col-2"></div>
            <div className="col-8">
              {this.render_details(pokemon, species)}
            </div>
            <div className="col-2"></div>
          </div>
        </div>
      </React.Fragment>
    )
  }

  rend_types = (data) => {
    // check out on json array keys
    const types = data.map(x => {
      return (
        <li className="list-inline-item" key={x.type.name} >
          <a href={x.type.url}>{this.state.utils.capitalize(x.type.name)}</a>
        </li>      
      )
    });   
    return (
      <ul className="list-inline">{types}</ul>      
    );   
  }

  rend_ab = (data) => {
    const ability = data.map((x) => {
      if(x.is_hidden) {
      return (
        <li className="list-inline-item" key={x.ability.name}>
          {this.state.utils.capitalize(x.ability.name)}
        </li>)
      }
      else
      {
        return (
          <li className="list-inline-item" key={x.ability.name}>
            {this.state.utils.capitalize(x.ability.name)}
          <span>(H)</span></li>)
      }
    });   
    //console.log(types);
    return (
      <ul className="list-inline">{ability}</ul>   
    );  
  }

  rend_moves_egg = (data) => {
    const moves = data.map((x) => {
      if(x.version_group_details[0].move_learn_method.name === "egg"){
      return (
      <li className="list-inline-item" key={x.move.name}>
        <a href={x.move.url}>{this.state.utils.capitalize(x.move.name)})</a>
      </li>)
      }
      else
      return ""
    });   
    return (
      <ul className="list-inline">{moves}</ul>   
    );  
  }

  rend_moves_learn = (data) => {
    // sort by level
    data.sort((a, b) => a.version_group_details[0].level_learned_at - b.version_group_details[0].level_learned_at);
    const moves = data.map((x) => {
      if(x.version_group_details[0].move_learn_method.name === "level-up" || x.version_group_details[0].move_learn_method.name === "egg"){
      return (
      <li className="list-inline-item" key={x.move.name}>
        <a href={x.move.url}>{this.state.utils.capitalize(x.move.name)} <span>({x.version_group_details[0].level_learned_at})</span></a>
      </li>)
      }
      else
      return ""
    });   
    return (
      <ul className="list-inline">{moves}</ul>   
    );  
  }

  rend_moves_tutor = (data) => {
    const moves = data.map((x) => {
      if(x.version_group_details[0].move_learn_method.name === "tutor"){
      return (
      <li className="list-inline-item" key={x.move.name}>
        <a href={x.move.url}>{this.state.utils.capitalize(x.move.name)}</a>
      </li>)
      }
      else
      return ""
    });   
    if(moves.length > 0)
    return (     
      <ul className="list-inline">{moves}</ul>  
    );  
  }

  rend_moves_machine= (data) => {
    const moves = data.map((x) => {
      if(x.version_group_details[0].move_learn_method.name === "machine"){
      return (
      <li className="list-inline-item" key={x.move.name}>
        <a href={x.move.url}>{this.state.utils.capitalize(x.move.name)}</a>
      </li>)
      }
      else
      return ""
    });  
    if(moves.length > 0){
    return (
      <ul className="list-inline">{moves}</ul>  
    );  }
  }

  rend_abilities = (data) => {
    const obj_ab = data.abilities;
    // let keys = Object.keys(obj_ab);
    let keys = Object.entries(obj_ab);
    let result = ""; var ind = 0;

    for (let [ability, value] of keys) {
      //result += value;
      let abilities = Object.entries(value);
      for (let [abs, val] of abilities) {
        //result += value;
        let abl = Object.entries(val);
        for (let [ab, v] of abl) {
          //result += value;
          if(ab === "name" && ind < abl.length - 1)
            result += this.state.utils.capitalize(v) + ", ";
          else if(ab === "name" && ind === abl.length)
            result += this.state.utils.capitalize(v);
          ind++;
          // eslint-disable-next-line
          let x = (`${abs}, ${ability} `);
        }
        // console.log(`${abs}: ${val} `);
      }
      //console.log(`${ability}: ${value} `);
    }

    return result;
  }

  get_flavor_text_entry = (data) => {
    if(data){
    const moves = data.map((x) => {
      if(x.language.name === "en"){
      return (
          <OverlayTrigger
            key={x.version.name}
            placement={'top'}
            overlay={
              <Popover id={`popover-positioned-top`}>
                <Popover.Title as="h3">{x.flavor_text}</Popover.Title>
                <Popover.Content>
                  <strong>{this.state.utils.capitalize(x.version.name)}</strong>
                </Popover.Content>
              </Popover>
            }
          >
            <Button variant="secondary" style={{ margin: '3px' }}>{this.state.utils.capitalize(x.version.name)}</Button>
          </OverlayTrigger>)
      }
      else
      return ""
    });  
    if(moves.length > 0){
    return (<ButtonToolbar>{moves}</ButtonToolbar>) }
    }
  }

  render_details = (pokemon, species) => {
    if (pokemon.name) {      
      const {id, name, sprite, types, weight, height, abilities, moves} = pokemon; 
      const {flavor_text_entries} = species;
      console.log(flavor_text_entries);
      const fte = this.get_flavor_text_entry(flavor_text_entries);
      return (
        <div className="card" key={id}>
          <div className="text-center">
            <img src={sprite} className="card-img-top" alt={id} style={{ width: 8  + 'rem', margin: '5px' }} />
          </div>
          <div className="card-body">
            <h5 className="card-title">{this.state.utils.capitalize(name)}</h5>
            <div className="card-text">{id} {fte}</div>
          </div>
          <table className="table">
            <tbody>
              <tr>
                <th scope="row">Height</th>
                <td>{height}</td>
              </tr>
              <tr>
                <th scope="row">Weight</th>
                <td>{weight}</td>
              </tr>
              <tr>
                <th scope="row">Type(s)</th>
                <td>
                  {this.rend_types(types)}
                </td>
              </tr>
              <tr>
                <th scope="row">Abilities</th>
                <td>
                  {this.rend_ab(abilities)}
                </td>
              </tr>
              <tr>
                <th scope="row">Moves (Learned)</th>
                <td>
                  {this.rend_moves_learn(moves)}
                </td>
              </tr>
              <tr>
                <th scope="row">Moves (Tutor)</th>
                <td>
                  {this.rend_moves_tutor(moves)} 
                </td>
              </tr>
              <tr>
                <th scope="row">Moves (Machine)</th>
                <td> 
                  {this.rend_moves_machine(moves)}
                </td>
              </tr>                        
            </tbody>
          </table>
          <ul className="list-group list-group-flush">
            <li className="list-group-item">Dapibus ac facilisis in</li>
            <li className="list-group-item">Morbi leo risus</li>
            <li className="list-group-item">Porta ac consectetur ac</li>
            <li className="list-group-item">Vestibulum at eros</li>
          </ul>
          <div className="card-body">
            <a href="/" className="card-link btn btn-primary">Back</a>
          </div>
        </div>
      )
    }
  }

  componentDidMount() {
    const url = window.location.href;
    const id = url.substring(url.lastIndexOf("/") + 1, url.length);

    this.fetch_detail(id);
  }

  fetch_detail = (id) => {
    const poke = `https://pokeapi.co/api/v2/pokemon/${id}`;
    const poke_species_url = `https://pokeapi.co/api/v2/pokemon-species/${id}`;

    var apiRequest1 = fetch(poke).then(function(response){ 
          return response.json()
    });
    var apiRequest2 = fetch(poke_species_url).then(function(response){
          return response.json()
    });

    Promise.all([apiRequest1, apiRequest2]
    ).then(([json_d, json_a]) => {
        // jsonData is parsed json object received from url
        const pokemon = new Pokemon(json_d);
        const species = new PokeSpecies(json_a);  
        this.setState({ obj_arr: json_d, pokemon: pokemon, species: species });   
        document.title = this.state.utils.capitalize(pokemon.name);
        console.log(json_d);
        console.log(json_a);
      })
      .catch((error) => {
        // handle your errors here
        console.error(error)
      })
  }

  fetch_species = (id) => {
    const poke_species_url = `https://pokeapi.co/api/v2/pokemon-species/${id}`;
    
    fetch(poke_species_url)
      .then(response => response.json())
      .then((json_data) => {
        // jsonData is parsed json object received from url
        const species = new PokeSpecies(json_data);  
        console.log(species)
        this.setState({ species: species }); 
      })
      .catch((error) => {
        // handle your errors here
        console.error(error)
      })
  }
}

export default PB;

