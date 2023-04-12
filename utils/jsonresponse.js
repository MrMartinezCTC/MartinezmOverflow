

export const sendError = (res, status, message) => {
    res.status(status).json({
        error: true,
        message
    })
}

