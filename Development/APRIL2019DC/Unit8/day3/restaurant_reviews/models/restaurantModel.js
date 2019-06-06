const db = require('./conn.js');

class Restaurants {
    constructor(id, name, address, street, city, state, menu){
        this.id = id;
        this.name = name;
        this.address = address;
        this.street = street;
        this.city = city;
        this.state = state;
        this.menu = menu;
    }

    static async getAll() {
        try {
            let response = await db.any(
                `select 
                    id, name 
                from 
                    restaurants`
            );
            return response;
        } catch(err) {
            return err.message
        }
    }
    static async getOne(r_id) {
        try {
            let response = await db.any(
                `select
                    id, name, address, street, city, state, menu
                from
                    restaurants
                where
                    id = ${r_id}`
            );
            return response;
        } catch(err) {
            return err.message
        }
    }
    static async createReview(id, content, score, user_id) {
        const query = `insert into reviews (score, content, restaurant_id, user_id) values (${score}, '${content}', ${id}, ${user_id});`;
        console.log(query);
        try {
            let response = await db.result(query);
            console.log(response);
            return response;
        } catch(err) {
            return err.message
        }
    }
}

module.exports = Restaurants;