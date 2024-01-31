export const monthNames = ["Jan", "Feb", "Mar", "Apr", "May", "June",
  "July", "Aug", "Sep", "Oct", "Nov", "Dec"
];

export const days = ["SUN","MON", "TUE", "WED", "THU", "FRI", "SAT"];

export function getDateInTextFormat(date){
    return date.getDate() + getDateNumberSuffix(date.getDate()) + " " + monthNames[date.getMonth()];
}

export function getDayInTextFormat(date){
    return days[date.getDay()]
}

export function getDateNumberSuffix(date){
    if(date%10==1){
        return "st";
    } else if(date%10==2){
        return "nd";
    } else if(date%10==3){
        return "rd";
    } else {
        return "th";
    }
}

export function getDates(t) {
    const dates = [];
    for(let i=0;i<14;i++){
        let date = new Date(t);
        date.setDate(date.getDate()+i);
        dates.push(date);
    }
    return dates;
}