 class Users {
        static createUser({name, email, password}) {
            const user = {name, email, password};
            Users.users.push(user);
            console.log(`user ${user.name} is created successfully with email ${user.email}`);
        }
        static getUserByEmail (email) {
           return Users.users.find((user) => user.email === email);
        }
}
Users.users = [];
class Auth {
     
     static signIn ({email, password}) {
        const existedUser = Users.getUserByEmail(email);
            if(existedUser) {
            return existedUser.password === password
        }
    }
}

module.exports = {Users, Auth}