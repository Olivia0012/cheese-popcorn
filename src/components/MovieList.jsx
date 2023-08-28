import React, { useState } from 'react';
import { Table, Image } from 'antd';
import MovieDetails from './MovieDetails';

const MovieList = ({ movies, error, loading }) => {
	const [ open, setOpen ] = useState(false);
	const [ movie, setMovie ] = useState({});
	const [ isLoading, setLoading ] = useState(loading);

	const columns = [
		{
			title: 'Title',
			dataIndex: 'Title',
			key: 'Title',
			render: (_, record) => <a onClick={() => onClick(record.imdbID)}>{record.Title}</a>
		},
		{
			title: 'Poster',
			dataIndex: 'Poster',
			key: 'Poster',
			render: (text) => (
				<Image width={200} src={text} placeholder={<Image preview={false} src={text} width={200} />} />
			)
		},
		{
			title: 'Year',
			dataIndex: 'Year',
			key: 'Year'
		}
	];

	const errColum = [
		{
			title: 'Error',
			dataIndex: 'Error',
			key: 'Error'
		}
	];

	const errMsg = [
		{
			key: 0,
			Error: error
		}
	];

	const onClick = async (imdbID) => {
		const url = process.env.REACT_APP_URL;
		const searchMoviesUrl = url + '&i=' + imdbID + '&plot=' + 'Full';

		setOpen(true);
		setLoading(true);
		await fetch(searchMoviesUrl)
			.then((res) => {
				return res.json();
			})
			.then((data) => {
				setMovie(data);
				setLoading(false);
			})
			.catch((err) => {
				console.log(err);
				setLoading(false);
			});
	};

	return (
		<div>
			{!error ? (
				<Table columns={columns} dataSource={movies} loading={loading} />
			) : (
				<Table columns={errColum} dataSource={errMsg} loading={loading} />
			)}
			<MovieDetails movie={movie} open={open} setOpen={setOpen} isLoading={isLoading} />
		</div>
	);
};

export default MovieList;
