// tow middlewares that will give and prevent access from the protected route
module.exports={
    ensureAuthentication:function (req,res,next) {
        if (req.isAuthenticated()) {
            next()
            return
        }
        req.flash('err_msg','Please log in First to access!')
        res.redirect('/')
    },
    proofAuthentication:function(req,res,next) {
        if (!req.isAuthenticated()) {
            next()
            return
        }
        console.log('i am authenticated');
        res.redirect('/secret')
    }
}