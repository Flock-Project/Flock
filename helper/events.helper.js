const hbs = require('hbs');
 
hbs.registerHelper('joined', function(users, b, opts){
const a = users.filter( user => {
    if(user.id === b) {return user}
})
console.log(a.length)
console.log(b)
if (a.length > 0){ return opts.fn(this)}
else {return opts.inverse(this)}
})



hbs.registerHelper('organizer', function(user, b, opts){
    const a = user.id

    console.log(user.length)
    if (user.length > 0){ return opts.fn(this)}
    else {return opts.inverse(this)}
    })