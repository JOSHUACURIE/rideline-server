export interface CreateBusDTO{
    registrationNumber:string;
    name?:string;
    busType:"STANDARD"|"EXECUTIVE"|"LUXURY"|"VIP";
    totalSeats:number;
    amenities:string[];
}

