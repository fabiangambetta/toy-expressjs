import application from '../src/application/index';
console.log("app", application);

application.GET!('/cositas', (req, res)=>{
    res.send('Escuche en cositas y te respondo');
})

application.GET!('/bolso/:id', (req, res)=>{
    res.send('Escuche en bolso y te respondo, again' + req._params[0].value);
})

application.PUT!('/bolso', (req, res)=>{
    res.send('Escuche en bolso y te respondo, PUT');
})
application.listen(3210);