import React, { Component } from 'react';
// import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
// import { faEye } from '@fortawesome/free-solid-svg-icons';

// import data from "./data";

class PB extends Component {

  render() {
    const {obj_arr} = this.state;
    return (
      <React.Fragment>
        <div className="container">
          <div className="row justify-content-md-center">
            <div className="col-2"></div>
            <div className="col-8">
              {this.render_details(obj_arr)}
            </div>
            <div className="col-2"></div>
          </div>
        </div>
      </React.Fragment>
    )
  }

  capitalize(str) {
    return str.charAt(0).toUpperCase() + str.slice(1);
  }

  rend_types = (data) => {
    // check out on json array keys
    const types = data.types.map(x => {
      return (
        <li className="list-inline-item" key={x.type.name} >
          <a href={x.type.url}>{this.capitalize(x.type.name)}</a>
        </li>      
      )
    });   
    return (
      <ul className="list-inline">{types}</ul>      
    );   
  }

  rend_ab = (data) => {
    const ability = data.abilities.map((x) => {
      if(x.is_hidden) {
      return (
        <li className="list-inline-item" key={x.ability.name}>
          {this.capitalize(x.ability.name)}
        </li>)
      }
      else
      {
        return (
          <li className="list-inline-item" key={x.ability.name}>
            {this.capitalize(x.ability.name)}
          <span>(H)</span></li>)
      }
    });   
    //console.log(types);
    return (
      <ul className="list-inline">{ability}</ul>   
    );  
  }

  rend_moves_egg = (data) => {
    const moves = data.moves.map((x) => {
      if(x.version_group_details[0].move_learn_method.name === "egg"){
      return (
      <li className="list-inline-item" key={x.move.name}>
        <a href={x.move.url}>{this.capitalize(x.move.name)})</a>
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
    data = data.moves;
    data.sort((a, b) => a.version_group_details[0].level_learned_at - b.version_group_details[0].level_learned_at);
    const moves = this.state.obj_arr.moves.map((x) => {
      if(x.version_group_details[0].move_learn_method.name === "level-up" || x.version_group_details[0].move_learn_method.name === "egg"){
      return (
      <li className="list-inline-item" key={x.move.name}>
        <a href={x.move.url}>{this.capitalize(x.move.name)} <span>({x.version_group_details[0].level_learned_at})</span></a>
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
    const moves = data.moves.map((x) => {
      if(x.version_group_details[0].move_learn_method.name === "tutor"){
      return (
      <li className="list-inline-item" key={x.move.name}>
        <a href={x.move.url}>{this.capitalize(x.move.name)}</a>
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
    const moves = data.moves.map((x) => {
      if(x.version_group_details[0].move_learn_method.name === "machine"){
      return (
      <li className="list-inline-item" key={x.move.name}>
        <a href={x.move.url}>{this.capitalize(x.move.name)}</a>
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
            result += this.capitalize(v) + ", ";
          else if(ab === "name" && ind === abl.length)
            result += this.capitalize(v);
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

  render_details = (data) => {
    if (data.name) {      
      return (
        <div className="card" key={data.id}>
          <div className="text-center">
            <img src="https://via.placeholder.com/150" className="card-img-top" alt={data.name} style={{ width: 8  + 'rem', margin: '5px' }} />
          </div>
          <div className="card-body">
            <h5 className="card-title">{this.capitalize(data.name)}</h5>
            <p className="card-text">{data.id} Some quick example text to build on the card title and make up the bulk of the card's content.</p>
          </div>
          <table className="table">
            <tbody>
              <tr>
                <th scope="row">Height</th>
                <td>{data.height}</td>
              </tr>
              <tr>
                <th scope="row">Weight</th>
                <td>{data.weight}</td>
              </tr>
              <tr>
                <th scope="row">Type(s)</th>
                <td>
                  {this.rend_types(data)}
                </td>
              </tr>
              <tr>
                <th scope="row">Abilities</th>
                <td>
                  {this.rend_ab(data)}
                </td>
              </tr>
              <tr>
                <th scope="row">Moves (Learned)</th>
                <td>
                  {this.rend_moves_learn(data)}
                </td>
              </tr>
              <tr>
                <th scope="row">Moves (Tutor)</th>
                <td>
                  {this.rend_moves_tutor(data)} 
                </td>
              </tr>
              <tr>
                <th scope="row">Moves (Machine)</th>
                <td> 
                  {this.rend_moves_machine(data)}
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

  state = {
    obj_arr: []
  }

  componentDidMount() {
    const url = window.location.href;
    const id = url.substring(url.lastIndexOf("/") + 1, url.length);
    // console.log(id);
    fetch(`https://pokeapi.co/api/v2/pokemon/${id}`)
      .then(response => response.json())
      .then((json_data) => {
        // jsonData is parsed json object received from url
        this.setState({ obj_arr: json_data })        
        document.title = this.capitalize(this.state.obj_arr.name);
        console.log(json_data)
      })
      .catch((error) => {
        // handle your errors here
        console.error(error)
      })
  }
}

export default PB;

