### Request Input soruces

 * req body
 * req Param
 * req Query
 * req Header
 * req Cookies
 

### Pseudo codes

```
User Registration:
Start
name = input()
eamil = input()
password = input()
if name && email && password is invalid:
    return 400 error
user = find user with email
if user found:
    return 400 error
hash = hash password
user = save name, email, hash to user model
rertun 201
End
``` 

```
User Login:
Start
name = input()
email = input()

user = find user with email
if user not found:
    return 400 error

if password != to user hash:
    return 400 error

token = generate token using user
return token
End
```