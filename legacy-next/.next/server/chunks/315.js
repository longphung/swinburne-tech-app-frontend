exports.id=315,exports.ids=[315],exports.modules={77031:(e,t,n)=>{Promise.resolve().then(n.bind(n,35600)),Promise.resolve().then(n.bind(n,39103)),Promise.resolve().then(n.bind(n,65631))},35600:(e,t,n)=>{"use strict";n.d(t,{default:()=>C});var a=n(10326),o=n(91367),r=n(45353),i=n(17577),s=n(54641);let d=n(54214).Z;var l=n(18782),c=n(91703),u=n(54117),g=n(37070),p=n(39930),h=n(98139),m=n(18752),f=n(36004);function I(e){return(0,f.ZP)("MuiLoadingButton",e)}let x=(0,n(44647).Z)("MuiLoadingButton",["root","loading","loadingIndicator","loadingIndicatorCenter","loadingIndicatorStart","loadingIndicatorEnd","endIconLoadingEnd","startIconLoadingStart"]),v=["children","disabled","id","loading","loadingIndicator","loadingPosition","variant"],P=e=>{let{loading:t,loadingPosition:n,classes:a}=e,o={root:["root",t&&"loading"],startIcon:[t&&`startIconLoading${(0,s.Z)(n)}`],endIcon:[t&&`endIconLoading${(0,s.Z)(n)}`],loadingIndicator:["loadingIndicator",t&&`loadingIndicator${(0,s.Z)(n)}`]},i=(0,l.Z)(o,I,a);return(0,r.Z)({},a,i)},Z=e=>"ownerState"!==e&&"theme"!==e&&"sx"!==e&&"as"!==e&&"classes"!==e,b=(0,c.ZP)(g.Z,{shouldForwardProp:e=>Z(e)||"classes"===e,name:"MuiLoadingButton",slot:"Root",overridesResolver:(e,t)=>[t.root,t.startIconLoadingStart&&{[`& .${x.startIconLoadingStart}`]:t.startIconLoadingStart},t.endIconLoadingEnd&&{[`& .${x.endIconLoadingEnd}`]:t.endIconLoadingEnd}]})(({ownerState:e,theme:t})=>(0,r.Z)({[`& .${x.startIconLoadingStart}, & .${x.endIconLoadingEnd}`]:{transition:t.transitions.create(["opacity"],{duration:t.transitions.duration.short}),opacity:0}},"center"===e.loadingPosition&&{transition:t.transitions.create(["background-color","box-shadow","border-color"],{duration:t.transitions.duration.short}),[`&.${x.loading}`]:{color:"transparent"}},"start"===e.loadingPosition&&e.fullWidth&&{[`& .${x.startIconLoadingStart}, & .${x.endIconLoadingEnd}`]:{transition:t.transitions.create(["opacity"],{duration:t.transitions.duration.short}),opacity:0,marginRight:-8}},"end"===e.loadingPosition&&e.fullWidth&&{[`& .${x.startIconLoadingStart}, & .${x.endIconLoadingEnd}`]:{transition:t.transitions.create(["opacity"],{duration:t.transitions.duration.short}),opacity:0,marginLeft:-8}})),w=(0,c.ZP)("span",{name:"MuiLoadingButton",slot:"LoadingIndicator",overridesResolver:(e,t)=>{let{ownerState:n}=e;return[t.loadingIndicator,t[`loadingIndicator${(0,s.Z)(n.loadingPosition)}`]]}})(({theme:e,ownerState:t})=>(0,r.Z)({position:"absolute",visibility:"visible",display:"flex"},"start"===t.loadingPosition&&("outlined"===t.variant||"contained"===t.variant)&&{left:"small"===t.size?10:14},"start"===t.loadingPosition&&"text"===t.variant&&{left:6},"center"===t.loadingPosition&&{left:"50%",transform:"translate(-50%)",color:(e.vars||e).palette.action.disabled},"end"===t.loadingPosition&&("outlined"===t.variant||"contained"===t.variant)&&{right:"small"===t.size?10:14},"end"===t.loadingPosition&&"text"===t.variant&&{right:6},"start"===t.loadingPosition&&t.fullWidth&&{position:"relative",left:-10},"end"===t.loadingPosition&&t.fullWidth&&{position:"relative",right:-10})),y=i.forwardRef(function(e,t){let n=i.useContext(p.Z),s=(0,m.Z)(n,e),l=(0,u.Z)({props:s,name:"MuiLoadingButton"}),{children:c,disabled:g=!1,id:f,loading:I=!1,loadingIndicator:x,loadingPosition:Z="center",variant:y="text"}=l,L=(0,o.Z)(l,v),j=d(f),S=null!=x?x:(0,a.jsx)(h.Z,{"aria-labelledby":j,color:"inherit",size:16}),$=(0,r.Z)({},l,{disabled:g,loading:I,loadingIndicator:S,loadingPosition:Z,variant:y}),T=P($),k=I?(0,a.jsx)(w,{className:T.loadingIndicator,ownerState:$,children:S}):null;return(0,a.jsxs)(b,(0,r.Z)({disabled:g||I,id:j,ref:t},L,{variant:y,classes:T,ownerState:$,children:["end"===$.loadingPosition?c:k,"end"===$.loadingPosition?k:c]}))});var L=n(60893),j=n(17082),S=n(30274),$=n(52188),T=n(90434),k=n(26379),E=n(74723),B=n(49085);let M=({name:e,control:t,label:n,type:o,rules:r,...i})=>a.jsx(E.Qr,{name:e,control:t,rules:r,render:({field:{onChange:e,value:t},fieldState:{error:r},formState:s})=>a.jsx(B.Z,{helperText:r?r.message:null,error:!!r,onChange:e,value:t,fullWidth:!0,label:n,type:o,...i})});var z=n(67876);let C=e=>{let{mutateAsync:t}=(0,z.f0)(),{control:n,handleSubmit:o,setError:r,formState:{isSubmitting:i}}=(0,k.cI)({defaultValues:{username:"",password:""}}),s=async n=>{let a=await t({username:n.username,password:n.password,role:e.role});if(a.success){e.onLogin&&e.onLogin(a.data);return}r("username",{type:"manual",message:a.error.message}),r("password",{type:"manual",message:a.error.message})};return a.jsx(L.Z,{elevation:3,component:"form",onSubmit:o(s),children:(0,a.jsxs)(j.Z,{sx:{padding:"1rem"},spacing:4,children:[a.jsx(S.Z,{variant:"h4",sx:{fontWeight:"bold",textAlign:"center"},children:e.title}),a.jsx(M,{name:"username",control:n,label:"Username",rules:{required:"Please enter your username."}}),a.jsx(M,{name:"password",control:n,label:"Password",rules:{required:"Please enter your password."},type:"password"}),a.jsx($.Z,{component:T.default,href:"/forgot",children:"Forgot password?"}),a.jsx(y,{loading:i,variant:"contained",type:"submit",children:"Login"}),(0,a.jsxs)(j.Z,{direction:"row",sx:{justifyContent:"space-between"},children:[a.jsx(S.Z,{children:"Don't have an account?"}),a.jsx($.Z,{component:T.default,href:"/register",children:"Sign up"})]})]})})}},39103:(e,t,n)=>{"use strict";n.d(t,{default:()=>a.Z});var a=n(71728)},65631:(e,t,n)=>{"use strict";n.d(t,{default:()=>a.Z});var a=n(75616)},68754:(e,t,n)=>{"use strict";n.d(t,{ZP:()=>s});var a=n(68570);let o=(0,a.createProxy)(String.raw`/Users/phung/IdeaProjects/swinburne/technology-application/swinburne-tech-app-frontend/components/Login.jsx`),{__esModule:r,$$typeof:i}=o;o.default;let s=(0,a.createProxy)(String.raw`/Users/phung/IdeaProjects/swinburne/technology-application/swinburne-tech-app-frontend/components/Login.jsx#default`)},87094:(e,t,n)=>{let{createProxy:a}=n(68570);e.exports=a("/Users/phung/IdeaProjects/swinburne/technology-application/swinburne-tech-app-frontend/node_modules/@mui/material/Box/index.js")},73622:(e,t,n)=>{let{createProxy:a}=n(68570);e.exports=a("/Users/phung/IdeaProjects/swinburne/technology-application/swinburne-tech-app-frontend/node_modules/@mui/material/Container/index.js")},9340:(e,t,n)=>{"use strict";n.d(t,{G:()=>s});let a=n(80050).Z.create({baseURL:"/api"}),o=!1,r=[];a.interceptors.request.use(e=>{let t=localStorage.getItem("accessToken");return t&&(e.headers.Authorization=`Bearer ${t}`),e}),a.interceptors.response.use(null,async e=>{if(401!==e.status)return Promise.reject(e);let t=localStorage.getItem("refreshToken");if(!t)return Promise.reject(e);if(o)return new Promise((t,n)=>r.push(()=>({resolve:t,reject:n,config:a(e.config)})));o=!0;let n=await i(t);return n.success?(localStorage.setItem("idToken",n.data.idToken),localStorage.setItem("accessToken",n.data.accessToken),localStorage.setItem("refreshToken",n.data.refreshToken),e.config.headers.Authorization=`Bearer ${n.data.accessToken}`,r.forEach(({resolve:e,reject:t,config:o})=>{o.headers.Authorization=`Bearer ${n.data.accessToken}`,a.request(o).then(e).catch(t)}),r.length=0,o=!1,a(e.config)):(o=!1,Promise.reject(e))});let i=async e=>{try{let t=await a.post("/auth/token",{refreshToken:e});return{success:!0,data:t.data}}catch(e){return{success:!1,message:e.response.data.message}}};n(70591);let s={ADMIN:"admin",TECHNICIAN:"technician",CUSTOMER:"customer"}},53226:(e,t,n)=>{"use strict";n.r(t),n.d(t,{default:()=>o});var a=n(66621);let o=e=>[{type:"image/png",sizes:"180x180",url:(0,a.fillMetadataSegment)(".",e.params,"apple-icon.png")+"?af6927dbc34a5314"}]},57481:(e,t,n)=>{"use strict";n.r(t),n.d(t,{default:()=>o});var a=n(66621);let o=e=>[{type:"image/x-icon",sizes:"16x16",url:(0,a.fillMetadataSegment)(".",e.params,"favicon.ico")+""}]}};