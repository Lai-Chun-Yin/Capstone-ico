export const required = (value:any) => (value || typeof value === 'number' ? undefined : 'Required');
export const email = (value:string) =>
value && !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(value)
  ? 'Invalid email address'
  : undefined;
export const ytlink = (link:string) => {
    // const match = link.match(/^https:\/\/youtu\.be\/([\w]+)/);
    // const match2 = link.match(/^https:\/\/www\.youtube\.com\/watch\?v=([\w]+)/);
    if(link){
        if(!link.match(/^https:\/\/youtu\.be\/([\w]+)/) && !link.match(/^https:\/\/www\.youtube\.com\/watch\?v=([\w]+)/)){
            return "Invalid Youtube link";
        }
    }
    return undefined;
}
export const maxChar100 = (value:string) => (value.length<=100?undefined:"Must be shorter than 100 characters");