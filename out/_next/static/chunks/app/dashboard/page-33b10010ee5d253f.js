(self.webpackChunk_N_E=self.webpackChunk_N_E||[]).push([[702],{24654:function(){},38823:function(e,s,r){Promise.resolve().then(r.bind(r,88895))},88895:function(e,s,r){"use strict";var t=r(57437),a=r(80511),o=r(33627),n=r(98393);s.default=()=>(0,t.jsx)(o.CanAccess,{resource:n.G.CUSTOMER,children:(0,t.jsx)(a.Z,{children:"Dashboard Page"})})},98393:function(e,s,r){"use strict";r.d(s,{G:function(){return m},Z:function(){return d}});let t=r(42126).Z.create({baseURL:"/api"}),a=!1,o=[];t.interceptors.request.use(e=>{let s=localStorage.getItem("accessToken");return s&&(e.headers.Authorization="Bearer ".concat(s)),e}),t.interceptors.response.use(null,async e=>{if(401!==e.status)return Promise.reject(e);let s=localStorage.getItem("refreshToken");if(!s)return Promise.reject(e);if(a)return new Promise((s,r)=>o.push(()=>({resolve:s,reject:r,config:t(e.config)})));a=!0;let r=await c(s);return r.success?(localStorage.setItem("idToken",r.data.idToken),localStorage.setItem("accessToken",r.data.accessToken),localStorage.setItem("refreshToken",r.data.refreshToken),e.config.headers.Authorization="Bearer ".concat(r.data.accessToken),o.forEach(e=>{let{resolve:s,reject:a,config:o}=e;o.headers.Authorization="Bearer ".concat(r.data.accessToken),t.request(o).then(s).catch(a)}),o.length=0,a=!1,t(e.config)):(a=!1,Promise.reject(e))});let n=async e=>{let{username:s,password:r}=e;try{let e=await t.post("/auth/login/password",{username:s,password:r});return{success:!0,data:e.data}}catch(e){if(401===e.response.status)return{success:!1,message:"Invalid username or password"};return{success:!1,message:e.response.data.message}}},c=async e=>{try{let s=await t.post("/auth/token",{refreshToken:e});return{success:!0,data:s.data}}catch(e){return{success:!1,message:e.response.data.message}}},l=async e=>{try{return await t.put("/auth/token",{refreshToken:e}),{success:!0}}catch(e){return{success:!1,message:e.response.data.message}}},i=async e=>(await t.post("/auth/signup",e)).data;var u=r(49714);let m={ADMIN:"admin",TECHNICIAN:"technician",CUSTOMER:"customer"};var d={login:async e=>{let s=await n({username:e.username,password:e.password});if(!s.success)return{success:!1,error:{name:"Login Error",message:s.message}};let{userData:r}=(0,u.o)(s.data.idToken);return r.role.includes(e.role)||r.role.includes(m.ADMIN)?(localStorage.setItem("idToken",s.data.idToken),localStorage.setItem("accessToken",s.data.accessToken),localStorage.setItem("refreshToken",s.data.refreshToken),{success:!0,error:null,successNotification:{message:"Login successful. Welcome ".concat(r.username,"!")}}):{success:!1,error:{name:"Login Error",message:"You are not a ".concat(e.role)}}},check:async()=>{let e=localStorage.getItem("idToken"),s=localStorage.getItem("accessToken"),r=localStorage.getItem("refreshToken");return e&&s&&r?{authenticated:!0,error:null}:{authenticated:!1,error:{message:"Not logged in",name:"Not logged in"}}},logout:async()=>(await l(localStorage.getItem("refreshToken")),localStorage.removeItem("idToken"),localStorage.removeItem("accessToken"),localStorage.removeItem("refreshToken"),{success:!0,error:null,redirectTo:"/",successNotification:{message:"Logout successful"}}),onError:e=>{console.error(e)},register:async e=>{try{let s=await i(e);return console.log("userId",s),{success:!0,error:null,successNotification:{message:"Confirmation email sent",description:"Please confirm your email to login."}}}catch(e){return{success:!1,error:{name:"Register Error",message:e.message}}}},getIdentity:()=>{let e=localStorage.getItem("idToken");if(!e)return{id:null,fullName:null,email:null,emailVerified:null,phone:null,address:null,role:null};let{userData:s}=(0,u.o)(e);return{id:s._id,username:s.username,email:s.email,emailVerified:s.emailVerified,phone:s.phone,address:s.address,role:s.role}}}}},function(e){e.O(0,[999,303,511,7,971,23,744],function(){return e(e.s=38823)}),_N_E=e.O()}]);