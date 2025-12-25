import postList from "../data/postList.js";

const stringFields = ["title", "body", "img"];
const arrayFields = ["tags", "color"];

function areFieldsAcceptable(post) {
    for (let field in post) {
        if (stringFields.includes(field)) {
            if (typeof post[field] != "string") {
                return { result: false, message: `${field} is not a string` };
            }
        }
        else if (arrayFields.includes(field)) {
            if (Array.isArray(post[field]) === false) {
                return { result: false, message: `${field} is not an array` }
            }
        }
        else {
            return { result: false, message: `${field} does not belong to the structure` }
        }
    }

    return { result: true, message: `All fields are acceptable` };
}

function isRealPost(post) {
    if(Object.keys(post).length !== stringFields.length + arrayFields.length)
    {
        return {result: false, message: `Wrong number of fields (${Object.keys(post).length})`};
    }

    return areFieldsAcceptable(post);
}

function index(req, res) {
    const queries = req.query;

    const tags = Array.isArray(queries.tags) ? queries.tags : (queries.tags ? [queries.tags] : []);
    const colors = Array.isArray(queries.color) ? queries.color : (queries.color ? [queries.color] : []);

    const postFilter = postList.filter((post) => {

        for (let i = 0; i < tags.length; i++) {
            if (!post.tags.includes(tags[i]))
                return false;
        }

        for (let i = 0; i < colors.length; i++) {
            if (!post.color.includes(colors[i]))
                return false;
        }

        return true;
    });

    const result = {
        count: postFilter.length,
        results: postFilter,
    }

    return res.json(result);
}

function show(req, res) {
    const result = postList.find((post) => post.id === parseInt(req.params.id));

    if (result === undefined) {
        res.status(404)
        return res.json({ message: `There is no post with id: ${req.params.id}` });
    }
    else {
        return res.json(result);
    }
}

function store(req, res) {
    const post = req.body;
    const realPost = isRealPost(post);

    if (realPost.result === false) {
        res.status(400);
        return res.json({ message: `${realPost.message}` });
    }

    const newId = postList[postList.length - 1].id + 1;

    const newPost = {
        id: newId,
        title: post.title,
        body: post.body,
        img: post.img,
        tags: post.tags,
        color: post.color
    }

    postList.push(newPost);

    res.status(201);
    return res.json(newPost);
}

function update(req, res) {
    const post = req.body;
    const id = parseInt(req.params.id)
    const postIndex = postList.findIndex((post) => post.id === id);

    const realPost = isRealPost(post);

    if (realPost.result === false) {
        res.status(400);
        return res.json({ message: `${realPost.message}` });
    }

    if (postIndex === -1) {
        res.status(404)
        return res.json({ message: `There is no post with id: ${req.params.id}` });
    }

    const updatedPost = {
        id: id,
        title: post.title,
        body: post.body,
        img: post.img,
        tags: post.tags,
        color: post.color
    }

    postList[postIndex] = updatedPost;

    res.status(200);
    res.json(updatedPost);
}

function modify(req, res) {
    const request = req.body;
    const id = parseInt(req.params.id);
    const postIndex = postList.findIndex((post) => post.id === id);

    const acceptableFields = areFieldsAcceptable(request);
    if (acceptableFields.result === false) {
        res.status(400);
        return res.json({ message: `${acceptableFields.message}` });
    }

    if (postIndex === -1) {
        res.status(404)
        return res.json({ message: `There is no post with id: ${req.params.id}` });
    }

    Object.keys(request).forEach(field => {
        postList[postIndex][field] = request[field];
    });

    res.status(200);
    return res.send(postList[postIndex]);
}

function destroy(req, res) {
    const postIndex = postList.findIndex((post) => post.id === parseInt(req.params.id));

    if (postIndex === -1) {
        res.status(404);
        return res.json({ message: `There is no post with id: ${req.params.id}` });
    }

    postList.splice(postIndex, 1);
    return res.sendStatus(204);
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