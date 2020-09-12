import { createContext } from "react";
import {observable, action, computed, configure, runInAction} from 'mobx';
import { IActivity } from "../models/activity";
import agent from "../api/agent";
import { v4 as uuid } from 'uuid';


configure({enforceActions: "always"});


class ActivityStore { 
    
    @observable activityRegistry = new Map<string,IActivity>();
    @observable activityList:IActivity[] = [];
    @observable initialLoading = true;
    @observable editMode = false;
    @observable selectedActivity: IActivity | null = null;
    @observable submmittingButtonId: string | null = null;
    @observable isFormSubmit: boolean = false;

    @computed get activityListByDate() {
      return Array.from(this.activityRegistry.values()).sort( (a, b) => { return Date.parse(a.date) - Date.parse(b.date); });
    }

    @action loadActivities = async () => {
        try {
          const res = await agent.Activities.list();
          runInAction(()=>{
            res.forEach(activity => 
              { 
                activity.date = activity.date.split('.')[0];
                this.activityRegistry.set(activity.id, activity);
              });
          });
        }
        catch (err) {
          console.log(err);
        }
        finally {
          runInAction(()=>{
            this.initialLoading = false;
          });
        }
    }

    @action handleSelectActivity = (activityId: string) => {
        this.selectedActivity = this.activityRegistry.get(activityId) || null;
        this.editMode = false;
    } 

      
    @action handleOpenCreateForm = (activity: IActivity | null) => {
      this.editMode = true;
      this.selectedActivity = activity;
    }



    @action handleDeleteActivity = async (e: React.MouseEvent<HTMLButtonElement,MouseEvent>, activityId: string) => {
      this.submmittingButtonId = e.currentTarget.name;
      try {
        await agent.Activities.delete(activityId);
        runInAction(()=>{
          this.activityRegistry.delete(activityId);
          this.submmittingButtonId = null;
        });
      }
      catch (err) {
        console.log(err);
      }
    }


    @action handleCreateActivity = (activity: IActivity) => {
      this.isFormSubmit = true;        
      
      agent.Activities.create(activity).then(()=> {
        runInAction(()=>{
          this.activityRegistry.set(activity.id, activity);
          this.selectedActivity = activity;
          this.editMode = false;
          this.isFormSubmit = false;          
        });
      });

    }

    @action handleEditActivity = (activity: IActivity) => {
      this.isFormSubmit = true;        

      agent.Activities.update(activity).then(()=>{
        this.activityList = [...this.activityList.filter(a=>a.id !== activity.id), activity];
        this.selectedActivity = activity;
        this.editMode = false;
        this.isFormSubmit = false;
      });
    }

    @action initActivity = () => {
      if (!this.selectedActivity) 
          this.selectedActivity = {
              id: '',
              title: '',
              description: '',
              category: '',
              date: '',
              city: '',
              venue: ''
      }
    }

    @action handleFormCancellation = () => {
      this.selectedActivity = null; 
      this.editMode = false;
    }



    @action handleInputChange = (ev: React.FormEvent<HTMLInputElement | HTMLTextAreaElement>) => {
      const {name, value} = ev.currentTarget;
      this.selectedActivity = {...this.selectedActivity!, [name]: value};
   }

    @action handleFormSubmittion = () => {

        if (this.selectedActivity!.id)
        {
            this.handleEditActivity(this.selectedActivity!);
        }
        else
        {
            const newActivity = {...this.selectedActivity!, id: uuid() }
            this.handleCreateActivity(newActivity);
        }

        this.selectedActivity = null;
    }





}

export default createContext(new ActivityStore());