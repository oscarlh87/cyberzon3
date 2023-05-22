# Routes

## PRODUCTS

#### GET `/product` All products

#### GET `/product?name=<name>` All products with the same or similar to _name_

#### GET `/product/fn?find=<find>&filter=<filter>&sort=<sort>`

- **find**
  - **all** - Bring all products
  - **name** - Bring all products similar to or equal to _name_
  - **Examples**
    - `<find>` - msi
- **filter**

  - **none** - Does not apply filters
  - **Fields without reference**
    - **{"key": "value"}**
  - **Fields with reference**
    - **{"model": {"name": "value"}}**
  - **Examples**

    - `<filter>` - none - _Does not apply filters_
    - `<filter>` - {"price":5900} - _Bring everyone with Price equal to 5900_
    - `<filter>` - {"price":{"$gt":5000,"$lt":8000}} - _Bring all those who have a price between 5000 and 8000_
    - `<filter>` - {"category":{"name":"LAPTOP"}} - _Brings all those who have category equal to LAPTOP_
    - `<filter>` - {"keyboard":{"name":"US"}} - _Bring everyone who has Keyboard equal to US_
    - `<filter>` - {"price":{"$gt":5000,"$lt":8000},"category":{"name":"LAPTOP"},"keyboard":{"name":"US"}} - _It brings to product that they have a price of 5000 to 8000, with category equal to LAPTOP, with Keyboard equal to US_

    In this way it can be filtered through several fields.

- **sort**

  - **default** - Does not apply any ordering
  - **{"KEY": value}** - Order on the KEY field ascending (replace value to 1), descending (replace value to -1)
  - **Examples**

    - `<sort>` - default
    - `<sort>` - {"name":1}
    - `<sort>` - {"name":-1}
    - `<sort>` - {"price":1}
    - `<sort>` - {"price":-1}

    To order ascending or descending, it can only be ordered under a field, not several as for filtering

In this way a route would be seen
`http://localhost:5050/product/fn?find=msi&filter={"price":{"$gt":6000,"$lt":8000},"category":{"name":"LAPTOP"},"keyboard":{"name":"US"}}&sort={"price":1}`

**IMPORTANT: You can create an object with the specific properties and send the object converted into string(`JSON.stringify()`) for example `JSON.stringify({category:{name:"LAPTOP"}})` returns you `'{"category":{"name":"LAPTOP"}}'`**

## ORDERS

#### POST `orders/create` Create a order

- body example -> {
  "clientId": "644b718724ab04214273aa71",
  "total": "1000",
  "items": [
  {
  "product": {
  "_id": "644af80eafb747a5f29bdc1d"
  },
  "amount": 10
  }
  ]
  }

#### GET `/orders` All orders

#### GET `/orders/:id` Ger order by id

## CART

#### POST `cart/create` Create a cart

- body example -> {
  "clientId": "644b718724ab04214273aa71",
  "total": "1000",
  "items": [
  {
  "product":{"_id":"644af80eafb747a5f29bdc1d"},
  "quantity": 10
  }
  ]
  }

#### PUT `/addProduct` Add product to cart

- boby example -> {
  "cartId": "6457bae9dcc8975fc0264fdd",
  "productId": "644af80eafb747a5f29bdc1d",
  "quantity": 1
  }

#### PUT `/removeProduct` Remove product from cart

- boby example -> {
  "cartId": "6457bae9dcc8975fc0264fdd",
  "productId": "644af80eafb747a5f29bdc1d",
  "quantity": 1
  }

#### GET `/cart` All carts

#### GET `/cart/:id` Ger cart by id
