import application from '../src/application/index';
console.log("app", application);

application.GET!('/cositas', (req, res)=>{
    res.send('Escuche en cositas y te respondo');
})

application.GET!('/bolso', (req, res)=>{
    res.send('Escuche en bolso y te respondo, again' + req.cosas);
})

application.PUT!('/bolso', (req, res)=>{
    res.send('Escuche en bolso y te respondo, PUT');
})
application.listen(3210);