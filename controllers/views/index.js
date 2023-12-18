exports.getRegisterPage = (req, res) => {
    if (req.cookies.token) {

        return res.redirect('/');
    
    }
    res.render('auth/register',{authorised: false}); 
}

exports.getLoginPage = (req, res) => {
    if (req.cookies.token) {

        return res.redirect('/');
    
    }
    res.render('auth/login',{authorised: false}); 
}

exports.getLobbyPage = (req, res) => {
    if (req.cookies.token) {

        return res.redirect('/login');
    
    }
    res.render('lobby',{authorised: true}); 
}

exports.getGamesPage = (req, res) => {
    if (req.cookies.token) {

        return res.redirect('/login');
    
    }
    res.render('games', {authorised: true}); 
}

exports.getRoomPage = (req, res) => {  
    if (req.cookies.token) {

        return res.redirect('/login');
    
    }
    res.render('room', {authorised: true}); 
}