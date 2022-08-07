import { createContext, ReactNode, useContext, useReducer } from 'react';

export const HeaderContext = createContext({});

export const actionTypes = {
    SET_HEADER_TITLE_ACTION: 'SET_HEADER_TITLE_ACTION',
};

const initialState = {
    title: 'Document Tracker',
    icon: 'chevron-left',
    onBack: null,
};

const reducer = (state, action) => {
    const { type, payload } = action;

    switch (type) {
        case actionTypes.SET_HEADER_TITLE_ACTION:
            return { ...state, title: payload.title, onBack: payload.onBack };
        default:
            return state;
    }
};

export const useHeaderActions = () => {
    const [state, dispatch] = useReducer(reducer, initialState);

    const handleChangeTitleAction = (payload) => {
        dispatch({
            type: actionTypes.SET_HEADER_TITLE_ACTION,
            payload: { title: payload.title, onBack: payload.onBack },
        });
    };

    return {
        state,
        handleChangeTitleAction,
    };
};

export const HeaderProvider = ({ children }) => {
    const { state, handleChangeTitleAction } = useHeaderActions();

    return (
        <HeaderContext.Provider value={{ state, handleChangeTitleAction }}>
            {children}
        </HeaderContext.Provider>
    );
};

export const useHeaderStore = () => useContext(HeaderContext);
