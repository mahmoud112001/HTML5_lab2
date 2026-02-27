// Check if the browser allows cookies
let cookiesWork = navigator.cookieEnabled;

// Save data using a specific key and value
window.saveData = function (name, value) {
  if (cookiesWork) {
    document.cookie = name + "=" + value + "; path=/";
  } else {
    localStorage.setItem(name, value);
  }
};

// Find data by its key name
window.getData = function (name) {
  if (cookiesWork) {
    let allCookies = document.cookie.split("; ");
    for (let i = 0; i < allCookies.length; i++) {
      let pair = allCookies[i].split("=");
      if (pair[0] === name) return pair[1];
    }
    return null;
  } else {
    return localStorage.getItem(name);
  }
};

// Delete a specific key
window.removeData = function (name) {
  if (cookiesWork) {
    document.cookie = name + "=; expires=Thu, 01 Jan 2025 00:00:00 UTC; path=/";
  } else {
    localStorage.removeItem(name);
  }
};

/* allCookieList */

window.allCookieList = function () {
  let result = {};
  if (cookiesWork) {
    let cookies = document.cookie ? document.cookie.split("; ") : [];
    for (let i = 0; i < cookies.length; i++) {
      let parts = cookies[i].split("=");
      // decodeURIComponent handles special characters like spaces
      result[decodeURIComponent(parts[0])] = decodeURIComponent(parts[1]);
    }
  } else {
    for (let i = 0; i < localStorage.length; i++) {
      let key = localStorage.key(i);
      result[key] = localStorage.getItem(key);
    }
  }
  return result;
};

window.hasCookie = function (cookieName) {
  // Reusing our existing getData function
  return getData(cookieName) !== null;
};
