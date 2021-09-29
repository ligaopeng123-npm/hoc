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
### Prefetch 路由预加载 将传入路由文件 预先加载

```typescript
Prefetch(routers: Array<Router>);
```