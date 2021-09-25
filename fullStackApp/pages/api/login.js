const users = [{email: "a@a", password: "a", userName: "Asho"}]

export default (req, res) => {
    console.log('alexa','req', req.method , req.body, req.params );
    
    if(req.method === "POST"){
        const params = req.body;
        const client = users.find((user) => user.email === params.email && user.password === params.password  )
        res.status(201).send(client)
    } else res.status(403).send()
}