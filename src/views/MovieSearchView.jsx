import React from 'react';
import { Row, Col } from 'antd';
import MovieList from '../components/MovieList';
import MovieSearch from '../components/MovieSearch';

export default class MovieSearchView extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			movies: null,
			error: null,
			loading: false
		};

		this.handleUpdate = this.handleUpdate.bind(this);
	}

	handleUpdate = async (value) => {
		const url = process.env.REACT_APP_URL;
		const searchMoviesUrl =
			url +
			'&s=' +
			value.title +
			'&t=' +
			value.title +
			'&y=' +
			value.year +
			'&plot=' +
			value.plot +
			'&type=' +
			value.type;

		this.setState({ loading: true });
		await fetch(searchMoviesUrl)
			.then((resp) => {
				return resp.json();
			})
			.then((data) => {
				if (data.Response === 'False') {
					this.setState({
						error: data.Error,
						loading: false
					});
				} else {
					let movies = [];
                    const num = data.Search.length;

					for (let j = 0; j < num; j++) {
						data.Search[j].key = j;
						movies.push(data.Search[j]);
					}
					this.setState({
						movies: movies,
						loading: false
					});
				}
			})
			.catch((err) => {
				console.log(err);
				this.setState({ loading: false });
			});
	};

	render() {
		return (
			<div data-testid="movie-search-view">
				<Row>
					<Col span={20} offset={2}>
						<MovieSearch getMovies={this.handleUpdate.bind(this)} />
						<MovieList movies={this.state.movies} error={this.state.error} loading={this.state.loading} />
					</Col>
				</Row>
			</div>
		);
	}
}
