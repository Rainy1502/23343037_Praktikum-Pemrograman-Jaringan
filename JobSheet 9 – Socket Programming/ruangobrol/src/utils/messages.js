export const generateMessage = (username, text) => {
    return {
        username,
        text,
        createdAt: Date.now()
    };
};

export const generateLocationMessage = (username, url) => {
    return {
        username,
        url,
        createdAt: Date.now()
    };
};
