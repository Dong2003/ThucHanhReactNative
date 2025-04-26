export default url => {
    const paramString = url.includes('?') ? url.split('?')[1] : url.split('#')[1];
    const params = [];

    paramString.forEach(param => {
        const paramSlit = param.split('=');
        params[paramSlit[0]] = paramSlit[1];
    });
    return params;
};
