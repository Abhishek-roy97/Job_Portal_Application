export default class UserModel {
    constructor(_userName,_userEmail,_userPassword){
        this.userName = _userName;
        this.userEmail = _userEmail;
        this.userPassword = _userPassword;
    }

    static addUser({userName,userEmail,userPassword}){
        const userAccount = users.find(user=>user.userEmail === userEmail);
        if(!userAccount){
            users.push({userName,userEmail,userPassword});
            return null; 
            
        }
        else{
            return 'Email is already linked with another account!'
            
        }
    }
    static isValidUser({userEmail, userPassword}){
        const userAccount = users.find(user=>user.userEmail === userEmail);
        if(userAccount){
            if(userAccount.userPassword === userPassword){
                return null;
            }else{
                return 'Invalid Password'
            }
        }else{
            return 'Account does not exist, Sign-up First!'
        }
    }
    static getAccount(userEmail){
        const userAccount = users.find(user=>user.userEmail === userEmail);
        return userAccount;
    }
}

var users = [
    {
        userName:"Akash",
        userEmail:"akash@gmail.com",
        userPassword:"akash123"
    }
]