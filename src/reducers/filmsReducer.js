const states = {
    filmData: {
        data: [],
        total: 0
    },
    userData: {
        access_token: {},
        user_data: {}
    },
    errors: {},
    viewFilm: '',
    activePage: 1,
    totalFilm: 0,
    totalPage: 0,
    countries: [],
    genres: []
}

export default (state = states, action) => {
    switch (action.type) {
        case 'UPDATE_ACTIVE_PAGE':
            return {...state, activePage: action.payload}
        case 'FETCH_FILMS':
            return {
                ...state,
                filmData: action.payload,
                activePage: Number(action.payload.current_page),
                totalFilm: Number(action.payload.total),
                totalPage: Number(action.payload.last_page)
            }
        case 'VIEW_FILM':
            return {...state, viewFilm: action.payload}
        case 'SET_ERRORS':
            return {...state, errors: action.payload}
        case 'SET_USERINFO':
            return {...state, userData: action.payload}
        case 'SET_STATIC_DATA':
            return {
                ...state,
                countries: action.payload.countries,
                genres: action.payload.genres
            }
        default:
            return state
    }
}