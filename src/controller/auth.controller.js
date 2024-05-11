import UserModel from "../model/auth.model.js"

export default class AuthController{

    getSignUp(req, res){
        const user = req.session.user || null;
        res.render('register',{ errors: null, user: null})
    }

    getLogin(req, res){
        const user = req.session.user || null;
        res.render('login',{ errors: null, user: null})
    }
    postSignUp(req, res){
        const modelMessage = UserModel.addUser(req.body);
        if(modelMessage){
            const user = req.session.user || null;
            return res.render('register',{ errors: modelMessage, user: null})
        }
        res.redirect("/login")
    }
    postSignIn(req, res){
        const modelMessage = UserModel.isValidUser(req.body);
        console.log(modelMessage);
        if(modelMessage){
            const user = req.session.user || null;
            return res.render('login',{ errors: modelMessage, user })
        }
        const user = UserModel.getAccount(req.body.userEmail);
        console.log(user)
        req.session.user = user;
        res.redirect("/");
    }
    logout(req, res){
        req.session.user = null;
        req.session.destroy((err) =>{
            if(err){
                console.log(err);
            }else{
                res.redirect("/")
            }
        })
        res.clearCookie('lastVisit')
    }
}
