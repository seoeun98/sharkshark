export const CTCHANGE: any = 'CTCHANGE';
export const changeStatus = (CTStatus: number) => ({ type: CTCHANGE, CTStatus });

const initalState = {
  CTStatus: 0,
};

const CTReducer = (state = initalState, action: { type: any; CTStatus: any }) => {
  switch (action.type) {
    case CTCHANGE:
      return {
        ...state,
        CTStatus: action.CTStatus,
      };

    default:
      return state;
  }
};
