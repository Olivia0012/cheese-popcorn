import { IMovie, IWatched } from '../model/IMovie';

export enum ActionType {
  SEARCH_MOVIES,
  ADD_WATCHED,
  DELETE_WATCHED,
  MOVIES_RECEIVED,
  MOVIES_NUMBER,
  MOVIE_SELECTED,
  MOVIE_RECEIVED,
  ERROR,
  FINISHED,
  LOADING,
}

export enum StatusType {
  LOADING,
  READY,
  FINISHED,
  ERROR,
  INIT,
}

export interface IState {
  isLoading: boolean;
  movies?: IMovie[];
  movie?: IMovie;
  watched?: IWatched[];
  selectedId?: string;
  error?: string;
  resultNum?: number;
}

export interface IAction {
  type: ActionType;
  payload?: IMovie[] | IMovie | IWatched[] | number | string;
}

export function reducer(state: IState, action: IAction): IState {
  switch (action.type) {
    case ActionType.LOADING:
      return {
        ...state,
        isLoading: true,
        error: undefined,
        movies: [],
        selectedId: undefined,
        movie: undefined,
      };
    case ActionType.MOVIES_RECEIVED:
      return {
        ...state,
        movies: action.payload as IMovie[],
      };
    case ActionType.MOVIES_NUMBER:
      return {
        ...state,
        resultNum: action.payload as number,
      };
    case ActionType.MOVIE_SELECTED:
      return {
        ...state,
        selectedId: action.payload as string,
      };
    case ActionType.MOVIE_RECEIVED:
      return {
        ...state,
        movie: action.payload as IMovie,
      };
    case ActionType.ADD_WATCHED:
      return {
        ...state,
        watched: action.payload as IWatched[],
      };
    case ActionType.DELETE_WATCHED:
      return {
        ...state,
        watched: action.payload as IWatched[],
      };
    case ActionType.FINISHED:
      return {
        ...state,
        isLoading: false,
      };
    case ActionType.ERROR:
      return {
        ...state,
        error: action.payload as string,
      };
    default:
      throw new Error('Action is unknown!');
  }
}
