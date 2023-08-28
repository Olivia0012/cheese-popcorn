import React from 'react';
import { Input, Row, Col, Select, Button } from 'antd';
import { SearchOutlined } from '@ant-design/icons';

class MovieSearch extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			title: '',
			year: '',
			plot: 'full',
			type: []
		};
	}

	handlePlotChange = (value) => {
		this.setState({
			plot: value
		});
	};

	handleTitleChange = (event) => {
		this.setState({
			title: event.target.value
		});
	};

	handleYearChange = (event) => {
		this.setState({
			year: event.target.value
		});
	};

	handleTypeChange = (value) => {
		this.setState({
			type: value
		});
	};

	onClickSearch = () => {
		const { getMovies } = this.props;

		getMovies(this.state);
	};

	render() {
		return (
			<Row
				gutter={{
					xs: 8,
					sm: 16,
					md: 24,
					lg: 32
                }}
                align="bottom"
                style={{marginBottom: '20px'}}
			>
				<Col className="gutter-row" span={6}>
					<h4>Title : </h4>
					<Input placeholder="Title" className="title" onChange={this.handleTitleChange} value={this.state.title} />
				</Col>
				<Col className="gutter-row" span={3}>
					<h4>Year : </h4>
					<Input placeholder="Year" className="year" onChange={this.handleYearChange} value={this.state.year} />
				</Col>
				<Col className="gutter-row" span={6}>
					<h4>Plot : </h4>
					<Select
					    id="plot"
						style={{ width: '100%' }}
						defaultValue={this.state.plot}
						onChange={this.handlePlotChange}
						options={[ { value: 'full', label: 'Full' }, { value: 'short', label: 'Short' } ]}
					/>
				</Col>
				<Col className="gutter-row" span={6}>
					<h4>type : </h4>
					<Select
					    id="type"
						style={{ width: '100%' }}
						onChange={this.handlePlotChange}
						options={[
							{ label: 'movie', value: 'movie' },
							{ label: 'series', value: 'series' },
							{ label: 'episode', value: 'episode' }
						]}
					/>
				</Col>
				<Col className="gutter-row" span={3}>
					<Button type="primary" className="search" icon={<SearchOutlined />} onClick={this.onClickSearch}>
						Search
					</Button>
				</Col>
			</Row>
		);
	}
}

export default MovieSearch;
