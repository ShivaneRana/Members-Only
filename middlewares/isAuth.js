isAuth = (req,res,next) => {
    if(req.isAuthenticated()){
        console.log(true);
    }else{
        console.log(false);
    }

    next();
}

module.exports = isAuth