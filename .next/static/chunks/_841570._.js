(globalThis.TURBOPACK = globalThis.TURBOPACK || []).push(["static/chunks/_841570._.js", {

"[project]/actions/log-in.ts [app-client] (ecmascript)": ((__turbopack_context__) => {
"use strict";

var { r: __turbopack_require__, f: __turbopack_module_context__, i: __turbopack_import__, s: __turbopack_esm__, v: __turbopack_export_value__, n: __turbopack_export_namespace__, c: __turbopack_cache__, M: __turbopack_modules__, l: __turbopack_load__, j: __turbopack_dynamic__, P: __turbopack_resolve_absolute_path__, U: __turbopack_relative_url__, R: __turbopack_resolve_module_id_path__, b: __turbopack_worker_blob_url__, g: global, __dirname, k: __turbopack_refresh__, m: module, z: require } = __turbopack_context__;
{
/* __next_internal_action_entry_do_not_use__ {"7f5d5ba158e0892350a3aac14eeb40d916263bc3ef":"logIn"} */ __turbopack_esm__({
    "logIn": (()=>logIn)
});
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$build$2f$webpack$2f$loaders$2f$next$2d$flight$2d$loader$2f$action$2d$client$2d$wrapper$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_import__("[project]/node_modules/next/dist/build/webpack/loaders/next-flight-loader/action-client-wrapper.js [app-client] (ecmascript)");
;
var logIn = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$build$2f$webpack$2f$loaders$2f$next$2d$flight$2d$loader$2f$action$2d$client$2d$wrapper$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["createServerReference"])("7f5d5ba158e0892350a3aac14eeb40d916263bc3ef", __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$build$2f$webpack$2f$loaders$2f$next$2d$flight$2d$loader$2f$action$2d$client$2d$wrapper$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["callServer"], void 0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$build$2f$webpack$2f$loaders$2f$next$2d$flight$2d$loader$2f$action$2d$client$2d$wrapper$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["findSourceMapURL"], "logIn");
}}),
"[project]/lib/schemas.ts [app-client] (ecmascript)": ((__turbopack_context__) => {
"use strict";

var { r: __turbopack_require__, f: __turbopack_module_context__, i: __turbopack_import__, s: __turbopack_esm__, v: __turbopack_export_value__, n: __turbopack_export_namespace__, c: __turbopack_cache__, M: __turbopack_modules__, l: __turbopack_load__, j: __turbopack_dynamic__, P: __turbopack_resolve_absolute_path__, U: __turbopack_relative_url__, R: __turbopack_resolve_module_id_path__, b: __turbopack_worker_blob_url__, g: global, __dirname, k: __turbopack_refresh__, m: module, z: require } = __turbopack_context__;
{
__turbopack_esm__({
    "createPostSchema": (()=>createPostSchema),
    "logInSchema": (()=>logInSchema),
    "signUpSchema": (()=>signUpSchema)
});
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$zod$2f$lib$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_import__("[project]/node_modules/zod/lib/index.mjs [app-client] (ecmascript)");
;
const signUpSchema = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$zod$2f$lib$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["z"].object({
    username: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$zod$2f$lib$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["z"].string().min(2, 'username must be at least 2 characters'),
    password: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$zod$2f$lib$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["z"].string().min(6, 'password must be at least 6 characters')
});
const logInSchema = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$zod$2f$lib$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["z"].object({
    username: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$zod$2f$lib$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["z"].string().min(1, 'username is required'),
    password: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$zod$2f$lib$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["z"].string().min(1, 'password is required')
});
const createPostSchema = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$zod$2f$lib$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["z"].object({
    title: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$zod$2f$lib$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["z"].string().min(3, 'Title must be at least 3 characters').max(100, 'Title must be less than 100 characters'),
    content: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$zod$2f$lib$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["z"].string().min(10, 'Content must be at least 10 characters').max(10000, 'Content must be less than 10000 characters')
});
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_refresh__.registerExports(module, globalThis.$RefreshHelpers$);
}
}}),
"[project]/components/field-error.tsx [app-client] (ecmascript)": ((__turbopack_context__) => {
"use strict";

var { r: __turbopack_require__, f: __turbopack_module_context__, i: __turbopack_import__, s: __turbopack_esm__, v: __turbopack_export_value__, n: __turbopack_export_namespace__, c: __turbopack_cache__, M: __turbopack_modules__, l: __turbopack_load__, j: __turbopack_dynamic__, P: __turbopack_resolve_absolute_path__, U: __turbopack_relative_url__, R: __turbopack_resolve_module_id_path__, b: __turbopack_worker_blob_url__, g: global, __dirname, k: __turbopack_refresh__, m: module, z: require } = __turbopack_context__;
{
__turbopack_esm__({
    "FieldError": (()=>FieldError)
});
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_import__("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
;
const FieldError = ({ error })=>{
    if (!error) return null;
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
        className: "text-sm text-primary",
        children: error.message
    }, void 0, false, {
        fileName: "[project]/components/field-error.tsx",
        lineNumber: 6,
        columnNumber: 10
    }, this);
};
_c = FieldError;
var _c;
__turbopack_refresh__.register(_c, "FieldError");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_refresh__.registerExports(module, globalThis.$RefreshHelpers$);
}
}}),
"[project]/lib/client.ts [app-client] (ecmascript)": ((__turbopack_context__) => {
"use strict";

var { r: __turbopack_require__, f: __turbopack_module_context__, i: __turbopack_import__, s: __turbopack_esm__, v: __turbopack_export_value__, n: __turbopack_export_namespace__, c: __turbopack_cache__, M: __turbopack_modules__, l: __turbopack_load__, j: __turbopack_dynamic__, P: __turbopack_resolve_absolute_path__, U: __turbopack_relative_url__, R: __turbopack_resolve_module_id_path__, b: __turbopack_worker_blob_url__, g: global, __dirname, k: __turbopack_refresh__, m: module, z: require } = __turbopack_context__;
{
__turbopack_esm__({
    "client": (()=>client)
});
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$axios$2f$lib$2f$axios$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_import__("[project]/node_modules/axios/lib/axios.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$build$2f$polyfills$2f$process$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_import__("[project]/node_modules/next/dist/build/polyfills/process.js [app-client] (ecmascript)");
;
const client = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$axios$2f$lib$2f$axios$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].create({
    baseURL: ("TURBOPACK compile-time value", "http://localhost:8082"),
    withCredentials: true,
    headers: {
        'Content-Type': 'application/json'
    }
});
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_refresh__.registerExports(module, globalThis.$RefreshHelpers$);
}
}}),
"[project]/hooks/useAuthentification.tsx [app-client] (ecmascript)": ((__turbopack_context__) => {
"use strict";

var { r: __turbopack_require__, f: __turbopack_module_context__, i: __turbopack_import__, s: __turbopack_esm__, v: __turbopack_export_value__, n: __turbopack_export_namespace__, c: __turbopack_cache__, M: __turbopack_modules__, l: __turbopack_load__, j: __turbopack_dynamic__, P: __turbopack_resolve_absolute_path__, U: __turbopack_relative_url__, R: __turbopack_resolve_module_id_path__, b: __turbopack_worker_blob_url__, g: global, __dirname, k: __turbopack_refresh__, m: module, z: require } = __turbopack_context__;
{
__turbopack_esm__({
    "useAuthentication": (()=>useAuthentication)
});
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_import__("[project]/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$client$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_import__("[project]/lib/client.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$navigation$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_import__("[project]/node_modules/next/navigation.js [app-client] (ecmascript)");
var _s = __turbopack_refresh__.signature();
'use client';
;
;
;
// Create a variable outside the hook to track refresh state
let isRefreshingToken = false;
let refreshSubscribers = [];
const onRefreshed = (token)=>{
    refreshSubscribers.forEach((callback)=>callback(token));
    refreshSubscribers = [];
};
function useAuthentication() {
    _s();
    const [user, setUser] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])({
        "useAuthentication.useState": ()=>{
            if ("TURBOPACK compile-time truthy", 1) {
                try {
                    const userData = localStorage.getItem('userData');
                    return userData ? JSON.parse(userData) : null;
                } catch (error) {
                    console.error('Error parsing user data:', error);
                    return null;
                }
            }
            return null;
        }
    }["useAuthentication.useState"]);
    const [isAuthenticated, setIsAuthenticated] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(!!user);
    const [isLoading, setIsLoading] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(true);
    const router = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$navigation$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRouter"])();
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "useAuthentication.useEffect": ()=>{
            const handleUserUpdate = {
                "useAuthentication.useEffect.handleUserUpdate": (event)=>{
                    setTimeout({
                        "useAuthentication.useEffect.handleUserUpdate": ()=>{
                            setUser(event.detail);
                        }
                    }["useAuthentication.useEffect.handleUserUpdate"], 700);
                    setIsAuthenticated(true);
                }
            }["useAuthentication.useEffect.handleUserUpdate"];
            window.addEventListener('user-updated', handleUserUpdate);
            return ({
                "useAuthentication.useEffect": ()=>{
                    window.removeEventListener('user-updated', handleUserUpdate);
                }
            })["useAuthentication.useEffect"];
        }
    }["useAuthentication.useEffect"], []);
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "useAuthentication.useEffect": ()=>{
            if (user) {
                localStorage.setItem('userData', JSON.stringify(user));
            }
        }
    }["useAuthentication.useEffect"], [
        user
    ]);
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "useAuthentication.useEffect": ()=>{
            checkAuth();
        }
    }["useAuthentication.useEffect"], []) // Run on component mount
    ;
    const refreshToken = async ()=>{
        try {
            if (isRefreshingToken) {
                // Return a promise that resolves when the token is refreshed
                return new Promise((resolve)=>{
                    refreshSubscribers.push(resolve);
                });
            }
            isRefreshingToken = true;
            const storedRefreshToken = localStorage.getItem('refreshToken');
            if (!storedRefreshToken) {
                throw new Error('No refresh token available');
            }
            const response = await __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$client$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["client"].post('/auth/refresh-token', {
                refreshToken: storedRefreshToken
            });
            const newToken = response.data.token;
            localStorage.setItem('token', newToken);
            localStorage.setItem('refreshToken', response.data.refreshToken);
            __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$client$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["client"].defaults.headers.common['Authorization'] = `Bearer ${newToken}`;
            onRefreshed(newToken);
            return newToken;
        } catch (error) {
            console.error('Token refresh failed:', error);
            await logout();
            return null;
        } finally{
            isRefreshingToken = false;
        }
    };
    const isTokenExpired = (token)=>{
        try {
            const payload = JSON.parse(atob(token.split('.')[1]));
            return payload.exp * 1000 < Date.now();
        } catch  {
            return true;
        }
    };
    const checkAuth = async ()=>{
        try {
            const token = localStorage.getItem('token');
            if (!token) {
                setIsLoading(false);
                return;
            }
            if (isTokenExpired(token)) {
                const newToken = await refreshToken();
                if (!newToken) {
                    await logout();
                    return;
                }
            }
            __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$client$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["client"].defaults.headers.common['Authorization'] = `Bearer ${token}`;
            try {
                const response = await __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$client$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["client"].get('/auth/me');
                if (response.data) {
                    const userData = {
                        ...response.data,
                        iconName: response.data.iconName || 'UserCircle'
                    };
                    setUser(userData);
                    localStorage.setItem('userData', JSON.stringify(userData));
                    setIsAuthenticated(true);
                }
            } catch (error) {
                if (error?.response?.status === 401) {
                    const newToken = await refreshToken();
                    if (newToken) {
                        return checkAuth() // Retry the auth check with new token
                        ;
                    }
                }
                throw error;
            }
        } catch (error) {
            console.error('Auth check error:', error);
            await logout();
        } finally{
            setIsLoading(false);
        }
    };
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "useAuthentication.useEffect": ()=>{
            const interceptor = __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$client$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["client"].interceptors.response.use({
                "useAuthentication.useEffect.use[interceptor]": (response)=>response
            }["useAuthentication.useEffect.use[interceptor]"], {
                "useAuthentication.useEffect.use[interceptor]": async (error)=>{
                    const originalRequest = error.config;
                    if (error.response?.status === 401 && !originalRequest._retry) {
                        originalRequest._retry = true;
                        try {
                            const newToken = await refreshToken();
                            if (newToken) {
                                originalRequest.headers['Authorization'] = `Bearer ${newToken}`;
                                return (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$client$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["client"])(originalRequest);
                            }
                            // If no new token, handle logout
                            await logout();
                            return Promise.reject(error);
                        } catch (refreshError) {
                            await logout();
                            return Promise.reject(refreshError);
                        }
                    }
                    return Promise.reject(error);
                }
            }["useAuthentication.useEffect.use[interceptor]"]);
            return ({
                "useAuthentication.useEffect": ()=>{
                    __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$client$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["client"].interceptors.response.eject(interceptor);
                }
            })["useAuthentication.useEffect"];
        }
    }["useAuthentication.useEffect"], []);
    const login = async ({ token, refreshToken, user })=>{
        if (!token || !refreshToken) {
            console.error('Missing token or refresh token');
            return;
        }
        try {
            localStorage.setItem('token', token);
            localStorage.setItem('refreshToken', refreshToken);
            __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$client$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["client"].defaults.headers.common['Authorization'] = `Bearer ${token}`;
            if (user) {
                const userData = {
                    id: user.id,
                    username: user.username,
                    iconName: user.iconName || 'UserCircle',
                    createdAt: new Date().toISOString(),
                    updatedAt: new Date().toISOString()
                };
                localStorage.setItem('userData', JSON.stringify(userData));
                setUser(userData);
                setIsAuthenticated(true);
            } else {
                await checkAuth();
            }
        } catch (error) {
            console.error('Login error:', error);
            await logout();
        }
    };
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "useAuthentication.useEffect": ()=>{
            // Set up default authorization header if token exists
            const token = localStorage.getItem('token');
            if (token) {
                __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$client$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["client"].defaults.headers.common['Authorization'] = `Bearer ${token}`;
            }
        }
    }["useAuthentication.useEffect"], []);
    const logout = async ()=>{
        try {
            localStorage.removeItem('token');
            localStorage.removeItem('refreshToken');
            localStorage.removeItem('userData');
            delete __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$client$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["client"].defaults.headers.common['Authorization'];
            setUser(null);
            setIsAuthenticated(false);
            router.push('/auth/log-in');
        } catch (error) {
            console.error('Logout error:', error);
        }
    };
    const updateUser = (updatedUser)=>{
        setUser(updatedUser);
        setIsAuthenticated(true);
        localStorage.setItem('userData', JSON.stringify(updatedUser));
        window.dispatchEvent(new CustomEvent('user-updated', {
            detail: updatedUser
        }));
    };
    return {
        user,
        isAuthenticated,
        isLoading,
        login,
        logout,
        updateUser
    };
}
_s(useAuthentication, "sKF+i+wBzwhL3X5SwimTG3qsUic=", false, function() {
    return [
        __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$navigation$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRouter"]
    ];
});
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_refresh__.registerExports(module, globalThis.$RefreshHelpers$);
}
}}),
"[project]/app/auth/log-in/form.tsx [app-client] (ecmascript)": ((__turbopack_context__) => {
"use strict";

var { r: __turbopack_require__, f: __turbopack_module_context__, i: __turbopack_import__, s: __turbopack_esm__, v: __turbopack_export_value__, n: __turbopack_export_namespace__, c: __turbopack_cache__, M: __turbopack_modules__, l: __turbopack_load__, j: __turbopack_dynamic__, P: __turbopack_resolve_absolute_path__, U: __turbopack_relative_url__, R: __turbopack_resolve_module_id_path__, b: __turbopack_worker_blob_url__, g: global, __dirname, k: __turbopack_refresh__, m: module, z: require } = __turbopack_context__;
{
__turbopack_esm__({
    "LogInForm": (()=>LogInForm)
});
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_import__("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$hookform$2f$resolvers$2f$zod$2f$dist$2f$zod$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_import__("[project]/node_modules/@hookform/resolvers/zod/dist/zod.mjs [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$navigation$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_import__("[project]/node_modules/next/navigation.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$sonner$2f$dist$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_import__("[project]/node_modules/sonner/dist/index.mjs [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$actions$2f$log$2d$in$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_import__("[project]/actions/log-in.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$schemas$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_import__("[project]/lib/schemas.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$field$2d$error$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_import__("[project]/components/field-error.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$hooks$2f$useAuthentification$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_import__("[project]/hooks/useAuthentification.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2d$hook$2d$form$2f$dist$2f$index$2e$esm$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_import__("[project]/node_modules/react-hook-form/dist/index.esm.mjs [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$tanstack$2f$react$2d$query$2f$build$2f$modern$2f$useMutation$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_import__("[project]/node_modules/@tanstack/react-query/build/modern/useMutation.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2d$spinners$2f$esm$2f$HashLoader$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__HashLoader$3e$__ = __turbopack_import__("[project]/node_modules/react-spinners/esm/HashLoader.js [app-client] (ecmascript) <export default as HashLoader>");
;
var _s = __turbopack_refresh__.signature();
'use client';
;
;
;
;
;
;
;
;
;
;
const LogInForm = ()=>{
    _s();
    const { login } = (0, __TURBOPACK__imported__module__$5b$project$5d2f$hooks$2f$useAuthentification$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useAuthentication"])();
    const router = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$navigation$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRouter"])();
    const { register, handleSubmit, formState: { errors } } = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2d$hook$2d$form$2f$dist$2f$index$2e$esm$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useForm"])({
        resolver: (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$hookform$2f$resolvers$2f$zod$2f$dist$2f$zod$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["zodResolver"])(__TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$schemas$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["logInSchema"])
    });
    const { mutate, isPending: isSubmitting } = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$tanstack$2f$react$2d$query$2f$build$2f$modern$2f$useMutation$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useMutation"])({
        mutationFn: {
            "LogInForm.useMutation": async (values)=>{
                // Add artificial delay
                await new Promise({
                    "LogInForm.useMutation": (resolve)=>setTimeout(resolve, 1000)
                }["LogInForm.useMutation"]);
                const response = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$actions$2f$log$2d$in$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["logIn"])(values);
                if ('error' in response) {
                    throw new Error(response.error);
                }
                return response;
            }
        }["LogInForm.useMutation"],
        onSuccess: {
            "LogInForm.useMutation": async (response)=>{
                if ('token' in response) {
                    // Pass both tokens and user data to the login function
                    await login({
                        token: response.token,
                        refreshToken: response.refreshToken,
                        user: response.user
                    });
                    __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$sonner$2f$dist$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["toast"].success('Logged in successfully');
                    router.push('/');
                }
            }
        }["LogInForm.useMutation"],
        onError: {
            "LogInForm.useMutation": (error)=>{
                __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$sonner$2f$dist$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["toast"].error(error.message);
            }
        }["LogInForm.useMutation"]
    });
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("form", {
        onSubmit: handleSubmit((values)=>mutate(values)),
        className: "flex w-full max-w-md flex-col gap-4",
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                ...register('username'),
                type: "text",
                placeholder: "username",
                className: "input",
                disabled: isSubmitting
            }, void 0, false, {
                fileName: "[project]/app/auth/log-in/form.tsx",
                lineNumber: 70,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$field$2d$error$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["FieldError"], {
                error: errors.username
            }, void 0, false, {
                fileName: "[project]/app/auth/log-in/form.tsx",
                lineNumber: 77,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                ...register('password'),
                type: "password",
                placeholder: "password",
                className: "input",
                disabled: isSubmitting
            }, void 0, false, {
                fileName: "[project]/app/auth/log-in/form.tsx",
                lineNumber: 78,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$field$2d$error$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["FieldError"], {
                error: errors.password
            }, void 0, false, {
                fileName: "[project]/app/auth/log-in/form.tsx",
                lineNumber: 85,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                type: "submit",
                className: "inline-flex items-center justify-center rounded-full bg-indigo-600 px-4 py-2 text-sm font-semibold text-white transition duration-300 hover:bg-indigo-700",
                disabled: isSubmitting,
                children: isSubmitting ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "flex items-center justify-center gap-2",
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2d$spinners$2f$esm$2f$HashLoader$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__HashLoader$3e$__["HashLoader"], {
                            size: 20,
                            color: "#ffffff"
                        }, void 0, false, {
                            fileName: "[project]/app/auth/log-in/form.tsx",
                            lineNumber: 93,
                            columnNumber: 13
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                            children: "Logging in..."
                        }, void 0, false, {
                            fileName: "[project]/app/auth/log-in/form.tsx",
                            lineNumber: 94,
                            columnNumber: 13
                        }, this)
                    ]
                }, void 0, true, {
                    fileName: "[project]/app/auth/log-in/form.tsx",
                    lineNumber: 92,
                    columnNumber: 11
                }, this) : 'Log in'
            }, void 0, false, {
                fileName: "[project]/app/auth/log-in/form.tsx",
                lineNumber: 86,
                columnNumber: 7
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/app/auth/log-in/form.tsx",
        lineNumber: 66,
        columnNumber: 5
    }, this);
};
_s(LogInForm, "f+LMTCWhSvgHE2nslp54g4dsJrk=", false, function() {
    return [
        __TURBOPACK__imported__module__$5b$project$5d2f$hooks$2f$useAuthentification$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useAuthentication"],
        __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$navigation$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRouter"],
        __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2d$hook$2d$form$2f$dist$2f$index$2e$esm$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useForm"],
        __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$tanstack$2f$react$2d$query$2f$build$2f$modern$2f$useMutation$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useMutation"]
    ];
});
_c = LogInForm;
var _c;
__turbopack_refresh__.register(_c, "LogInForm");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_refresh__.registerExports(module, globalThis.$RefreshHelpers$);
}
}}),
"[project]/app/auth/log-in/page.tsx [app-rsc] (ecmascript, Next.js server component, client modules)": ((__turbopack_context__) => {

var { r: __turbopack_require__, f: __turbopack_module_context__, i: __turbopack_import__, s: __turbopack_esm__, v: __turbopack_export_value__, n: __turbopack_export_namespace__, c: __turbopack_cache__, M: __turbopack_modules__, l: __turbopack_load__, j: __turbopack_dynamic__, P: __turbopack_resolve_absolute_path__, U: __turbopack_relative_url__, R: __turbopack_resolve_module_id_path__, b: __turbopack_worker_blob_url__, g: global, __dirname, t: require } = __turbopack_context__;
{
}}),
}]);

//# sourceMappingURL=_841570._.js.map