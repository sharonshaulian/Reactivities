import { createContext } from "react";
import {observable, action, computed, configure, runInAction} from 'mobx';
import { IActivity } from "../models/activity";
import agent from "../api/agent";
import { v4 as uuid } from 'uuid';


configure({enforceActions: "always"});


interface IActivityListGroupedByDate {
  [index: string]: IActivity[];
}


class ActivityStore { 
    
    @observable activityRegistry = new Map<string,IActivity>();
    @observable initialLoading = true;
    @observable editMode = false;
    @observable selectedActivity: IActivity | null = null;
    @observable submmittingButtonId: string | null = null;
    @observable isFormSubmit: boolean = false;

    @computed get activityListGroupedByDate() {



        const result = Object.entries(this.activityListByDate().reduce((resultArr, item)=>{
          let date = item.date.split('T')[0];
          resultArr[date] = resultArr[date] ? [...resultArr[date], item] : [item];
          return resultArr;
        },{} as IActivityListGroupedByDate));

        console.log(result);

        return result;

    }

    activityListByDate = () : IActivity[] => {
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

    @action loadActivity = async (id: string) => {
      if (!id) {
        this.selectedActivity = null;
        return;
      }

      let result: IActivity | null = this.activityRegistry.get(id) || null;
      if (result)
      {
        this.selectedActivity = result;
      }
      else
      {
        this.initialLoading = true;
        try {
          result = await agent.Activities.details(id);
          runInAction(()=>{
            this.selectedActivity = result;
          });
        }
        catch (err) {
          console.log(err);
          runInAction(()=>{
            this.selectedActivity = null;
          });
        }
        finally {
          runInAction(()=>{
            this.initialLoading = false;            
          });
        }
      }
    }


    @action clearActivity = () => {
      this.selectedActivity = null;
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


    @action handleCreateActivity = async (activity: IActivity) => {
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

    @action handleEditActivity = async (activity: IActivity) => {
      this.isFormSubmit = true;        

      try {
        await agent.Activities.update(activity);
        runInAction(()=>{
          this.activityRegistry.set(activity.id, activity);
          this.selectedActivity = activity;
        });
      }
      catch (err) {
        console.log(err);
      }
      finally {
        runInAction(()=> {
          this.editMode = false;
          this.isFormSubmit = false;
        });
      }
    }


    @action handleFormSubmittion = async (activity: IActivity) : Promise<string> => {
        if (activity.id)
        {
            await this.handleEditActivity(activity);
            return activity.id;
        }
        else
        {
            const newActivity = {...activity, id: uuid() };
            await this.handleCreateActivity(newActivity);
            return newActivity.id;
        }
    }


    @action handleFormCancellation = () => {
      this.selectedActivity = null; 
      this.editMode = false;
    }


}

export default createContext(new ActivityStore());