import{r as p}from"./pkgroll_create-require-b51119f6.js";import e from"repl";import{transform as u}from"@esbuild-kit/core-utils";export*from"@esbuild-kit/esm-loader";import"module";function m(r){const{eval:o}=r,a=async function(s,n,t,c){const l=await u(s,t,{loader:"ts",tsconfigRaw:{compilerOptions:{preserveValueImports:!0}},define:{require:"global.require"}}).catch(i=>(console.log(i.message),{code:`
`}));return o.call(this,l.code,n,t,c)};r.eval=a}const{start:f}=e;e.start=function(){const r=Reflect.apply(f,this,arguments);return m(r),r},p("@esbuild-kit/cjs-loader");
