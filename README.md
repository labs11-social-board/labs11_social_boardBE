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