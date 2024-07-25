# EcommerceApp

About The Project

This is an ecommerce API built with NodeJs. It features authentication, CRUD ability on items, cart and user. 
Create your .env file in config directory
Environmental variables:
JWT_SECRET
PORT=3000
MONGODB_URL

Built With

    NodeJs
        Mongoose
        Express
    MongoDB
        Database management

Getting Started

1 fork the repo

    clone to your local machine

    npm install

    npm start or npm run dev

Prerequisites

    npm packages


API Endpoints

    Register User
        Method: POST
        URL: /users
        Description: Register a new user.
        Request Body:
    {
      "name": "test",
      "email": "test@test.com",
      "password": "test1234"
    }

Login User
    Method: POST
    URL: /users/login
    Description: Login a user.
    Request Body:
    {
      "email": "test@test.com",
      "password": "test1234"
    }

Items Endpoints

    Get All Items
        Method: GET
        URL: /items
        Description: Retrieve a list of all items.
        
    Create Item
        Method: POST
        URL: /items
        Description: Create a new product.
        Headers: Authorization: Bearer <token>
        Request Body:
    {
    "name": "iPhone ",
    "description": "Apple iPhone",
    "category": "Mobile Devices",
    "price": 50000
}

Cart Endpoints

    Add to Cart
        Method: POST
        URL: /cart
        Description: Add an item to the cart.
        Headers: Authorization: Bearer <token>
        Request Body:

        json

    {
    "itemId": "itemId from /get /items",
    "quantity": 4
    }

Get Cart

    Method: GET
    URL: /cart
    Description: Retrieve the cart for the logged-in user.
    Headers: Authorization: Bearer <token>

Remove from Cart

    Method: DELETE
    URL: /cart/?itemId=itemId
    Description: Remove an item from the cart by its ID.
    Headers: Authorization: Bearer <token>
