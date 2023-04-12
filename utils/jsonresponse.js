

export const sendError = (res, status, message) => {
    res.status(status).json({
        isError: true,
        message
    })
}

