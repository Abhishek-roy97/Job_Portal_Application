import { body, validationResult } from "express-validator";

export const userValidation = async (req, res, next) => {
  const rules = [body("userEmail").isEmail().withMessage("Enter valid email")];
  
  if (req.path === "/register") {
    rules.push(
      body("userName").notEmpty().withMessage("Full Name is required")
    );
  }
  if (req.path === "/login") {
    rules.push(
      body("userPassword")
        .isLength({ min: 8 })
        .withMessage("Password must be at least 8 characters long")
        .matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/)
        .withMessage('Password must contain at least one uppercase letter, one lowercase letter, and one digit')
    );
  }

  await Promise.all(rules.map(rule => rule.run(req)));
  var errors = validationResult(req);

  if(!errors.isEmpty()){
    console.log(errors);
    if(req.path === '/register') return res.render('register',{errors:errors.array()[0].msg});
    if(req.path === '/login') return res.render('login',{errors:errors.array()[0].msg})
  }
next();
};
