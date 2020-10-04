import axios, { AxiosResponse } from 'axios';
import { IActivity } from '../models/activity';
import { history } from '../..'
import { toast } from 'react-toastify';
import { IUser, IUserFormValues } from '../models/user';

axios.defaults.baseURL = 'https://localhost:5001/api';

axios.interceptors.request.use((config)=> {
  const token = window.localStorage.getItem('jwt');
  if (token) config.headers.Authorization = `Bearer ${token}`;
  return config;
}, error => {
  return Promise.reject(error);
});

// Add a response interceptor
axios.interceptors.response.use(function (response) {

    return response;
  }, function (error) {
 
    if (!error.response || error.message === 'Network Error' )
    {
      toast.error('Network error - make sure API is runnig !')
    } 
  
    const {status, data, config} = error.response;
    if (status === 404) {
      history.push('/notFound');
    }

    if (status === 400 && config.method === 'get' && data.errors.hasOwnProperty('id'))
    {
      history.push('/notFound');
    }

    if (status === 500) {
      toast.error("Server error - check the terminal for more information !");
    }

    throw error.response;
  });
  
const responseBody = (response: AxiosResponse) => response.data;


const requests = {
    get: (url: string) => axios.get(url).then(responseBody),
    post: (url: string, body: {}) => axios.post(url, body).then(responseBody),
    put: (url: string, body: {}) => axios.put(url, body).then(responseBody),
    del: (url: string) => axios.delete(url).then(responseBody)
}


const Activities = {
    list: (): Promise<IActivity[]> => requests.get('/activities'),
    details: (id: string) => requests.get(`/activities/${id}`),
    create: (activity: IActivity ) => requests.post(`/activities/`, activity),
    update: (activity: IActivity ) => requests.put(`/activities/${activity.id}`, activity),
    delete: (id: string ) => requests.del(`/activities/${id}`),
}

const User = {
  current: () : Promise<IUser> => requests.get('/user/'),
  login: (formValues: IUserFormValues): Promise<IUser> => requests.post('/user/login/', formValues),
  register: (formValues: IUserFormValues): Promise<IUser> => requests.post('/user/register/', formValues),

}


export default {
    Activities, 
    User
};