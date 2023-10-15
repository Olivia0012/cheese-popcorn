import { ActiveType, IMovie, IWatched } from '../model/IMovie';

export enum ActionType {
  SEARCH_MOVIES,
  FETCH_MOVIE,
  RESET_MOVIE,
  ADD_WATCHED,
  DELETE_WATCHED,
  MOVIES_RECEIVED,
  MOVIE_RECEIVED,
  SET_ACTIVE,
  ERROR,
  FINISHED,
  LOADING,
  INIT,
}

export enum StatusType {
  LOADING,
  READY,
  ACTIVE,
  FINISHED,
  ERROR,
  INIT,
}

export interface IState {
  status: StatusType;
  isLoading: boolean;
  movies?: IMovie[];
  movie?: IMovie;
  selectedId?: string;
  watched?: IWatched[];
  query?: string;
  page?: string;
  error?: string;
  active?: ActiveType;
  resultNum?: number;
}

export interface IAction {
  type: ActionType;
  query?: string;
  page?: string;
  selectedId?: string;
  resultNum?: number;
  payload?: {
    movies?: IMovie[];
    movie?: IMovie;
    watched?: IWatched[];
  };
  error?: string;
  active?: ActiveType;
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
    case ActionType.SET_ACTIVE:
      return {
        ...state,
        active: action.active,
      };
    case ActionType.SEARCH_MOVIES:
      return {
        ...state,
        query: action.query,
        page: action.page,
      };
    case ActionType.MOVIES_RECEIVED:
      return {
        ...state,
        movies: action.payload?.movies,
        resultNum: action.resultNum,
        status: StatusType.READY,
      };
    case ActionType.FETCH_MOVIE:
      return {
        ...state,
        selectedId: action.selectedId,
      };
    case ActionType.MOVIE_RECEIVED:
      return {
        ...state,
        movies: action.payload?.movies,
        status: StatusType.READY,
      };
    case ActionType.RESET_MOVIE:
      return {
        ...state,
        selectedId: undefined,
        movie: undefined,
        active: action.active,
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
        error: action.error,
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
    case ActionType.SET_ACTIVE:
      return {
        ...state,
        active: action.active,
      };
    case ActionType.FETCH_MOVIE:
      return {
        ...state,
        selectedId: action.selectedId,
      };
    case ActionType.MOVIE_RECEIVED:
      return {
        ...state,
        movie: action.payload?.movie,
        status: StatusType.READY,
      };
    case ActionType.RESET_MOVIE:
      return {
        ...state,
        selectedId: undefined,
        movie: undefined,
        active: action.active,
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
        error: action.error,
      };
    default:
      throw new Error('Action is unknown!');
  }
}
