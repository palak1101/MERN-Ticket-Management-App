const errorHandler = (error,_,res,next)=>{
    const statusCode = res.statusCode<400?500:res.statusCode
    res.status(statusCode)
    res.json({
        message:error.message,
        stack:error.stack
    })
}
export default errorHandler;
