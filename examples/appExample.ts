import application from '../src/application/index';
console.log("app", application);

application.GET('/cositas', (req, res, next)=>{
    console.log("pasé por ac{a");
    next();
},  (req, res, next)=>{
    res.send('Escuche en cositas y te respondo');
} )

application.GET('/bolso/:id', (req, res, next)=>{
    console.log("pasé por ac{a");
    next();
},(req, res, next)=>{
    console.log("pasé por ac{a");
    next();
},(req, res, next)=>{
    console.log("pasé por ac{a");
    next();
},(req, res, next)=>{
    console.log("pasé por ac{a");
    next();
},  (req, res, next)=>{
    const {params} = req;
    const {id} = params;
    res.send('Respondo a /bolso/:id' + id);
})

application.GET('/bolso/:id/prueba/:name',  (req, res, next)=>{
    console.log("pasé por ac{a");
    next();
}, (req, res)=>{
    const {params} = req;
    const {id} = params;
    res.send('respondo /bolso/:id/prueba/:name' + JSON.stringify(req.params));
})

application.PUT('/bolso', (req, res)=>{
    res.send('Escuche en bolso y te respondo, PUT');
})
application.listen(3210);