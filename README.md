### DynamicLoadScript

```tsx
<DynamicLoadScript url={['/js/**.js']} onLoad={()=> {}}/>
```

### RouteWithModuleRoutes  动态匹配路由 模块统一放在pages目录下

```tsx
<RouteWithModuleRoutes routers={[]} onRouteChange={(router: RouteProps)=> {}} />
```

### RouteWithSubRoutes  拼接switch中的路由

```tsx
<RouteWithModuleRoutes router={[]} />
```
