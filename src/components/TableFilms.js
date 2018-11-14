import React, { Component, Fragment } from 'react';
import ModalWindow from './ModalWindow';
import { Table, Icon } from 'semantic-ui-react'



export default class TableFilms extends Component {

	state = {
		films: null
	}

	
	componentDidMount = () => {
		const endoint = 'https://api.themoviedb.org/3/discover/movie?api_key=c7c7f2c0b7f8d3a65b1f9cbff86a5fc2&language=en-US&sort_by=popularity.desc&include_adult=false&include_video=false&page=1'
		fetch(endoint)
			.then(res => res.json())
			.then(data => this.setState({films: data.results }))
	}

	searchMovies = event => {
		const { films } = this.state;
		const value = event.target.value.toLowerCase();
		const filterData = films.filter(film => film.title.toLowerCase().includes(value));
		if(value.length === 0){ 
			this.setState({ films: films })
		}else{
			this.setState({ films: filterData })
		}
	}

	

	removeMovie = index => {
		const films = Object.assign([], this.state.films)
		films.splice(index, 1);
		this.setState({ films: films})
	}



	render = () => {
		console.log(this.state.films)
		const { films } = this.state;
		return(
		<Fragment>
			<div className='form'>	
				<input className="search"type="text" onChange={this.searchMovies} placeholder='Search'/> 
			</div>
			<div>
			</div>
			<Table celled>
				<Table.Body>
					<Table.Row className='row'>
						{ films !== null && films.map((item, index) => {
							return(
								<Table.Cell onClick={this.getfilms} key={index}>
									<div className='close'>
										<Icon link name='close' delete='true' onClick={() => {this.removeMovie(index)}} />
									</div>
										<img	src={`https://image.tmdb.org/t/p/w500/${item.poster_path}`} 
													alt={"Picture for " + item.title}/><br/>			
										<span>Title: {item.title} </span><br/>
										<span>Rating: {item.vote_average} </span><br/> 
										<span>Release: {item.release_date} </span><br/>
									<ModalWindow  films={this.state.films} title={item.title} overview={item.overview} ico={item.posetr_path}/>
								</Table.Cell>
							)
						})} 
					</Table.Row>
				</Table.Body>
			</Table>
		</Fragment>
		)
		
	}
}

