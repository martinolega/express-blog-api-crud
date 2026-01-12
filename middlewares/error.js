function error(err, req, res, next)
{
    res.status(err.status || 500).json({error: err.message || "Errore non definito", status: err.status || 500});
}

export default error;