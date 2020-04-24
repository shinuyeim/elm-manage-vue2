const STORAGE_KEY = "elm_manage";

const storage = {
    fetch: function (key) {
        const jsonData = JSON.parse(localStorage.getItem(STORAGE_KEY));
        if (!jsonData) {
            return "";
        }
        if (!Object.prototype.hasOwnProperty.call(jsonData, key)) {
            return "";
        }
        return jsonData[key];
    },
    save: function (val) {
        let data = JSON.parse(localStorage.getItem(STORAGE_KEY));
        if (!data) {
            data = val;
        } else {
            Object.assign(data, val);
        }
        localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
    },
    clear: function () {
        localStorage.removeItem(STORAGE_KEY);
    }
};

export default storage;