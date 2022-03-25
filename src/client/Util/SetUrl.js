const SetUrl = () => {
    //returns the correct url whether in dev or prod
    let url;
    if (process.env.NODE_ENV === 'development') {
        url = process.env.API_URL_DEV;
    } else {
        url = process.env.API_URL_PROD;
    }
    return url;
}

export default SetUrl;