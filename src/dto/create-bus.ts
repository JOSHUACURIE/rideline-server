export interface CreateBusDTO{
    registrationNumber:string;
    name?:string;
    busType:"STANDARD"|"EXECUTIVE"|"LUXURY"|"VIP";
    totalSeats:number;
    amenities:string[];
}

export interface BusResponseDto{
    id:string;
    registrationNumber:string;
    name?:string;
    busType:"STANDARD"|"EXECUTIVE"|"LUXURY"|"VIP";
    totalSeats:number;
    amenities:string[];

}