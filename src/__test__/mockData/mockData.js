export const mockData = {
	Search: [
		{
			Title: 'Modern Family',
			Year: '2009–2020',
			imdbID: 'tt1442437',
			Type: 'series',
			Poster:
				'https://m.media-amazon.com/images/M/MV5BNzRhNWIxYTEtYjc2NS00YWFlLWFhOGEtMDZiMWM1M2RkNDkyXkEyXkFqcGdeQXVyNjc0MjkzNjc@._V1_SX300.jpg',
			key: 0
		},
		{
			Title: 'Modern Family: In the Moonlight (Do Me)',
			Year: '2009',
			imdbID: 'tt10369088',
			Type: 'movie',
			Poster:
				'https://m.media-amazon.com/images/M/MV5BZDc0MTQyNDUtNTE5Ny00YTNlLWIzOGItNWRhNWRiNTdhYWUyXkEyXkFqcGdeQXVyMTAyODAxNzM@._V1_SX300.jpg',
			key: 1
		},
		{
			Title: 'Modern Family',
			Year: '2012',
			imdbID: 'tt12038260',
			Type: 'movie',
			Poster:
				'https://m.media-amazon.com/images/M/MV5BYzdiNzhlNmUtZjljNy00MzBkLWFjOGYtNjdiZDMyYTM3NzE3XkEyXkFqcGdeQXVyMDgxMjYzMQ@@._V1_SX300.jpg',
			key: 2
		}
	],
	totalResults: '14',
	Response: 'True'
};

export const mockErrorData = {
	Error: 'Incorrect IMDb ID.',
	Response: 'False'
};

// Single Mock Data
export const movie = {
	Title: 'Test Movie Detail Pannel',
	Actors: 'Karina Lombard, Eugene Brave Rock, Ben Cross',
	Director: 'Darin Scott',
	Genre: 'Short, Action',
	Writer: 'Darin Scott',
	Awards: 'Awards',
	Runtime: '14 min'
};
