export class GamePlayed {
    category_id: number;
    game_id: number;
    date: Date;
    amount_of_points: string;

    constructor(category_id:number,game_id:number,date:Date,amount_of_points:string){
        this.category_id = category_id;
        this.game_id = game_id;
        this.date = date;
        this.amount_of_points = amount_of_points
    }
}