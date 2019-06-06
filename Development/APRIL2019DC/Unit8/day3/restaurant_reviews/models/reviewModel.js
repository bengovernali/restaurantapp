const db = require('./conn.js');

class Reviews {
    constructor(name, score, content, first_name, last_name) {
        this.name = name;
        this.score = score;
        this.content = content;
        this.first_name = first_name;
        this.last_name = last_name;
    }

    static async getReviews(r_id) {
        try {
            let response = await db.any(
                `select
                    restaurants.name, score, content, users.first_name, users.last_name
                from
                    reviews
                inner join restaurants
                    on restaurants.id = ${r_id} and restaurant_id = restaurants.id
                inner join users
                    on users.id = user_id`
            )
            return response;
        } catch(err) {
            return err.message
        }
    }
}

module.exports = Reviews;