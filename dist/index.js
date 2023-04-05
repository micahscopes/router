// src/events.ts
var handlers = {};
var on = (event, handler) => {
  handlers[event] ?? (handlers[event] = []);
  handlers[event].push(handler);
};
var off = (event, handler) => {
  var _a;
  (_a = handlers[event]) == null ? void 0 : _a.splice(handlers[event].indexOf(handler), 1);
};
var emit = async (event, to, from) => {
  for (const handler of handlers[event] ?? []) {
    await handler(to, from);
  }
};

// src/utils.ts
var stripTrailingSlash = (str) => str.length > 1 && str.endsWith("/") ? str.slice(0, -1) : str;
var parsePattern = (pattern) => {
  var _a;
  const keys = (_a = pattern.match(/(:[^/]+)/g)) == null ? void 0 : _a.map((name) => name.substring(1));
  return keys && {
    keys,
    regExp: new RegExp("^" + pattern.replace(/(:[^/]+)/g, "([^/]+)") + "$")
  };
};
var getParams = (match, keys) => Object.fromEntries(keys.map((key, index) => [key, match[index + 1]]));

// src/index.ts
var routeDefinitions = [];
var currentRoute;
var findDefinition = (path) => {
  for (const definition of routeDefinitions) {
    const { pattern, regExp, keys } = definition;
    const match = regExp ? path.match(regExp) : pattern === "*" || pattern === path;
    if (match) {
      const params = Array.isArray(match) ? getParams(match, keys) : void 0;
      return { definition, params };
    }
  }
};
var handleChange = async (path, trigger) => {
  const result = findDefinition(path);
  const matches = !!result;
  const params = (result == null ? void 0 : result.params) ?? {};
  const previousRoute = currentRoute;
  currentRoute = { path, params, matches, trigger };
  await emit("before-route", currentRoute, previousRoute);
  await (result == null ? void 0 : result.definition.action(params, currentRoute, previousRoute));
  await emit("route", currentRoute, previousRoute);
};
var src_default = {
  get currentRoute() {
    return currentRoute;
  },
  on,
  off,
  start({ handleInitial = true } = {}) {
    const hash = window.location.hash != "" && window.location.hash;
    handleInitial && handleChange(hash || window.location.pathname || "/", "init");
    window.addEventListener(
      "popstate",
      () => handleChange(window.location.pathname, "popstate")
    );
    window.addEventListener(
      "hashchange",
      () => {
        handleChange(window.location.hash, "hashchange");
      }
    );
  },
  route(path, action) {
    const pattern = stripTrailingSlash(path);
    const { regExp, keys = [] } = parsePattern(path) || {};
    routeDefinitions.push({
      pattern,
      action,
      regExp,
      keys
    });
  },
  push(path) {
    window.history.pushState(null, "", stripTrailingSlash(path));
    handleChange(path, "push");
  },
  replace(path) {
    window.history.replaceState(null, "", stripTrailingSlash(path));
    handleChange(path, "replace");
  }
};
export {
  src_default as default
};
