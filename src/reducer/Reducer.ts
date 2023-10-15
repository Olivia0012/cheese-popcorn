import { IMovie, IWatched } from '../model/IMovie';

export enum ActionType {
  SEARCH_MOVIES,
  ADD_WATCHED,
  DELETE_WATCHED,
  MOVIES_RECEIVED,
  MOVIE_RECEIVED,
  ERROR,
  FINISHED,
  LOADING,
  INIT,
}

export enum StatusType {
  LOADING,
  READY,
  FINISHED,
  ERROR,
  INIT,
}

export interface IState {
  status: StatusType;
  isLoading: boolean;
  movies?: IMovie[];
  movie?: IMovie;
  watched?: IWatched[];
  error?: string;
  resultNum?: number;
}

export interface IAction {
  type: ActionType;
  payload?: {
    movies?: IMovie[];
    movie?: IMovie;
    watched?: IWatched[];
    resultNum?: number;
    error?: string;
  };
}

export function reducer(state: IState, action: IAction): IState {
  switch (action.type) {
    case ActionType.LOADING:
      return {
        ...state,
        isLoading: true,
        error: '',
        movies: [],
      };
    case ActionType.MOVIES_RECEIVED:
      return {
        ...state,
        movies: action.payload?.movies,
        resultNum: action.payload?.resultNum,
        status: StatusType.READY,
      };
    case ActionType.MOVIE_RECEIVED:
      return {
        ...state,
        movies: action.payload?.movies,
        status: StatusType.READY,
      };
    case ActionType.ADD_WATCHED:
      return {
        ...state,
        watched: action.payload?.watched,
      };
    case ActionType.DELETE_WATCHED:
      return {
        ...state,
        watched: action.payload?.watched,
      };
    case ActionType.FINISHED:
      return {
        ...state,
        isLoading: false,
      };
    case ActionType.ERROR:
      return {
        ...state,
        error: action.payload?.error,
      };
    default:
      throw new Error('Action is unknown!');
  }
}

export function fetchMovieReducer(state: IState, action: IAction): IState {
  switch (action.type) {
    case ActionType.LOADING:
      return {
        ...state,
        isLoading: true,
        error: '',
        movies: [],
      };
    case ActionType.MOVIE_RECEIVED:
      return {
        ...state,
        movie: action.payload?.movie,
        status: StatusType.READY,
      };
    case ActionType.ADD_WATCHED:
      return {
        ...state,
        watched: action.payload?.watched,
      };
    case ActionType.DELETE_WATCHED:
      return {
        ...state,
        watched: action.payload?.watched,
      };
    case ActionType.FINISHED:
      return {
        ...state,
        isLoading: false,
      };
    case ActionType.ERROR:
      return {
        ...state,
        error: action.payload?.error,
      };
    default:
      throw new Error('Action is unknown!--');
  }
}
