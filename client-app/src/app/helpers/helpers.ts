export default class Helpers {
    
    static toLocalDate = (isoString: string): Date => {
        const srcAsTime = new Date(isoString).getTime();
        const offset = new Date(isoString).getTimezoneOffset();
        const converter = offset * (-1 * 60 * 1000);
        return new Date(srcAsTime + converter);
    }

}