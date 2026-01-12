function routeNotFound(req, res, next)
{
    const error = new Error(`Route ${req.originalUrl} not found`);
    error.status = 404;
    next(error);
}

export default routeNotFound;