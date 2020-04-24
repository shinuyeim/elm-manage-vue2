const STORAGE_KEY = "elm_manage";

const storage = {
    fetch: function () {
        let val = JSON.parse(localStorage.getItem(STORAGE_KEY) || "[]");
        return val;
    },
    save: function (val) {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(val));
    },
    clear: function () {
        localStorage.removeItem(STORAGE_KEY);
    }
};

export default storage;