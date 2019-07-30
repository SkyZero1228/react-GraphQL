import { createAction, createReducer } from 'redux-act';
import { push } from 'react-router-redux';
import { pendingTask, begin, end } from 'react-redux-spinner';
import { notification } from 'antd';

const REDUCER = 'app';
const NS = `@@${REDUCER}/`;

const _setFrom = createAction(`${NS}SET_FROM`);
const _setLoading = createAction(`${NS}SET_LOADING`);
const _setHideLogin = createAction(`${NS}SET_HIDE_LOGIN`);

export const setUserState = createAction(`${NS}SET_USER_STATE`);
export const setUpdatingContent = createAction(`${NS}SET_UPDATING_CONTENT`);
export const setActiveDialog = createAction(`${NS}SET_ACTIVE_DIALOG`);
export const deleteDialogForm = createAction(`${NS}DELETE_DIALOG_FORM`);
export const addSubmitForm = createAction(`${NS}ADD_SUBMIT_FORM`);
export const deleteSubmitForm = createAction(`${NS}DELETE_SUBMIT_FORM`);
export const setLayoutState = createAction(`${NS}SET_LAYOUT_STATE`);

export const setLoading = isLoading => {
  const action = _setLoading(isLoading);
  action[pendingTask] = isLoading ? begin : end;
  return action;
};

// export const resetHideLogin = () => (dispatch, getState) => {
//   const state = getState();
//   if (state.pendingTasks === 0 && state.app.isHideLogin) {
//     dispatch(_setHideLogin(false));
//   }
//   return Promise.resolve();
// };

const initialState = {
  // APP STATE
  from: '',
  isUpdatingContent: false,
  isLoading: false,
  activeDialog: '',
  dialogForms: {},
  submitForms: {},
  isHideLogin: false,

  // LAYOUT STATE
  layoutState: {
    isMenuTop: true,
    menuMobileOpened: false,
    menuCollapsed: false,
    menuShadow: false,
    themeLight: false,
    squaredBorders: false,
    borderLess: false,
    fixedWidth: false,
    settingsOpened: false,
  },

  // USER STATE
  userState: {
    email: '',
    role: '',
    user: null,
  },
};

export default createReducer(
  {
    [_setFrom]: (state, from) => ({ ...state, from }),
    [_setLoading]: (state, isLoading) => ({ ...state, isLoading }),
    [_setHideLogin]: (state, isHideLogin) => ({ ...state, isHideLogin }),
    [setUpdatingContent]: (state, isUpdatingContent) => ({ ...state, isUpdatingContent }),
    [setUserState]: (state, { userState }) => ({ ...state, userState }),
    [setLayoutState]: (state, param) => {
      const layoutState = { ...state.layoutState, ...param };
      const newState = { ...state, layoutState };
      window.localStorage.setItem('app.layoutState', JSON.stringify(newState.layoutState));
      return newState;
    },
    [setActiveDialog]: (state, activeDialog) => {
      const result = { ...state, activeDialog };
      if (activeDialog !== '') {
        const id = activeDialog;
        result.dialogForms = { ...state.dialogForms, [id]: true };
      }
      return result;
    },
    [deleteDialogForm]: (state, id) => {
      const dialogForms = { ...state.dialogForms };
      delete dialogForms[id];
      return { ...state, dialogForms };
    },
    [addSubmitForm]: (state, id) => {
      const submitForms = { ...state.submitForms, [id]: true };
      return { ...state, submitForms };
    },
    [deleteSubmitForm]: (state, id) => {
      const submitForms = { ...state.submitForms };
      delete submitForms[id];
      return { ...state, submitForms };
    },
  },
  initialState
);
