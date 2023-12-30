# Attendance System App Server

```
/**
* Student Perform Attendance 
* step 1 - find admin attendance by attendanceId
* step 2 - check if it is running or not
* step 3 - check already perform attendance or not
* step 4 - register entry
*/
```

## Request Input soruces

1. req Body
2. req Param
3. req Query
4. req Header
5. req Cookies

### Auth Pseudo codes:

```
User Registration:
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
name = input()
email = input()

user = find user with email
if user not found:
    return 400 error

if password != to user hash:
    return 400 error

token = generate token using user
return token
```

### User CRUD Pseudo codes:

```
Create user:
name = input()
email = input()
password = input()
roles = input()
acctountStatus = input()
user = register user via name, email, passowrd, roles, accountStatus
if user found:
	return user already exist message with status 400
else:
	create user and save to the db
	return user with 201 status
```

```
Get user by useId:
userId = input()
user = find user by userId
if user not found:
	return 404
else:
	return user with 200 status
```

```
Update user by userId:
userId = input()
name = input()
roles = input()
accountStatus = input()
user = find user by userId
if user not found:
	return 404
else:
	update user.name= name ?? user.name
	update user.roles = roles ?? user.roles
	update user.accountStatus = accountStatus ?? user.accountStatus
	saver user to the db
	return user with 200 status
```

```
Delete user by userId:
userId = input()
user = find user by userId
if user not found:
	return 404
else:
	delete user from db
	return 203 status
```
