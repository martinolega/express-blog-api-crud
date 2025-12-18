import postList from "../data/postList.js";

function index(req, res)
{
    const result = {
        count: postList.length,
        results: postList,
    }
    res.json(result);
}

function show(req, res)
{
    const result = postList.find((post) => post.id === parseInt(req.params.id));

    if(result === undefined)
    {
        res.status(404)
        res.json({message: "Nessun post con id " + req.params.id});
    }
    else
    {
        res.json(result);
    }
}

function store(req, res)
{
    res.send("Creo un nuovo post");
}

function update(req, res)
{
    res.send("Rimpiazzo il post");
}

function modify(req, res)
{
    res.send("Modifico il post");
}

function destroy(req, res)
{
    const postIndex = postList.findIndex((post) => post.id === req.params.id);

    if(postIndex === -1)
    {
        res.status(404);
        return res.json({message: "Post non disponibile"});
    }

    postList.splice(postIndex, 1);
    res.sendStatus(204);
    console.log(postList);
}

const controller = {
    index,
    show,
    store,
    update,
    modify,
    destroy,
}

export default controller;