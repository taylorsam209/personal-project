insert into favorite_restaurants(user_id, restaurant_id)
values($1, $2)
returning *;