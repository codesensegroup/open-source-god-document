import b from"./TabsHeader.d01cb704.js";import g from"./ComponentPlaygroundProps.abe77441.js";import{_ as v}from"./ComponentPlaygroundSlots.vue.b913416b.js";import{_ as x}from"./ComponentPlaygroundTokens.vue.e7431b67.js";import{a as k}from"./index.9f150765.js";import{d as D,r as V,b as n,c as C,g as P,J as o,X as m,as as T,f as s,k as B}from"./entry.bd6ee6c6.js";import"./ProseH4.8d66bc0f.js";import"./ProseCodeInline.3338fa73.js";import"./Badge.aa181863.js";import"./slot.1f4f740d.js";import"./node.676c5e99.js";import"./ProseP.77e1f79f.js";const I={class:"component-playground-data"},j=D({__name:"ComponentPlaygroundData",props:{modelValue:{type:Object,required:!1,default:()=>({})},componentData:{type:Object,required:!1,default:()=>({})}},emits:["update:modelValue"],setup(t,{emit:p}){const a=k(t,"modelValue",p),e=V(0),r=[{label:"Props"},{label:"Slots"},{label:"Design Tokens"}],d=c=>e.value=c;return(c,l)=>{const u=b,_=g,i=v,f=x;return n(),C("div",I,[P(u,{"active-tab-index":o(e),tabs:r,"onUpdate:activeTabIndex":d},null,8,["active-tab-index"]),o(e)===0?(n(),m(_,{key:0,modelValue:o(a),"onUpdate:modelValue":l[0]||(l[0]=y=>T(a)?a.value=y:null),"component-data":t.componentData},null,8,["modelValue","component-data"])):s("",!0),o(e)===1?(n(),m(i,{key:1,"component-data":t.componentData},null,8,["component-data"])):s("",!0),o(e)===2?(n(),m(f,{key:2,"component-data":t.componentData},null,8,["component-data"])):s("",!0)])}}});const z=B(j,[["__scopeId","data-v-ff75821c"]]);export{z as default};