import { action, computed, configure, observable, runInAction } from "mobx";
import agent from "../api/agent";
import { IUser, IUserFormValues } from "../models/user";
import { RootStore } from "./rootStore";
import { history } from "../.."

configure({enforceActions: "always"});


export default class UserStore {

    rootStore: RootStore;
    constructor (rootStore: RootStore) {
      this.rootStore = rootStore;
    }

    @observable user: IUser | null = null;

    @computed get isLoggedIn() {
        return !!this.user;
    }

    @action login = async (formValues: IUserFormValues) => {
        try {
            const user = await agent.User.login(formValues);
            runInAction(()=>{
                this.user = user;
                this.rootStore.commonStore.setToken(user.token);
                this.rootStore.modalStore.closeModal();
                history.push('/activities');
            })
        }
        catch (err) {
            console.log(err);
            throw err;
        }
    }

    @action register = async (formValues: IUserFormValues) => {
        try {
            const user = await agent.User.register(formValues);
            runInAction(()=>{
                this.user = user;
                this.rootStore.commonStore.setToken(user.token);
                this.rootStore.modalStore.closeModal();
                history.push('/activities');
            })
        }
        catch (err) {
            console.log(err);
            throw err;
        }        
    }





    @action getUser = async () => {
        try {
            const result = await agent.User.current();
            runInAction(()=>{
                this.user = result;
            })
        }
        catch (err) {
            console.log(err);
        }

    }




    @action logout = () => {
        this.rootStore.commonStore.setToken(null);
        this.user = null;
        history.push('/');
    }
}