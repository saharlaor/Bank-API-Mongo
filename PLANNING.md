# Planning

## Ready JSON file
   1. Create file if non-existent
   2. Function for reading file and convert to object
   3. Function for writing object to file

## Endpoints
#### `POST - /user/` - 
Create a new user, with ID number, cash 0 and credit 0.

req:

- body - `{"id": xxxxxxxx}`

res:

Success -
- code - 200
- body - 
  `{
    "id": xxxxxxxx,
    "cash": 0,
    "credit": 0
    }`

User exists -
- code - 400
- body - 
  `"400 - User already exists"`

#### `PUT - /user/deposit/:id` -
Add money to a user account's cash

req:

- body - `{"amount": x.x}`

res:

Success -
- code - 200
- body - 
  `{
    "id": xxxxxxxx,
    "cash": 0,
    "credit": 0
    }`

Error -

- Missing User -
  - code - 404
  - body - `"User not found"`

- Invalid Amount -
  - code - 400
  - body - `"Invalid amount"`

#### `PUT - /user/credit/:id` -
Change credit of a user account

req:

- body - `{"amount": x.x}`

res:

Success -
- code - 200
- body - 
  `{
    "id": xxxxxxxx,
    "cash": 0,
    "credit": 0
    }`

Error -

- Missing User -
  - code - 404
  - body - `"User not found"`

- Invalid Amount -
  - code - 400
  - body - `"Invalid amount"`

#### `PUT - /user/withdraw/:id`
Reduce cash and credit from the given account

req:

- body - `{"amount": x.x}`

res:

Success -
- code - 200
- body - 
  `{
    "id": xxxxxxxx,
    "cash": 0,
    "credit": 0
    }`

Error -

- Missing User -
  - code - 404
  - body - `"User not found"`

- Invalid Amount -
  - code - 400
  - body - `"Invalid amount"`

#### `PUT - /user/transfer/` -
transfer cash from a given account to another account using cash and credit


req:

- body - `{"fromID": xxxxxxxx, "toID": xxxxxxxx, "amount": x.x}`

res:

Success -
- code - 200
- body - 
  `{
    "id": xxxxxxxx,
    "cash": 0,
    "credit": 0
    }`

Error -

- Missing User -
  - code - 404
  - body - `"User ${missingID} not found"`

- Invalid Amount -
  - code - 400
  - body - `"Invalid amount"`

#### `GET - /user/:id`
Fetch a given user's account details

req:

- body - none

res:

Success -
- code - 200
- body - 
  `{
    "id": xxxxxxxx,
    "cash": 0,
    "credit": 0
    }`

Error -

- Missing User -
  - code - 404
  - body - `"User ${missingID} not found"`

#### `GET - /users/`
Fetch all users' account details

req:

- body - none

res:

Success -
- code - 200
- body - 
  `[
    {
    "id": xxxxxxxx,
    "cash": x.x,
    "credit": x.x
    },
    {
    "id": yyyyyyyy,
    "cash": y.y,
    "credit": y.y
    }...
  ]`

## Packages used
- express
- fs
