import application from '../src/application/index';
console.log("app", application);

application.GET!('/cositas', (req, res)=>{
    res.send('Escuche en cositas y te respondo');
})

application.GET!('/bolso/:id', (req, res)=>{
    const {params} = req;
    const {id} = params;
    res.send('Escuche en bolso y te respondo, again' + id);
})

application.GET!('/bolso/:id/prueba/:name', (req, res)=>{
    const {params} = req;
    const {id} = params;
    res.send('Escuche en bolso y te respondo, again' + id);
})

application.PUT!('/bolso', (req, res)=>{
    res.send('Escuche en bolso y te respondo, PUT');
})
application.listen(3210);