const express = require('express');
const router = express.Router();
const restaurantModel = require('../models/restaurantModel');
const reviewModel = require('../models/reviewModel')

router.get('/', async (req, res, next) => {
    const allRestaurants = await restaurantModel.getAll();
    res.render('template', {
        locals: {
            title: 'List of Restaurants',
            is_logged_in: req.session.is_logged_in,
            listOfRestaurants: allRestaurants
        },
        partials: {
            partial: 'partial-restaurant-list'
        }
    });
});

router.get('/:restaurant_id', async (req, res, next) => {
    const r_id = req.params.restaurant_id;
    const oneRestaurant = await restaurantModel.getOne(r_id);
    const reviews = await reviewModel.getReviews(r_id);
    console.log(reviews);
    res.render('template', {
        locals: {
            title: 'Restaurant Info',
            singleRestaurant: oneRestaurant,
            is_logged_in: req.session.is_logged_in,
            user_id: req.session.user_id,
            restaurantReviews: reviews
        },
        partials: {
            partial: 'partial-single-restaurant'
        }
    });
});

router.post('/', (req, res) => {
    const {score, content, r_id, user_id} = req.body;
    restaurantModel.createReview(r_id, content, score, user_id)
    /*.then(async () => {
        const oneBusiness = await businessModel.getAll();
        res.render('template', {
            locals: {
                title: 'Business Info',
                singleBusiness: oneBusiness,
                businessReviews: reviews
            },
            partials: {
                partial: 'partial-single-business'
            }
        });
    })*/
    .then( () => {
        res.sendStatus(200).end();
    })
    .catch((err) => {
        res.sendStatus(500).send(err.message);
    });
});

module.exports = router;