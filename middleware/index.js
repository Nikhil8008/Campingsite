var middlewareObj = {};

// Check Campground Ownership
middlewareObj.checkCampgroundOwnership = function(req, res, next){
    if(req.isAuthenticated()){
        Campground.findById(req.params.id, function (err, foundCampground) {
            if (err || !foundCampground) {
                console.log(err);
                req.flash("error", "Campground not found.");
                res.redirect("back");
            } else if (foundCampground.author.id.equals(req.user._id)) {
                    next();
                } else {
                    req.flash("error", "You don't have permission to do that.");
                    res.redirect("/campgrounds/" + req.params.id);
                }
         });
    } else {
        req.flash("error","You need to be logged in to do that");
        res.redirect("/login");
    }
        
} 
    
// Check Comment Ownership
middlewareObj.checkCommentOwnership = function(req, res, next){
    if(req.isAuthenticated()){
        Comment.findById(req.params.comment_id, function (err, foundComment) {
            if (err || !foundComment) {
                console.log(err);
                req.flash("error", "Comment not found.");
                res.redirect("/campgrounds");
            } else if (foundComment.author.id.equals(req.user._id)) {
                    next();
                } else {
                    req.flash("error", "You don't have permission to do that.");
                    res.redirect("/campgrounds/" + req.params.id);
                }
        });
    } else {
        req.flash("error","You need to be logged in to do that");
        res.redirect("/login");
    }
       
} 
// Check if logged in
middlewareObj.isLoggedIn = function(req, res, next) {
    if (req.isAuthenticated()) {
        return next();
    }
    req.flash("error", "You need to be logged in to do that.");
    res.redirect("/login");
}

module.exports = middlewareObj;