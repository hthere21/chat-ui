import { init } from '../serverless.js';

export const handler = init((() => {
function __memo(fn) {
	let value;
	return () => value ??= (value = fn());
}

return {
	appDir: "_app",
	appPath: "_app",
	assets: new Set(["chatui/apple-touch-icon.png","chatui/favicon.ico","chatui/favicon.svg","chatui/icon-128x128.png","chatui/icon-256x256.png","chatui/icon-512x512.png","chatui/icon.svg","chatui/logo.svg","chatui/manifest.json","fonts/Inter-Black.ttf","fonts/Inter-Bold.ttf","fonts/Inter-ExtraBold.ttf","fonts/Inter-ExtraLight.ttf","fonts/Inter-Light.ttf","fonts/Inter-Medium.ttf","fonts/Inter-Regular.ttf","fonts/Inter-SemiBold.ttf","fonts/Inter-Thin.ttf","huggingchat/apple-touch-icon.png","huggingchat/assistants-thumbnail.png","huggingchat/favicon.ico","huggingchat/favicon.svg","huggingchat/icon-128x128.png","huggingchat/icon-256x256.png","huggingchat/icon-512x512.png","huggingchat/icon.svg","huggingchat/logo.svg","huggingchat/manifest.json","huggingchat/thumbnail.png"]),
	mimeTypes: {".png":"image/png",".svg":"image/svg+xml",".json":"application/json",".ttf":"font/ttf"},
	_: {
		client: {"start":"_app/immutable/entry/start.674c654b.js","app":"_app/immutable/entry/app.c15f7363.js","imports":["_app/immutable/entry/start.674c654b.js","_app/immutable/chunks/scheduler.6a9d17f6.js","_app/immutable/chunks/singletons.58259e5f.js","_app/immutable/chunks/parse.bee59afc.js","_app/immutable/chunks/control.f5b05b5f.js","_app/immutable/entry/app.c15f7363.js","_app/immutable/chunks/preload-helper.a4192956.js","_app/immutable/chunks/scheduler.6a9d17f6.js","_app/immutable/chunks/index.f8ec6462.js"],"stylesheets":[],"fonts":[]},
		nodes: [
			__memo(() => import('../server/nodes/0.js')),
			__memo(() => import('../server/nodes/1.js')),
			__memo(() => import('../server/nodes/13.js'))
		],
		routes: [
			{
				id: "/r/[id]",
				pattern: /^\/r\/([^/]+?)\/?$/,
				params: [{"name":"id","optional":false,"rest":false,"chained":false}],
				page: { layouts: [0,], errors: [1,], leaf: 2 },
				endpoint: null
			}
		],
		matchers: async () => {
			
			return {  };
		}
	}
}
})());
