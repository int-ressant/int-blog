## **BACKEND DOCUMENTATION**
#### Users routes
- Register **METHOD** *POST* [https://iblogapi.herokuapp.com/api/users/register](https://iblogapi.herokuapp.com/api/users/register)
> ###### *body* 
```
{
  "username": String,
  "email": String,
  "password": Number || String
}
```
- Confirm code **METHOD** *POST* [https://iblogapi.herokuapp.com/api/users/confirmation?type=registration](https://iblogapi.herokuapp.com/api/users/confirmation?type=registration)

> ###### *body* 
```
{
  "code": Number,
  "email": String,
}
```

- Signin **METHOD** *POST* [https://iblogapi.herokuapp.com/api/users/signin](https://iblogapi.herokuapp.com/api/users/signin)

> ###### *body* 
```
{
  "username" || "email": String,
  "password": String,
}
```

#### Tag routes

- Register **METHOD** *POST* [https://iblogapi.herokuapp.com/api/tags/register](https://iblogapi.herokuapp.com/api/tags/register)
> ###### *body* 
```
{
  "name": String,
  "stug": String <Lowercase />
}
```

- Get tags **METHOD** *GET* [https://iblogapi.herokuapp.com/api/tags](https://iblogapi.herokuapp.com/api/tags)
> ###### *body* 
```
{
  "createdBy": {
    "user": String,
    "username": String
  },
  "deleted": Boolean,
  "id": String,
  "slug": String,
  "name": String
}
```

- Edit tag **METHOD** *PUT* [https://iblogapi.herokuapp.com/api/tags/tagId](https://iblogapi.herokuapp.com/api/tags/tagId)
> ###### *body* 
```
{
  "name": String,
  "slug": String <Lowercase />
}