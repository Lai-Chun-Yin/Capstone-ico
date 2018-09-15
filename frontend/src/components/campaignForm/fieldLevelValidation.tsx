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

export const campaignDates:any = {
    startDate : null,
    endDate : null,

    setStartDate: (dateStr:string)=>{
        campaignDates.startDate = new Date(dateStr);
    },
    setEndDate : (dateStr:string)=>{
        campaignDates.endDate = new Date(dateStr);
    },
    validateDates:()=>{
        if(campaignDates.startDate<campaignDates.endDate){
            return undefined;
        }else{
            return "Start date must be earlier than end date"
        }
    },
    validateStartDate: (dateStr:string)=>{
        campaignDates.setStartDate(dateStr);
        if(campaignDates.startDate&&campaignDates.endDate){
            return campaignDates.validateDates()
        }else {
            return undefined;        }
    },
    validateEndDate: (dateStr:string)=>{
        campaignDates.setEndDate(dateStr);
        if(campaignDates.startDate&&campaignDates.endDate){
            return campaignDates.validateDates()
        }else {
            return undefined;
        }
    }
}
export const positiveNum = (value:any)=>{
    if(+value>=0 && typeof (+value) === "number"){return undefined;}
    else{return "Must be a positive number"}
}
export const tokenQuantity:any={
    softCap:null,
    hardCap:null,
    totalSupply:null,
    setSoftCap:(value:number)=>{
        tokenQuantity.softCap = value;
    },
    setHardCap:(value:number)=>{
        tokenQuantity.hardCap = value;
    },
    setTotalSupply:(value:number)=>{
        tokenQuantity.totalSupply = value;
    },
    validateCap:()=>{
        if(tokenQuantity.softCap<=tokenQuantity.hardCap){
            return undefined;
        }else{
            return "Quantities should follow this rule: Soft Cap <= Hard Cap"
        }
    },
    validateSupply:()=>{
        if(tokenQuantity.hardCap<=tokenQuantity.totalSupply){
            return undefined;
        }else{
            return "Quantities should follow this rule: Hard Cap <= Total Supply"
        }
    },
    validateSoftCap:(value:number)=>{
        tokenQuantity.setSoftCap(+value);
        if(tokenQuantity.softCap&&tokenQuantity.hardCap){
            return tokenQuantity.validateCap();
        }else{
            return undefined;
        }
    },
    validateHardCap:(value:number)=>{
        tokenQuantity.setHardCap(+value);
        if(tokenQuantity.softCap&&tokenQuantity.hardCap){
            return tokenQuantity.validateCap();
        }else{
            return undefined;
        }
    },
    validateTotalSupply:(value:number)=>{
        tokenQuantity.setTotalSupply(+value);
        if(tokenQuantity.hardCap&&tokenQuantity.totalSupply){
            return tokenQuantity.validateSupply();
        }else{
            return undefined;
        }
    }
}