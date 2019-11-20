import React, { Component } from 'react';
import Pokemon from './helper/Pokemon';
import PokeSpecies from './helper/PokeSpecies';
import TypeColors from './helper/TypeColors';
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
		utils: new Utils(),
		type_colors: new TypeColors()
	}

	render() {
		const { pokemon, species } = this.state;
		return (
			<React.Fragment>
				<div className="container">
					<div className="row justify-content-md-center">
						<div className="col-10">
							{this.render_details(pokemon, species)}
						</div>
					</div>
				</div>
			</React.Fragment>
		)
	}

	rend_types = (data) => {
		// check out on json array keys
		const types = data.map(x => {
			return (
				<span
					key={x.type.name}
					className="badge badge-primary badge-pill mr-1"
					style={{
						backgroundColor: `#${this.state.type_colors.TYPE_COLORS[x.type.name]}`,
						color: 'white'
					}}>
					<a href={x.type.url} style={{ color: 'white' }}>{this.state.utils.capitalize(x.type.name)}</a>
				</span>
			)
		});
		return (<span>{types}</span>);
	}

	rend_ab = (data) => {
		const ability = data.map((x) => {
			if (x.is_hidden) {
				return (
					<li className="list-inline-item" key={x.ability.name}>
						{this.state.utils.capitalize(x.ability.name)}
					</li>)
			}
			else {
				return (
					<li className="list-inline-item" key={x.ability.name}>
						{this.state.utils.capitalize(x.ability.name)}
						<span>(H)</span></li>)
			}
		});
		//log(types);
		return (
			<ul className="list-inline">{ability}</ul>
		);
	}

	rend_moves_egg = (data) => {
		const moves = data.map((x) => {
			if (x.version_group_details[0].move_learn_method.name === "egg") {
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
			if (x.version_group_details[0].move_learn_method.name === "level-up" || x.version_group_details[0].move_learn_method.name === "egg") {
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
			if (x.version_group_details[0].move_learn_method.name === "tutor") {
				return (
					<li className="list-inline-item" key={x.move.name}>
						<a href={x.move.url}>{this.state.utils.capitalize(x.move.name)}</a>
					</li>)
			}
			else
				return ""
		});
		if (moves.length > 0)
			return (
				<ul className="list-inline">{moves}</ul>
			);
	}

	rend_moves_machine = (data) => {
		const moves = data.map((x) => {
			if (x.version_group_details[0].move_learn_method.name === "machine") {
				return (
					<li className="list-inline-item" key={x.move.name}>
						<a href={x.move.url}>{this.state.utils.capitalize(x.move.name)}</a>
					</li>)
			}
			else
				return ""
		});
		if (moves.length > 0) {
			return (
				<ul className="list-inline">{moves}</ul>
			);
		}
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
					if (ab === "name" && ind < abl.length - 1)
						result += this.state.utils.capitalize(v) + ", ";
					else if (ab === "name" && ind === abl.length)
						result += this.state.utils.capitalize(v);
					ind++;
					// eslint-disable-next-line
					let x = (`${abs}, ${ability} `);
				}
				// log(`${abs}: ${val} `);
			}
			//log(`${ability}: ${value} `);
		}

		return result;
	}

	get_flavor_text_entry = (data) => {
		if (data) {
			const description = data.map((x) => {
				if (x.language.name === "en") {
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
					return "";
			});
			if (description.length > 0) {
				return (<ButtonToolbar>{description}</ButtonToolbar>)
			}
		}
	}

	get_flavor_text_entry_two = (data) => {
		if (data) {
			let desc = '';
			data.some((x) => {
				if (x.language.name === "en") {
					desc = x.flavor_text;
					return desc;
				}
				else return '';
			});
			return (<span>{desc}</span>)
		}
	}

	red_stats_specific = (data, name) => {
		if (data) {
			let {desc} = '';
			data.some((x) => {
				if (x.stat.name === name) {
					desc= (
							<div className="progress">
								<div className="progress-bar bg-s"
									role="progressbar"
									style={{ width: `${x['base_stat']}%` }}
									aria-valuenow="25"
									aria-valuemin="0"
									aria-valuemax="100"
								><small>{x['base_stat']}</small>
								</div>
							</div>
						)
						return desc;
				}
				else return '';
			});			
			return (<div className="col-12 col-md-9">{desc}</div>);
		}
	}

	rend_stats = (data) => {
		if (data) {
			const stats = data.map((x) => {
				return (
					<div className="row align-item-center">
						<div className="col-12 col-md-3">
							{this.state.utils.capitalize(x.stat.name)}
						</div>
						<div className="col-12 col-md-9">
							<div className="progress">
								<div className="progress-bar"
									role="progressbar"
									style={{ width: `${x['base_stat']}%` }}
									aria-valuenow="25"
									aria-valuemin="0"
									aria-valuemax="100"
								><small>{x['base_stat']}</small>
								</div>
							</div>
						</div>
					</div>
				)
			});
			if (stats.length > 0) {
				return (<div>{ stats }</div>)
			}
		}
	}

	render_details = (pokemon, species) => {
		if (pokemon.name) {
			let { id, name, sprite, types, weight, height, abilities, moves, stats } = pokemon;
			const { flavor_text_entries } = species;
			const fte = this.get_flavor_text_entry_two(flavor_text_entries);
			if(sprite == null) sprite = `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${id}.png`;
			return (
				<div className="card" key={id}>
					<div className="card-header">
						<div className="row">
							<div className="col-md-5">
								{id}
							</div>
							<div className="col-md-7">
								<div className="float-right">
									{this.rend_types(types)}
								</div>
							</div>
						</div>
					</div>
					<div className="card-body">
						<div className="row align-items-center">
							<div className="col-md-3 text-center">
								<img src={sprite} className="card-img-top rounded mx-auto mt-2" alt={id} style={{ width: 8 + 'rem', margin: '5px' }} />
							</div>
							<div className="col-md-9">
								<h4 className="mx-auto">{this.state.utils.capitalize(name)}</h4>
								<div className="row align-item-center">
									<div className="col-12 col-md-3">
										HP
									</div>
									{this.red_stats_specific(stats, 'hp')}
								</div>
								<div className="row align-item-center">
									<div className="col-12 col-md-3">
										Attack
									</div>
									{this.red_stats_specific(stats, 'attack')}
								</div>
								<div className="row align-item-center">
									<div className="col-12 col-md-3">
										Defense
									</div>
									{this.red_stats_specific(stats, 'defense')}
								</div>
								<div className="row align-item-center">
									<div className="col-12 col-md-3">
										Speed
									</div>
									{this.red_stats_specific(stats, 'speed')}
								</div>
								<div className="row align-item-center">
									<div className="col-12 col-md-3">
										Special Attack
									</div>
									{this.red_stats_specific(stats, 'special-attack')}
								</div>
								<div className="row align-item-center">
									<div className="col-12 col-md-3">
										Special Defense
									</div>
									{this.red_stats_specific(stats, 'special-defense')}
								</div>
							</div>
						</div>
						<div className="row mt-1 pt-3">
							<div className="col">
								{fte}
							</div>
						</div>
					</div>
					<table className="table">
						<tbody>
							<tr>
								<th scope="row">Height</th>
								<td>{Math.round((height * 0.328084 + 0.0001) * 100) / 100}</td>
							</tr>
							<tr>
								<th scope="row">Weight</th>
								<td>{Math.round((weight * 0.220462 + 0.0001) * 100) / 100}</td>
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

		var apiRequest1 = fetch(poke).then( response => {
			return response.json()
		});
		var apiRequest2 = fetch(poke_species_url).then( response => {
			if(response.ok === true)
			return response.json();
			else
			return null;
		});

		Promise.all([apiRequest1, apiRequest2]
		).then(([json_d, json_a]) => {
			// jsonData is parsed json object received from url
			let pokemon = new Pokemon(json_d);
			let species = new PokeSpecies(json_a);				
			this.setState({ obj_arr: json_d, pokemon: pokemon, species: species });
			document.title = this.state.utils.capitalize(pokemon.name);
			console.log(json_d);
			console.log(json_a);
		})
		.catch((error) => {
				// handle your errors here
				console.log(error);
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
				error(error)
			})
	}
}

export default PB;

