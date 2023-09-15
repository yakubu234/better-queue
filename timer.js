module.exports = getCurrentTime = () => {
    const now = Date.now();
    const date = new Date(now);
    const year = date.getFullYear();
    const month = date.getMonth() + 1;
    const day = date.getDate();
    const hour = date.getHours();
    const minute = date.getMinutes();
    const second = date.getSeconds();
    const millisecond = date.getMilliseconds();

    return `${year}-${month}-${day} ${hour}:${minute}:${second}.${millisecond}`;
};
