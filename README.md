.env file for localhost set up, register for [Nodemailer](https://nodemailer.com/about/), [Stripe](https://stripe.com), and [Pusher](https://pusher.com).

```
SECURE_KEY=
NODE_ENV=development
HOST=localhost
USER=
PASS=
DATABASE=
NODEMAILER_HOST=
NODEMAILER_PORT=
NODEMAILER_USER=
NODEMAILER_PASS=
FRONTEND_URL=http://localhost:3000
BACKEND_STRIPE_TOKEN=
PUSHER_APP_ID=
PUSHER_KEY=
PUSHER_SECRET=
PUSHER_CLUSTER=
```

Postgres setup


# End Points

## Teams End Points

### Add a Team /team/:user_id

- **POST** 

Expects params: user_id (this is needed for authentication)

Expects header :
```javascript
{
  Authorization: jsonWebToken
}
```

Expects body:
```javascript
{
    "team_name": string,
    "wiki": string, //Character limit of 1000
    "isPrivate": boolean
}
```
team_name must be unique

all values are required

Returns the created Team:
```javascript
{
    "id": 1,
    "team_name": "labs11",
    "wiki": "Labs 11 is the best labs group to date!",
    "isPrivate": false,
    "created_at": "2019-03-26T20:17:00.543Z",
    "updated_at": null
}
```
### GET Teams /team/teams/:user_id 

- **GET** 

Expects params: user_id (this is needed for authentication)

Expects header :
```javascript
{
  Authorization: jsonWebToken
}
```

Returns a list of all the Public Teams:
```javascript
{
  teams: [
    {
      "id": 1,
      "team_name": "labs11",
      "wiki": "Labs 11 is the best labs group to date!",
      "isPrivate": false,
      "created_at": "2019-03-26T20:17:00.543Z",
      "updated_at": null
    },
    ...
  ]
}
```

### GET Team /team/:user_id/:team_id

- **GET** 

Expects params: user_id (this is needed for authentication) and id of the Team

Expects header :
```javascript
{
  Authorization: jsonWebToken
}
```

Returns the Team:
```javascript
{
    "id": 1,
    "team_name": "labs11",
    "wiki": "Labs 11 is the best labs group to date!",
    "isPrivate": false,
    "created_at": "2019-03-26T20:17:00.543Z",
    "updated_at": null
}
```

### Update a Team /team/:user_id/:team_id

- **PUT** 

Expects params: user_id (this is needed for authentication) and id of the Team

Expects header :
```javascript
{
  Authorization: jsonWebToken
}
```
Expects body any team value you want changed: 
```javascript
{
  "team_name": string,
  "wiki": string, //Character limit of 1000
  "isPrivate": boolean
}
```
example : 
```javascript
{
	"wiki": "This was changed"
}
```

Returns the updated Team:
```javascript
{
  "id": 1,
  "team_name": "labs11",
  "wiki": "This was changed",
  "isPrivate": false,
  "created_at": "2019-03-26T20:17:00.543Z",
  "updated_at": null
}
```

### Get Discussions for Team /team/discussions/:user_id/:team_id

- **GET** 

Expects params: user_id (this is needed for authentication) and id of the Team

Expects header :
```javascript
{
  Authorization: jsonWebToken,
  order: string,
  orderType: asc, desc
}
```

example : 
```javascript
{
	Authorization: jsonWebToken,
  order: "name",
  orderType: "asc"
}
```

Returns the team and it's discussions:
```javascript
{
  "team": {
    "id": 1,
    "team_name": "labs11",
    "wiki": "Labs 11 is the best labs group to date!",
    "isPrivate": false,
    "created_at": "2019-03-26T20:17:00.543Z",
    "updated_at": null
  },
  "discussions": []
}
```

### Get Posts for a Discussion in a Team /team/discussion/posts/:user_id/:discussion_id

- **GET** 

Expects params: user_id (this is needed for authentication) and id of the discussion

Expects header :
```javascript
{
  Authorization: jsonWebToken,
  order: string,
  orderType: asc, desc
}
```

example : 
```javascript
{
  Authorization: jsonWebToken,
  order: "name",
  orderType: "asc"
}
```

Returns the discussion with it's posts:
```javascript
{
  "id": 30,
  "user_id": 506,
  "username": "test",
  "team_id": 1,
  "team_name": "labs11",
  "avatar": "data:image/png;base64,...",
  "signature": null,
  "body": "This was placed here by me",
  "created_at": "1553634012794",
  "last_edited_at": null,
  "views": 0,
  "upvotes": null,
  "downvotes": null,
  "user_vote": null,
  "post_count": 0,
  "posts": []
}
```

### Get Team Members for a Team /team/team_members/:user_id/:team_id

- **GET** 

Expects params: user_id (this is needed for authentication) and id of the Team

Expects header :
```javascript
{
  Authorization: jsonWebToken
}
```

Returns the Team Members:
```javascript
[
  {
    "team_id": 1,
    "team_name": "labs11",
    "user_id": 505,
    "username": "lucas",
    "role": "team_owner"
  }
]
```
### Add Team Member to a Team /team/team_members/:user_id/:team_id

- **POST** 

Expects params: user_id (id of the user joining the Team, same as logged in user) and id of the Team

Expects header :
```javascript
{
  Authorization: jsonWebToken
}
```

Can also Expect body : 
```javascript
{
  team_member_id: number //This is used for another user already apart of a Team to add another User to the Team
}
```

Returns the newly updated Team members list:
```javascript
[
  {
    "team_id": 1,
    "team_name": "labs11",
    "user_id": 506,
    "username": "test",
    "role": "member"
  }
]
```

### Delete Team Member from a Team /team/team_members/:user_id/:team_id

- **DELETE** 

Expects params: user_id (id of the user leaving the Team, same as logged in user) and id of the Team

Expects header :
```javascript
{
  Authorization: jsonWebToken
}
```

Returns the new Team Members list:
```javascript
[
  {
    "team_id": 1,
    "team_name": "labs11",
    "user_id": 506,
    "username": "test",
    "role": "member"
  }
]
```

### Delete Team Member from a Team as a Team Owner /team/team_members/team_owner/:user_id/:team_id

- **DELETE** 

Expects params: user_id (id of the user, same as logged in user) and id of the Team

Expects header :
```javascript
{
  Authorization: jsonWebToken
}
```
Expects body: 
```javascript
{
  team_member_id: number //Id of the user the Team Owner wants to remove from the Team
}
```

Returns the new Team Members list:
```javascript
[
  {
    "team_id": 1,
    "team_name": "labs11",
    "user_id": 506,
    "username": "test",
    "role": "member"
  }
]
```

### Get All Users With User Permissions /moderators

- **GET**

Returns all users list:
```javascript
[
  {
   "id": 42,
        "username": "Aaliyah.Swaniawski",
        "email": "Ethelyn.Runolfsson89@hotmail.com",
        "status": "active",
        "user_permissions": "basic" 
  }
]
```

### Get an Individual User From The Users Table With User permissions /moderators/:id

- **GET**

Expects params:id

Returns the user:
```javascript
[
  {
    "id": 401,
    "username": "james",
    "email": "james@example.com",
    "status": "active",
    "user_permissions": "moderator"
  }
]
```


### Change User Permissions To Moderator /moderators/changeToMod/:user_id

- **GET**

Expects params:user_id

Returns 1

### Change User Permissions To Basic /moderators/changeToBasic/:user_id

- **GET**

Expects params:user_id

Returns 1 

### Insert Deleted Post and Moderator Who Deleted The Post /posts/insert-deleted-post/:user_id

- **POST**

Expects params:user_id
Expects postBody, id:
```javascript
 [ 
   { 
     id: 46,
     body: 'Im an old man that used to love the twilight zone, I think a modern revamp is necessary to incorporate modern pro
  } 
]
```

Returns
```javascript
Result {
  command: 'INSERT',
  rowCount: 1,
  oid: 0,
  rows: [],
  fields: [],
  _parsers: [],
  RowCtor: null,
  rowAsArray: false,
  _getTypeParser: [Function: bound ] 
  }
```

### Get Deleted Post /posts/get-deleted-post

- **GET**

Returns
```javascript
[
  {
        "id": 1,
        "post": "Im an old man that used to love the twilight zone, I think a modern revamp is necessary to incorporate modern problems.",
        "post_id": 46,
        "username": "imon"
    }
]
```

### Get All Approved Emails /emails

- **GET**

Returns 
```javascript
[
  {
        "id": 1,
        "email": "example@example.com",
        "created_at": "2019-04-19T20:18:57.138Z",
        "first_name": "john",
        "last_name": "doe"
    }
]
```


### Check If Email Is In The Approved Email Database

- **GET**

Expects token: 
email: eyJhbGciOiJIUzI1NiIsIdR5cCI6IkpXVCJ9.eyJpZCI6NDA3LCJ1c2VybmFtZSI6Imltb24iLCJlbWFpbCI6Imltb25vdmJ1ZGVAZa1haWwuY29
tIiwidG90YWxfaG91cnMijjQzMjI4MS4zNTY1OTUyNzc4LCJpYXQiOjE1NTYxMjY0ODMsImV4cCI6MTU1NjI5OTI4M30.6pNLf47NaaKGw57ErM5IZzTe-A
5Ld-oR_DC0MLv_AkQ

Returns
```javascript
[
  { id: 3,
    email: 'youremail@example.com',
    created_at: 2019-04-19T20:18:57.138Z,
    first_name: 'your name',
    last_name: 'your name' }
]
```


### Post A New Email /emails

- **POST**

Expects body
```javascript
{
  email: 'example@example.com'
}
```

Returns
```javascript
{
    "message": "Successfully added!"
}
```


### Delete An Email emails/:id

- **DELETE**

Expects params: id

Returns 1