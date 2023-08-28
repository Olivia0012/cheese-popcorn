import React from 'react';
import { Drawer, Row, Col, Spin } from 'antd';

const MovieDetails = ({ movie, open, setOpen, isLoading }) => {
	const onClose = () => {
		setOpen(false);
	};

	if (movie === undefined || !movie) {
		return <h4>Not found!</h4>;
	}

	return (
		<Drawer title="Movie Details" placement="right" onClose={onClose} open={open}>
			{isLoading ? (
				<Spin tip="Loading" size="small">
					<div className="content" />
				</Spin>
			) : (
				<div>
					<Row align="middle">
						<Col span={4}>
							<h4>Title:</h4>
						</Col>
						<Col span={18} offset={2}>
							<p>{movie.Title}</p>
						</Col>
					</Row>
					<Row align="middle">
						<Col span={4}>
							<h4>Actors:</h4>
						</Col>
						<Col span={18} offset={2}>
							<p>{movie.Actors}</p>
						</Col>
					</Row>
					<Row align="middle">
						<Col span={4}>
							<h4>Director:</h4>
						</Col>
						<Col span={18} offset={2}>
							<p>{movie.Director}</p>
						</Col>
					</Row>
					<Row align="middle">
						<Col span={4}>
							<h4>Genre:</h4>
						</Col>
						<Col span={18} offset={2}>
							<p>{movie.Genre}</p>
						</Col>
					</Row>
					<Row align="middle">
						<Col span={4}>
							<h4>Writer:</h4>
						</Col>
						<Col span={18} offset={2}>
							<p>{movie.Writer}</p>
						</Col>
					</Row>
					<Row align="middle">
						<Col span={4}>
							<h4>Awards:</h4>
						</Col>
						<Col span={18} offset={2}>
							<p>{movie.Awards}</p>
						</Col>
					</Row>
					<Row align="middle">
						<Col span={4}>
							<h4>Runtime:</h4>
						</Col>
						<Col span={18} offset={2}>
							<p>{movie.Runtime}</p>
						</Col>
					</Row>
				</div>
			)}
		</Drawer>
	);
};

export default MovieDetails;
