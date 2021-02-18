# Around the US API
Base URL: 
https://react-around-api.herokuapp.com
All responses come in standard JSON. All requests must include a content-type of application/json and the body must be valid JSON.

# Response Codes

    200: Success
    201: Created
    400: Bad request
    404: Not found
    403: Forbidden
    409: Conflict
    401: Unauthorized

# Endpoints, Sample Requests and Responses

## Signup

Request: 

    POST /signup

    Body:
        {
          “email”: “foo@bar.com”,
          “password”: “12345”,
        }

    Successful Response:
    HTTP/1.1 201 OK
    Content-Type: application/json
        {
          “email”: “foo@bar.com”,
          “password”: “passwordhash”,
          “_id”: “902dae4c9a05e700048b9aak”

        }
## Login

Request:

     POST /signin
     Body: 
         {
            “email”: “foo@bar.com”,
            “password”: “12345”,
          }

 Successful Response:
 
    HTTP/1.1 201 OK
    Content-Type: application/json
        {
          "token":                  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2MDJkYWU0YzlhMDVlNzAwMDQ4YjlhYWYiLCJpYXQiOjE2MTM2MDc4NjYsImV4cCI6MTYxNDIxMjY2Nn0.anh7WUfmblTxP8cVR2lOkx-7qB95Et1Bvd10B7yhsLQ"

        }

## Return information about an authorized user 

Request:

    GET /users/me
    Headers: 
        {
         Authentication: Bearer “token”
        }


Successful Response: 

    HTTP/1.1 200 OK
        {
          "_id":"902dae4c9a05e700048b9aak",
          "email":"foo@barl.com"
        }

## Update user info 

Request:

    PATCH /users/me
    Headers: 
        {
          Authentication: Bearer “token”
        }
Successful Response:

     HTTP/1.1 200 OK
         {
           "_id":"902dae4c9a05e700048b9aak",
           "email":"foo@bar.com",
           "about":"I do some work",
           "name":"John Doe"
         }

## Update an avatar 

Request:

    PATCH users/me/avatar 

    Headers: 
        {
          Authentication: Bearer “token”
        }
Successful Response:

    HTTP/1.1 200 OK

    {
      "_id":"902dae4c9a05e700048b9aak",
      "email":"foo@bar.com",
      "about":"I do some work",
      "name":"John Doe",
      “Avatar”: “www.example.com” 
    }

## Create a card 

Request:

    POST /cards
    Headers: 
        {
          Authentication: Bearer “token”
        }
    Body: 
        {
          "name":"Place",
          "link":"https://image.com",
        }
Successful Response: 

    HTTP/1.1 201 OK

    {
      "likes":[],
      “_id":"602eb5c378fad10004c1917d",
      "name":"Place",
      "link":"https://image.com",
      "createdAt":"2021-02-18T18:45:23.548Z"
    }

## Return all cards from the database 

Request:

    GET /cards
    Headers: 
        {
          Authentication: Bearer “token”
        }
Successful Response: 

    HTTP/1.1 200 OK

    [
      {
        "likes":["602719335572ed00043ff717"],
      "_id":"6025d40e24eb000004cb2e49",
      "name":"Minsk",
      "link":"http://d39raawggeifpx.cloudfront.net/styles/16_9_desktop/s3/articleimages/bneGeneric_Belarus_Minsk_cityscape_business_Cropped.png",
      "Owner":"6025c29dcbd84f00045c941c",
      "createdAt":"2021-02-12T01:04:14.921Z"
      },
      {
        "likes":["602719335572ed00043ff717","6025c29dcbd84f00045c941c"],
        "_id":"60271a515572ed00043ff718",
        "name":"Cat Wonderland",
        "link":"https://i.pinimg.com/736x/5f/93/2b/5f932bb657a43e6e12577cfaa7aaa233.jpg",
        "owner":"602719335572ed00043ff717",
        "createdAt":"2021-02-13T00:16:17.416Z"
      }
    ]

## Delete card by id 

Request:

    DELETE /cards/:cardId 
    Headers: 
      {
        Authentication: Bearer “token”
      }
Successful Response:

    HTTP/1.1 200 OK

    {
      "likes":[],
      “_id":"602eb5c378fad10004c1917d",
      "name":"Place",
      "link":"https://image.com",
      "createdAt":"2021-02-18T18:45:23.548Z"
    }

## Add likes 

Request:

PUT /cards/likes/:cardId
Headers: 
  {
    Authentication: Bearer “token”
  }
Successful Response: 
HTTP/1.1 200 OK

    {
      "likes":[userId],
      “_id":"602eb5c378fad10004c1917d",
      "name":"Place",
      "link":"https://image.com",
      "createdAt":"2021-02-18T18:45:23.548Z"
    }

## Remove likes 

Request:
DELETE /cards/likes:cardId
Headers: 
    {
      Authentication: Bearer “token”
    }
Successful Response: 
HTTP/1.1 200 OK

    {
      "likes":[],
      “_id":"602eb5c378fad10004c1917d",
      "name":"Place",
      "link":"https://image.com",
      "createdAt":"2021-02-18T18:45:23.548Z"
    }






