export interface IActivity {
    id: string;
    title: string;
    description: string;
    category: string;
    date?: Date | undefined;
    city: string;
    venue: string;
}

export class ActivityFormValues implements IActivity {
    id: string = '';
    title: string = '';
    description: string = '';
    category: string = '';
    date?: Date = undefined;
    city: string = '';
    venue: string = '';

    constructor(initValues?: IActivity) {
        if (initValues)
        {
            Object.assign(this, initValues);
        }

    }

}