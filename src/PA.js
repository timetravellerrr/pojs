import React, { Component } from 'react';
import Utils from './utilities/Utils';
// import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
// import { faEye } from '@fortawesome/free-solid-svg-icons';

// import data from "./data";

class PA extends Component {

	state = {
		obj_arr: [],
		typed: '',
		utils: new Utils() 
	}

	render() {
		const { obj_arr } = this.state;
		return (
			<React.Fragment>
				<div className="container">
					{this.render_filter()}
					{this.render_count(obj_arr)}
					{this.render_dex(obj_arr)}
				</div>
			</React.Fragment>
		)
	}

	onPokeChange = (e) => {
		this.setState({ typed: e.target.value });

		const filtered_obj = this.state.obj_arr.results.filter(name =>
			name === document.getElementById('filterPoke').value
		);
		console.log(filtered_obj);
	}

	render_filter = () => {
		return (
			<div className="row justify-content-md-center">
				<div className="col-md-12">
					<form>
						<div className="form-group">
							<label>Search</label>
							<input type="text" className="form-control" id="filterPoke" placeholder="name" onChange={this.onPokeChange.bind(this)} />
							{this.state.typed}
						</div>
					</form>
				</div>
			</div>
		)
	}

	render_count = (data) => {
		let counter = 0;
		if (data.results) {
			counter = data.count;
			return (
				<div className="row justify-content-md-center">
					<div className="col-md-12"><p className="text-center">Total: {counter}</p></div>
				</div>
			)
		}
	}

	render_dex = (data) => {
		//console.log("Results", this.state.obj_arr.results)
		if (data.results && data.results.length) {
			const trail = data.results.map(t => {
				const id = t.url.substring(34, t.url.length - 1);
				return (
					<div className="card" key={id} style={{ width: 10 + 'rem', margin: '5px' }}>
						<div className="card-header">
							<div className="row">
								<div className="col">
									#{id}
								</div>
							</div>
						</div>
						<div className="text-center">
							<a href={`/p/${id}`}><img src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${id}.png`} className="card-img-top" alt="..." style={{ width: 5 + 'rem', margin: '5px' }} /></a>
						</div>
						<div className="card-body text-center" style={{ paddingTop: '0px' }}>
							<a className="" href={`/p/${id}`}>{this.state.utils.capitalize(t.name)}</a>
							{/* <a className="btn btn-primary btn-block" href={`/p/${id}`}><FontAwesomeIcon icon={faEye} /></a>               */}
						</div>
					</div>
				)
			})
			return (
				<div className="row justify-content-md-center">
					{trail}
				</div>
			)
		}
		else {
			return this.render_loading();
		}
	}

	render_loading() {
		return (<div className="row justify-content-md-center">Loading...</div>);
	}

	componentDidMount() {
		const limit = 1000;
		fetch(`https://pokeapi.co/api/v2/pokemon/?limit=${limit}`)
			.then(response => response.json())
			.then((json_data) => {
				// jsonData is parsed json object received from url
				this.setState({ obj_arr: json_data })
				console.log(json_data)
			})
			.catch((error) => {
				// handle your errors here
				console.error(error)
			})
	}
}

export default PA;

