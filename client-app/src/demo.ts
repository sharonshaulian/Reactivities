
let data: number = 10;

export interface ICar {
    color: string;
    model: string;
    topSpeed?: number;
}


const Car1: ICar = {
    color: 'white',
    model: 'BMW'
}

const Car2: ICar = {
    color: 'black',
    model: 'Subaro',
    topSpeed: 100
}


const multiply = (x: number, y: number) : number => {
    return x * y;
}




export const cars: ICar[] = [Car1, Car2]
