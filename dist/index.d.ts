declare type RouteTrigger = 'init' | 'push' | 'replace' | 'popstate' | 'hashchange';
declare type RouteParams = Record<string, string>;
declare type RouteAction = (params: RouteParams, to: Route, from?: Route) => any;
declare type TypedRouteAction<T> = (params: ParseRouteParams<T>, to: Route, from?: Route) => any;
declare type RouteEvent = 'before-route' | 'route';
interface RouteDefinition {
    pattern: string;
    keys: string[];
    regExp?: RegExp;
    action: RouteAction;
}
interface Route {
    path: string;
    params: RouteParams;
    matches: boolean;
    trigger: RouteTrigger;
}
declare type ParseRouteParams<url> = url extends `${infer start}/${infer rest}` ? ParseRouteParams<start> & ParseRouteParams<rest> : url extends `:${infer param}` ? {
    [k in param]: string;
} : {};
declare type RouteEventHandler = (to: Route, from?: Route) => any | Promise<any>;

declare const _default: {
    readonly currentRoute: Route | undefined;
    on: (event: RouteEvent, handler: RouteEventHandler) => void;
    off: (event: RouteEvent, handler: RouteEventHandler) => void;
    start({ handleInitial }?: {
        handleInitial?: boolean | undefined;
    }): void;
    route<T extends string>(path: T, action: TypedRouteAction<T>): void;
    push(path: string): void;
    replace(path: string): void;
};

export { ParseRouteParams, Route, RouteAction, RouteDefinition, RouteEvent, RouteEventHandler, RouteParams, RouteTrigger, TypedRouteAction, _default as default };
