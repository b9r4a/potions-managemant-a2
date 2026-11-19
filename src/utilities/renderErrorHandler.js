const renderErrorHandler = (res,err)=>{
    return res.status(404).json({
        message: err.message || "Something  went wrnd!"
    })
}

module.exports = renderErrorHandler;