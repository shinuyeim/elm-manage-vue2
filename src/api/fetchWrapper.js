import { baseUrl } from "@/config/env";

export default async (url = "",{ method = "GET", querys = {}, body = {} } = {} ) => {
    method = method.toUpperCase();
    url = baseUrl + url;

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

    let requestConfig = {
        credentials: "include",
        method: method,
        headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
        },
        mode: "cors",
        cache: "default",
    };

    if (Object.keys(body).length !== 0) {
        Object.defineProperty(requestConfig, "body", {
            value: JSON.stringify(body),
        });
    }

    return fetch(url, requestConfig);
};
