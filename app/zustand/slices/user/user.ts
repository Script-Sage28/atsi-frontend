/* eslint-disable @typescript-eslint/no-misused-promises */
import { type StateCreator } from 'zustand/vanilla';
import { LoginAccount } from '@/service/request';

interface UserState {
  loading?: boolean;
  info?: object | null;
  aboutsUs?:any[];
  links?:any[];
  code?:any;
  otp?:any
  responseMsg?: string | undefined;
}

export interface UserSlice {
  user: UserState | null;
  login: (payload: any) =>  void;
  saveUserInfo: (payload: any) => void;
  logout: () => void;
  Abouts:(payload:any) => void;
  LinkUs:(payload:any) => void;
  saveCodes:(payload:any) => void;
}

const initialState: UserState = {
  loading: false,
  info: null,
  responseMsg: '',
  aboutsUs:[]
};

const createUserSlice: StateCreator<UserSlice> = (set) => ({
  user: initialState,
  login: async (payload: any) => {
    try {
      set((state: UserSlice) => ({
        ...state,
        user: {
          ...state.user,
          loading: true,
          info: null, 
          responseMsg: '',
        },
      }));
      const response = await LoginAccount.LOGIN(payload);
      if (response.status === 200) {
        if (!('message' in response.data)) {
          console.log(response.data.data);
          return response.data.data;
        } else {
          console.error('Login failed:', response.data.message);
          throw new Error(response.data.message);
        }
      }
    } catch (error) {
      set((state: UserSlice) => ({
        ...state,
        user: {
          ...state.user,
          loading: false,
          info: null, 
          responseMsg: '',
        },
      }));
      console.log(error);
      return error
    }
  },
  saveUserInfo: async (payload: any) => {
    console.log('save', payload);
    try {
      const process: boolean = await new Promise((resolve) => {
        setTimeout(() => {
          resolve(true);
        }, 2000);
      });

      if (typeof payload !== 'string' && process) {
        set((state) => ({
          ...state,
          user: {
            ...state.user,
            info: payload,
            loading: false,
            responseMsg: '',
          },
        }));
      }
    } catch (error) {
      console.log('Error at: ', error);
      set((state) => ({
        ...state,
        user: {
          ...state.user,
          info: null,
          loading: false,
          responseMsg: 'Invalid Credentials',
        },
      }));
    }
  },
  logout: async () => {
    try {
      set((state: UserSlice) => ({
        user: initialState, // Resetting to the initial state
      }));
    } catch (error) {
      console.error('Logout error:', error);
    }
  },
  Abouts:async(payload) =>{
    set((state) => ({
      ...state,
      user: {
        ...state.user,
        aboutsUs: payload,
        loading: false,
        responseMsg: '',
      },
    }));
  },
  LinkUs:async(payload) =>{
    set((state) => ({
      ...state,
      user: {
        ...state.user,
        links: payload,
        loading: false,
        responseMsg: '',
      },
    }));
  },
  saveCodes:(payload:any) =>{
    set((state) => ({
      ...state,
      user: {
        ...state.user,
        otp: payload.otp,
        code:payload.code,
        responseMsg: '',
      },
    }));
  }
});

export default createUserSlice;
