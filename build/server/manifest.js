const manifest = (() => {
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
		client: {"start":"_app/immutable/entry/start.141480fb.js","app":"_app/immutable/entry/app.bfda97dd.js","imports":["_app/immutable/entry/start.141480fb.js","_app/immutable/chunks/scheduler.6a9d17f6.js","_app/immutable/chunks/singletons.7e5ab6ef.js","_app/immutable/chunks/parse.bee59afc.js","_app/immutable/chunks/control.f5b05b5f.js","_app/immutable/entry/app.bfda97dd.js","_app/immutable/chunks/preload-helper.a4192956.js","_app/immutable/chunks/scheduler.6a9d17f6.js","_app/immutable/chunks/index.f8ec6462.js"],"stylesheets":[],"fonts":[]},
		nodes: [
			__memo(() => import('./chunks/0-e3a1839e.js')),
			__memo(() => import('./chunks/1-bc8f4e55.js')),
			__memo(() => import('./chunks/2-a0f5f389.js')),
			__memo(() => import('./chunks/3-8c30889b.js')),
			__memo(() => import('./chunks/4-fcdd61eb.js')),
			__memo(() => import('./chunks/5-fb4670bb.js')),
			__memo(() => import('./chunks/6-5e143495.js')),
			__memo(() => import('./chunks/7-3bcf3e64.js')),
			__memo(() => import('./chunks/8-38065971.js')),
			__memo(() => import('./chunks/9-6e6a4f61.js')),
			__memo(() => import('./chunks/10-c0d2e9f4.js')),
			__memo(() => import('./chunks/11-9369a314.js')),
			__memo(() => import('./chunks/12-4e7c7891.js')),
			__memo(() => import('./chunks/13-e38632ae.js')),
			__memo(() => import('./chunks/14-54abd9a3.js')),
			__memo(() => import('./chunks/15-deaf33f2.js')),
			__memo(() => import('./chunks/16-4da0abee.js')),
			__memo(() => import('./chunks/17-00cd5d93.js')),
			__memo(() => import('./chunks/18-ac343ac2.js'))
		],
		routes: [
			{
				id: "/",
				pattern: /^\/$/,
				params: [],
				page: { layouts: [0,], errors: [1,], leaf: 3 },
				endpoint: null
			},
			{
				id: "/admin/export",
				pattern: /^\/admin\/export\/?$/,
				params: [],
				page: null,
				endpoint: __memo(() => import('./chunks/_server.ts-27151ae7.js'))
			},
			{
				id: "/admin/stats/compute",
				pattern: /^\/admin\/stats\/compute\/?$/,
				params: [],
				page: null,
				endpoint: __memo(() => import('./chunks/_server.ts-b4f2fadb.js'))
			},
			{
				id: "/api/conversations",
				pattern: /^\/api\/conversations\/?$/,
				params: [],
				page: null,
				endpoint: __memo(() => import('./chunks/_server.ts-4b32d3ba.js'))
			},
			{
				id: "/api/conversation/[id]",
				pattern: /^\/api\/conversation\/([^/]+?)\/?$/,
				params: [{"name":"id","optional":false,"rest":false,"chained":false}],
				page: null,
				endpoint: __memo(() => import('./chunks/_server.ts-915c1ab1.js'))
			},
			{
				id: "/api/models",
				pattern: /^\/api\/models\/?$/,
				params: [],
				page: null,
				endpoint: __memo(() => import('./chunks/_server.ts-c5ded9a7.js'))
			},
			{
				id: "/api/user",
				pattern: /^\/api\/user\/?$/,
				params: [],
				page: null,
				endpoint: __memo(() => import('./chunks/_server.ts-3ef09502.js'))
			},
			{
				id: "/assistants",
				pattern: /^\/assistants\/?$/,
				params: [],
				page: { layouts: [0,], errors: [1,], leaf: 5 },
				endpoint: null
			},
			{
				id: "/assistant/[assistantId]",
				pattern: /^\/assistant\/([^/]+?)\/?$/,
				params: [{"name":"assistantId","optional":false,"rest":false,"chained":false}],
				page: { layouts: [0,], errors: [1,], leaf: 4 },
				endpoint: null
			},
			{
				id: "/assistant/[assistantId]/thumbnail.png",
				pattern: /^\/assistant\/([^/]+?)\/thumbnail\.png\/?$/,
				params: [{"name":"assistantId","optional":false,"rest":false,"chained":false}],
				page: null,
				endpoint: __memo(() => import('./chunks/_server.ts-20346014.js'))
			},
			{
				id: "/conversations",
				pattern: /^\/conversations\/?$/,
				params: [],
				page: { layouts: [0,], errors: [1,], leaf: 7 },
				endpoint: null
			},
			{
				id: "/conversation",
				pattern: /^\/conversation\/?$/,
				params: [],
				page: null,
				endpoint: __memo(() => import('./chunks/_server.ts-15641675.js'))
			},
			{
				id: "/conversation/[id]",
				pattern: /^\/conversation\/([^/]+?)\/?$/,
				params: [{"name":"id","optional":false,"rest":false,"chained":false}],
				page: { layouts: [0,], errors: [1,], leaf: 6 },
				endpoint: __memo(() => import('./chunks/_server.ts-96f7687a.js'))
			},
			{
				id: "/conversation/[id]/message/[messageId]/prompt",
				pattern: /^\/conversation\/([^/]+?)\/message\/([^/]+?)\/prompt\/?$/,
				params: [{"name":"id","optional":false,"rest":false,"chained":false},{"name":"messageId","optional":false,"rest":false,"chained":false}],
				page: null,
				endpoint: __memo(() => import('./chunks/_server.ts-2ba0f706.js'))
			},
			{
				id: "/conversation/[id]/message/[messageId]/vote",
				pattern: /^\/conversation\/([^/]+?)\/message\/([^/]+?)\/vote\/?$/,
				params: [{"name":"id","optional":false,"rest":false,"chained":false},{"name":"messageId","optional":false,"rest":false,"chained":false}],
				page: null,
				endpoint: __memo(() => import('./chunks/_server.ts-ba9a66c8.js'))
			},
			{
				id: "/conversation/[id]/output/[sha256]",
				pattern: /^\/conversation\/([^/]+?)\/output\/([^/]+?)\/?$/,
				params: [{"name":"id","optional":false,"rest":false,"chained":false},{"name":"sha256","optional":false,"rest":false,"chained":false}],
				page: null,
				endpoint: __memo(() => import('./chunks/_server.ts-6d94fa29.js'))
			},
			{
				id: "/conversation/[id]/share",
				pattern: /^\/conversation\/([^/]+?)\/share\/?$/,
				params: [{"name":"id","optional":false,"rest":false,"chained":false}],
				page: null,
				endpoint: __memo(() => import('./chunks/_server.ts-bf11e7e0.js'))
			},
			{
				id: "/conversation/[id]/stop-generating",
				pattern: /^\/conversation\/([^/]+?)\/stop-generating\/?$/,
				params: [{"name":"id","optional":false,"rest":false,"chained":false}],
				page: null,
				endpoint: __memo(() => import('./chunks/_server.ts-1548c5b3.js'))
			},
			{
				id: "/login",
				pattern: /^\/login\/?$/,
				params: [],
				page: { layouts: [0,], errors: [1,], leaf: 8 },
				endpoint: null
			},
			{
				id: "/login/callback",
				pattern: /^\/login\/callback\/?$/,
				params: [],
				page: { layouts: [0,], errors: [1,], leaf: 9 },
				endpoint: null
			},
			{
				id: "/logout",
				pattern: /^\/logout\/?$/,
				params: [],
				page: { layouts: [0,], errors: [1,], leaf: 10 },
				endpoint: null
			},
			{
				id: "/models",
				pattern: /^\/models\/?$/,
				params: [],
				page: { layouts: [0,], errors: [1,], leaf: 11 },
				endpoint: null
			},
			{
				id: "/privacy",
				pattern: /^\/privacy\/?$/,
				params: [],
				page: { layouts: [0,], errors: [1,], leaf: 12 },
				endpoint: null
			},
			{
				id: "/r/[id]",
				pattern: /^\/r\/([^/]+?)\/?$/,
				params: [{"name":"id","optional":false,"rest":false,"chained":false}],
				page: { layouts: [0,], errors: [1,], leaf: 13 },
				endpoint: null
			},
			{
				id: "/settings",
				pattern: /^\/settings\/?$/,
				params: [],
				page: { layouts: [0,2,], errors: [1,,], leaf: 14 },
				endpoint: __memo(() => import('./chunks/_server.ts-0df89f14.js'))
			},
			{
				id: "/settings/assistants/new",
				pattern: /^\/settings\/assistants\/new\/?$/,
				params: [],
				page: { layouts: [0,2,], errors: [1,,], leaf: 18 },
				endpoint: null
			},
			{
				id: "/settings/assistants/[assistantId]",
				pattern: /^\/settings\/assistants\/([^/]+?)\/?$/,
				params: [{"name":"assistantId","optional":false,"rest":false,"chained":false}],
				page: { layouts: [0,2,], errors: [1,,], leaf: 16 },
				endpoint: null
			},
			{
				id: "/settings/assistants/[assistantId]/avatar.jpg",
				pattern: /^\/settings\/assistants\/([^/]+?)\/avatar\.jpg\/?$/,
				params: [{"name":"assistantId","optional":false,"rest":false,"chained":false}],
				page: null,
				endpoint: __memo(() => import('./chunks/_server.ts-35632005.js'))
			},
			{
				id: "/settings/assistants/[assistantId]/edit",
				pattern: /^\/settings\/assistants\/([^/]+?)\/edit\/?$/,
				params: [{"name":"assistantId","optional":false,"rest":false,"chained":false}],
				page: { layouts: [0,2,], errors: [1,,], leaf: 17 },
				endpoint: null
			},
			{
				id: "/settings/[...model]",
				pattern: /^\/settings(?:\/(.*))?\/?$/,
				params: [{"name":"model","optional":false,"rest":true,"chained":true}],
				page: { layouts: [0,2,], errors: [1,,], leaf: 15 },
				endpoint: null
			}
		],
		matchers: async () => {
			
			return {  };
		}
	}
}
})();

const prerendered = new Set([]);

export { manifest, prerendered };
//# sourceMappingURL=manifest.js.map
