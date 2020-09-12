import { createContext } from "react";
import {observable, action} from 'mobx';
import { IActivity } from "../models/activity";
import agent from "../api/agent";

class ActivityStore { 
    //
    @observable activityList:IActivity[] = [];
    @observable initialLoading = true;
    @observable editMode = false;
    @observable selectedActivity: IActivity | null = null;
    @observable submmittingButtonId: string | null = null;
    @observable isFormSubmit: boolean = false;

    @action loadActivities = () => {
         agent.Activities.list().then((res)=>{
            res.forEach(activity => 
              { 
                activity.date = activity.date.split('.')[0];
                this.activityList.push( activity );
              });
            
            this.initialLoading = false;
           }
        )        
    }

    @action handleSelectActivity = (activityId: string) => {
        let result = this.activityList.filter((a)=>(a.id === activityId))[0];
        this.selectedActivity = result;
        this.editMode = false;
    } 

      
      //
      @action handleOpenCreateForm = () => {
        this.editMode = true;
        this.selectedActivity = null;
      }



      @action handleDeleteActivity = (e: React.MouseEvent<HTMLButtonElement,MouseEvent>, activityId: string) => {
        this.submmittingButtonId = e.currentTarget.name;
        agent.Activities.delete(activityId).then(()=>{
          this.activityList = [...this.activityList.filter((a)=>(a.id !== activityId))];
          this.submmittingButtonId = null;
        });
      }
 
  
      @action handleCreateActivity = (activity: IActivity) => {
        this.isFormSubmit = true;        
        
        agent.Activities.create(activity).then(()=> {
          this.activityList = [...this.activityList, activity];
          this.selectedActivity = activity;
          this.editMode = false;
          this.isFormSubmit = false;          
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
        if (this.selectedActivity) 
            return this.selectedActivity;
        else
        {
            return {
                id: '',
                title: '',
                description: '',
                category: '',
                date: '',
                city: '',
                venue: ''
            }
        }
      }

      @action handleFormCancellation = () => {
        this.selectedActivity = null; 
        this.editMode = false;
      }





}

export default createContext(new ActivityStore());