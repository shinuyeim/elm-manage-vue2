import { baseUrl } from "@/config/env";

const requestConfig = {
    headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
    },
    credentials: "include",
    mode: "cors",
    cache: "default",
};

export default async (
    url = "",
    { method = "GET", querys = {}, body = {}, headers = {} } = {}
) => {
    method = method.toUpperCase();
    url = baseUrl + url;

    Object.assign(requestConfig, { method: method });

    if (Object.keys(querys).length !== 0) {
        let paraStr = ""; //拼接query
        Object.keys(querys).forEach((key) => {
            paraStr += key + "=" + querys[key] + "&";
        });

        if (paraStr !== "") {
            paraStr = paraStr.substr(0, paraStr.lastIndexOf("&"));
            url = url + "?" + paraStr;
        }
    }

    if (Object.keys(body).length !== 0) {
        Object.assign(requestConfig, { body: JSON.stringify(body) });
    }

    if (Object.keys(headers).length !== 0) {
        Object.assign(requestConfig.headers, headers);
    }

    console.log(requestConfig);
    return fetch(url, requestConfig);
};
