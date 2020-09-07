(this["webpackJsonparound-react"]=this["webpackJsonparound-react"]||[]).push([[0],{10:function(e,t,a){e.exports=a(16)},15:function(e,t,a){},16:function(e,t,a){"use strict";a.r(t);var n=a(0),o=a.n(n),r=a(5),c=a.n(r),i=(a(15),a(9)),l=a(1),s=a(6),u=a.n(s);var m=function(){return o.a.createElement("header",{className:"header"},o.a.createElement("img",{src:u.a,alt:"logo",className:"header__logo"}))},p=Object(n.createContext)();var d=function(e){var t=o.a.useContext(p),a=e.card,n=a.owner._id===t._id,r=a.likes.some((function(e){return e._id===t._id}))?"card__like card__like_active":"card__like";return o.a.createElement("li",{className:"card"},n?o.a.createElement("button",{type:"button",className:"button card__del",onClick:function(){e.onCardDelete(a)}}):"",o.a.createElement("div",{className:"card__img",style:{backgroundImage:"url(".concat(a.link,")")},onClick:function(){e.onCardClick(a)}}),o.a.createElement("div",{className:"card__description-wrapper"},o.a.createElement("h2",{className:"card__title"},a.name),o.a.createElement("div",{className:"card__likes-container"},o.a.createElement("button",{className:"".concat(r," button "),onClick:function(){e.onCardLike(a)}}),o.a.createElement("p",{className:"card__likes"},a.likes.length))))};var f=function(e){var t=o.a.useContext(p);return o.a.createElement("main",null,o.a.createElement("section",{className:"profile page__section"},o.a.createElement("div",{className:"media"},o.a.createElement("div",{className:"media__image-container"},o.a.createElement("img",{alt:"profile",className:"media__image",src:t.avatar}),o.a.createElement("button",{onClick:e.onEditAvatar,className:"media__btn media__btn_size_lg media__btn_hoverable",type:"button"})),o.a.createElement("div",{className:"media__body"},o.a.createElement("div",{className:"media__item"},o.a.createElement("h1",{className:"media__name"},t.name),o.a.createElement("button",{onClick:e.onEditProfile,className:"media__btn media__btn_size_sm button",type:"button"})),o.a.createElement("p",{className:"media__job"},t.about))),o.a.createElement("button",{onClick:e.onAddPlace,className:"profile__btn button",type:"button"})),o.a.createElement("ul",{className:"gallery page__section"},e.cards.map((function(t,a){return o.a.createElement(d,{key:a,card:t,onCardDelete:e.onCardDelete,onCardClick:e.onCardClick,onCardLike:e.onCardLike})}))))};var _=function(){return o.a.createElement("footer",{className:"footer page__section"},o.a.createElement("p",{className:"footer__copyright"},"\xa9 2020 Around The U.S."))};var b=function(e){return o.a.createElement("div",{className:"popup popup_background_light js-popup-".concat(e.name," ").concat(e.isOpen?"popup_role_show":"popup_role_fade-out"),onClick:function(t){t.target.classList.contains("popup_role_show")&&e.onClose()}},o.a.createElement("div",{className:"popup__container popup__container_type_form"},o.a.createElement("button",{className:"popup__btn-close button",type:"button",onClick:e.onClose}),o.a.createElement("form",{className:"form",action:"#",noValidate:!0,name:e.name,onSubmit:e.onSubmit},o.a.createElement("h2",{className:"form__title"},e.title),e.children,o.a.createElement("button",{className:"form__submit-btn",type:"submit","data-text":"Save"},e.buttonText))))};var v=function(e){var t=Object(n.useState)(""),a=Object(l.a)(t,2),r=a[0],c=a[1],i=Object(n.useState)(""),s=Object(l.a)(i,2),u=s[0],m=s[1],d=Object(n.useContext)(p);function f(e){var t=e.target,a=t.name,n=t.value;switch(a){case"name":c(n);break;case"about":m(n)}}return Object(n.useEffect)((function(){d.name&&c(d.name),d.about&&m(d.about)}),[d]),o.a.createElement(b,{name:"profile",title:"Edit profile",buttonText:"Save",isOpen:e.isOpen,onClose:e.onClose,onSubmit:function(t){t.preventDefault(),e.onUpdateUser({name:r,about:u})}},o.a.createElement("input",{required:!0,pattern:"[a-zA-Z\\s\\-]+",type:"text",value:r,className:"form__input js-input-name",name:"name",placeholder:"Name",onChange:f,minLength:"2",maxLength:"40"}),o.a.createElement("input",{required:!0,type:"text",value:u,className:"form__input js-input-job",name:"about",placeholder:"About me",onChange:f,minLength:"2",maxLength:"200"}))};var h=function(e){var t=Object(n.useRef)(null);return o.a.createElement(b,{name:"change-avatar",title:"Change profile picture",buttonText:"Save",isOpen:e.isOpen,onClose:e.onClose,onSubmit:function(a){a.preventDefault(),e.onUpdateAvatar({avatar:t.current.value})}},o.a.createElement("input",{type:"url",className:"form__input js-input-link",name:"avatar",placeholder:"Url",ref:t,required:!0}))};var E=function(e){var t=Object(n.useRef)(null),a=Object(n.useRef)(null);return o.a.createElement(b,{name:"photo-form",title:"New Place",buttonText:"Create",isOpen:e.isOpen,onClose:e.onClose,onSubmit:function(n){n.preventDefault(),e.onAddPlace({name:a.current.value,link:t.current.value})}},o.a.createElement("input",{type:"text",ref:a,className:"form__input js-input-title",name:"name",placeholder:"Title",minLength:"1",maxLength:"30",required:!0}),o.a.createElement("input",{ref:t,type:"url",className:"form__input js-input-link",name:"link",placeholder:"Image link",required:!0}))};var k=function(e){var t=e.card;return o.a.createElement("div",{className:"popup popup_background_dark js-popup-picture ".concat(e.isOpen?"popup_role_show":"popup_role_fade-out"),onClick:function(t){t.target.classList.contains("popup_role_show")&&e.onClose()}},o.a.createElement("div",{className:"popup__container popup__container_type_picture"},o.a.createElement("button",{className:"popup__btn-close button",type:"button",onClick:e.onClose}),o.a.createElement("img",{className:"popup__image",src:t.link,alt:t.name}),o.a.createElement("h2",{className:"popup__title"},t.name)))},g=a(7),C=a(8),N=new(function(){function e(t){Object(g.a)(this,e),this.options=t}return Object(C.a)(e,[{key:"getInitialCards",value:function(){return this.request("/cards")}},{key:"getUserInfo",value:function(){return this.request("/users/me")}},{key:"getAppInfo",value:function(){return Promise.all([this.getInitialCards(),this.getUserInfo()])}},{key:"addLike",value:function(e){return this.request("/cards/likes/".concat(e),"PUT")}},{key:"removeLike",value:function(e){return this.request("/cards/likes/".concat(e),"DELETE")}},{key:"delCard",value:function(e){return this.request("/cards/".concat(e),"DELETE")}},{key:"updateUserInfo",value:function(e){return this.request("/users/me","PATCH",JSON.stringify({name:e.name,about:e.about}))}},{key:"updateAvatar",value:function(e){return this.request("/users/me/avatar","PATCH",JSON.stringify({avatar:e.avatar}))}},{key:"postNewCard",value:function(e){return this.request("/cards/","POST",JSON.stringify({name:e.name,link:e.link}))}},{key:"request",value:function(e,t,a){return fetch("".concat(this.options.baseUrl).concat(e),{headers:this.options.headers,method:t,body:a}).then((function(e){return e.ok?e.json():Promise.reject("Error: ".concat(e.status))}))}}]),e}())({baseUrl:"https://around.nomoreparties.co/v1/group-2",headers:{authorization:"2ea24103-3839-4671-8e47-57675e6fba9c","Content-Type":"application/json"}});var O=function(){var e=Object(n.useState)(!1),t=Object(l.a)(e,2),a=t[0],r=t[1],c=Object(n.useState)(!1),s=Object(l.a)(c,2),u=s[0],d=s[1],b=Object(n.useState)(!1),g=Object(l.a)(b,2),C=g[0],O=g[1],j=Object(n.useState)(!1),y=Object(l.a)(j,2),S=y[0],w=y[1],L=Object(n.useState)(0),x=Object(l.a)(L,2),A=x[0],U=x[1],q=Object(n.useState)({}),P=Object(l.a)(q,2),T=P[0],I=P[1],D=Object(n.useState)([]),J=Object(l.a)(D,2),z=J[0],R=J[1];function B(e,t){var a=z.map((function(a){return a._id===e?t:a}));R(a)}function H(){O(!1),r(!1),d(!1),w(!1),U(0)}function W(e){"Escape"===e.key&&H()}return Object(n.useEffect)((function(){N.getUserInfo().then((function(e){I(e)})).catch(console.log)}),[]),Object(n.useEffect)((function(){N.getInitialCards().then((function(e){R(e)})).catch(console.log)}),[]),Object(n.useEffect)((function(){return document.addEventListener("keydown",W),function(){document.removeEventListener("keydown",W)}})),o.a.createElement(o.a.Fragment,null,o.a.createElement(m,null),o.a.createElement(p.Provider,{value:T},o.a.createElement(f,{onEditProfile:function(){r(!0)},onAddPlace:function(){d(!0)},onEditAvatar:function(){O(!0)},onCardClick:function(e){U(e),w(!0)},cards:z,onCardDelete:function(e){N.delCard(e._id).then((function(t){var a=z.filter((function(t){return t._id!==e._id}));R(a)}))},onCardLike:function(e){e.likes.some((function(e){return e._id===T._id}))?N.removeLike(e._id).then((function(t){B(e._id,t)})):N.addLike(e._id).then((function(t){B(e._id,t)}))}}),o.a.createElement(_,null),o.a.createElement(v,{isOpen:a,onClose:H,onUpdateUser:function(e){N.updateUserInfo(e).then((function(e){I(e)})).catch(console.log),H()}}),o.a.createElement(E,{isOpen:u,onClose:H,onAddPlace:function(e){N.postNewCard(e).then((function(e){R([e].concat(Object(i.a)(z)))})).catch(console.log),console.log(z),H()}}),o.a.createElement(h,{isOpen:C,onClose:H,onUpdateAvatar:function(e){N.updateAvatar(e).then((function(e){I(e)})).catch(console.log),H()}}),o.a.createElement(k,{isOpen:S,onClose:H,card:A})))};Boolean("localhost"===window.location.hostname||"[::1]"===window.location.hostname||window.location.hostname.match(/^127(?:\.(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)){3}$/));c.a.render(o.a.createElement(o.a.StrictMode,null,o.a.createElement(O,null)),document.getElementById("root")),"serviceWorker"in navigator&&navigator.serviceWorker.ready.then((function(e){e.unregister()})).catch((function(e){console.error(e.message)}))},6:function(e,t,a){e.exports=a.p+"static/media/logo.8f7611ae.svg"}},[[10,1,2]]]);
//# sourceMappingURL=main.d226aa7f.chunk.js.map