(()=>{"use strict";var e={baseUrl:"https://mesto.nomoreparties.co/v1/wff-cohort-7",headers:{authorization:"35c02d02-ff23-40e2-9ac1-535987aab634","Content-Type":"application/json"}};function t(e){return e.ok?e.json():Promise.reject("Ошибка: ".concat(e.status))}var n=function(n,r){return fetch("".concat(e.baseUrl,"/cards/").concat(r),{method:"DELETE",headers:e.headers}).then(t)},r=function(n){return fetch("".concat(e.baseUrl,"/cards/likes/").concat(n),{method:"PUT",headers:e.headers}).then(t)},o=function(n){return fetch("".concat(e.baseUrl,"/cards/likes/").concat(n),{method:"DELETE",headers:e.headers}).then(t)};function a(e){var t=e.target.closest(".card");n(e,e._id),t.remove()}function c(e,t){var n=e.target,a=n.nextElementSibling;n.classList.contains("card__like-button_is-active")?o(t).then((function(e){a.textContent=e.likes.length,n.classList.toggle("card__like-button_is-active")})):r(t).then((function(e){a.textContent=e.likes.length,n.classList.toggle("card__like-button_is-active")}))}function u(e){e.classList.add("popup_is-opened"),document.addEventListener("keydown",l)}function i(e){e.classList.remove("popup_is-opened"),document.removeEventListener("keydown",l)}function l(e){"Escape"===e.key&&i(document.querySelector(".popup_is-opened"))}function s(e){e.stopPropagation(),e.target.classList.contains("popup")&&i(e.target)}function d(e){i(e.target.closest(".popup"))}var p=function(e,t,n){var r=e.querySelector(".".concat(t.id,"-error"));t.classList.remove(n.inputErrorClass),r.classList.remove(n.errorClass),r.textContent=""},f=function(e,t,n){!function(e){return e.some((function(e){return!e.validity.valid}))}(e)?(t.classList.remove(n.inactiveButtonClass),t.removeAttribute("disabled")):(t.classList.add(n.inactiveButtonClass),t.setAttribute("disabled",""))},_=function(e,t){var n=Array.from(e.querySelectorAll(t.inputSelector));n.forEach((function(n){p(e,n,t)}));var r=e.querySelector(t.submitButtonSelector);f(n,r,t)};function m(e,t){(null==t||t>e.length)&&(t=e.length);for(var n=0,r=new Array(t);n<t;n++)r[n]=e[n];return r}var y={formSelector:".popup__form",inputSelector:".popup__input",submitButtonSelector:".popup__button",inactiveButtonClass:"popup__button_disabled",inputErrorClass:"popup__input_type_error",errorClass:"popup__error_visible"},v=document.querySelector(".places__list"),h=document.querySelector(".profile__edit-button"),S=document.querySelector(".profile__add-button"),b=document.querySelector(".popup_type_edit"),g=document.querySelector(".popup_type_new-card"),q=document.querySelector(".popup_type_new-card"),C=document.querySelectorAll(".popup__close"),k=document.querySelectorAll(".popup"),E=document.querySelector(".popup_type_image");S.addEventListener("click",(function(){_(O,y),u(q)})),C.forEach((function(e){e.addEventListener("click",d)})),k.forEach((function(e){e.classList.add("popup_is-animated"),e.addEventListener("click",s)}));var L=document.querySelector(".popup_type_edit"),x=L.querySelector(".popup__input_type_name"),A=L.querySelector(".popup__input_type_description"),w=document.querySelector(".profile__title"),U=document.querySelector(".profile__description"),B=document.querySelector(".profile__image"),j=L.querySelector("".concat(y.submitButtonSelector));Promise.all([fetch("".concat(e.baseUrl,"/cards"),{headers:e.headers}).then(t),fetch("".concat(e.baseUrl,"/users/me"),{headers:e.headers}).then(t)]).then((function(e){var t,n,r,o=(r=2,function(e){if(Array.isArray(e))return e}(n=e)||function(e,t){var n=null==e?null:"undefined"!=typeof Symbol&&e[Symbol.iterator]||e["@@iterator"];if(null!=n){var r,o,a,c,u=[],i=!0,l=!1;try{if(a=(n=n.call(e)).next,0===t){if(Object(n)!==n)return;i=!1}else for(;!(i=(r=a.call(n)).done)&&(u.push(r.value),u.length!==t);i=!0);}catch(e){l=!0,o=e}finally{try{if(!i&&null!=n.return&&(c=n.return(),Object(c)!==c))return}finally{if(l)throw o}}return u}}(n,r)||function(e,t){if(e){if("string"==typeof e)return m(e,t);var n=Object.prototype.toString.call(e).slice(8,-1);return"Object"===n&&e.constructor&&(n=e.constructor.name),"Map"===n||"Set"===n?Array.from(e):"Arguments"===n||/^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)?m(e,t):void 0}}(n,r)||function(){throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")}()),a=o[0],c=o[1];a.forEach((function(e){$(e,c._id)})),t=c,w.textContent=t.name,U.textContent=t.about,B.style="background-image: url('".concat(t.avatar,"')")})).catch((function(e){console.log("Ошибка: ".concat(e))})),L.addEventListener("submit",(function(n){(function(n){n.preventDefault(),j.textContent="Сохранение...";var r,o=x.value,a=A.value;w.textContent=o,U.textContent=a,(r={name:x.value,about:A.value},fetch("".concat(e.baseUrl,"/users/me"),{method:"PATCH",headers:e.headers,body:JSON.stringify({name:r.name,about:r.about})}).then(t)).then((function(e){})).catch((function(e){console.log(e)})).finally((function(){j.textContent="Сохранить"})),i(b)})(n),x.value="",A.value=""})),h.addEventListener("click",(function(){x.value=w.textContent,A.value=U.textContent,_(L,y),u(b)}));var O=document.querySelector(".popup_type_new-card"),T=O.querySelector(".popup__input_type_card-name"),P=O.querySelector(".popup__input_type_url"),D=O.querySelector("".concat(y.submitButtonSelector));O.addEventListener("submit",(function(n){(function(n){var r;n.preventDefault(),D.textContent="Сохранение...",(r={name:T.value,link:P.value},fetch("".concat(e.baseUrl,"/cards"),{method:"POST",headers:e.headers,body:JSON.stringify({name:r.name,link:r.link})}).then(t)).then((function(e){$(e,e.owner._id)})).catch((function(e){console.log("Ошибка: ".concat(e.status))})).finally((function(){D.textContent="Сохранить"})),i(g)})(n),T.value="",P.value=""}));var I=document.querySelector(".popup_type_avatar"),M=document.querySelector(".profile__image"),N=I.querySelector(".popup__input_type_url"),J=I.querySelector("".concat(y.submitButtonSelector));M.addEventListener("click",(function(){N.value="",_(I,y),u(I)})),I.addEventListener("submit",(function(n){(function(n){n.preventDefault();var r,o=N.value;M.style="background-image: url(".concat(o,")"),(r=o,fetch("".concat(e.baseUrl,"/users/me/avatar"),{method:"PATCH",headers:e.headers,body:JSON.stringify({avatar:r})}).then(t)).then((function(e){})).catch((function(e){console.log(e.status)})).finally((function(){J.textContent="Сохранить"})),i(I)})(n),N.value=""}));var H=E.querySelector(".popup__image"),V=E.querySelector(".popup__caption");function z(e){H.src=e.target.src,H.alt=e.target.alt,V.textContent=e.target.alt,u(E)}function $(e,t){var n=function(e,t,n){var r=n.deleteCard,o=n.openImage,a=n.likeCard,c=document.querySelector("#card-template").content.querySelector(".card").cloneNode(!0),u=c.querySelector(".card__like-button");c.querySelector(".card__likes").textContent=e.likes.length;var i=c.querySelector(".card__delete-button");e.owner._id!=t?i.remove():i.addEventListener("click",r);var l=c.querySelector(".card__title"),s=c.querySelector(".card__image");return s.src=e.link,l.textContent=e.name,s.alt=e.name,s.addEventListener("click",o),e.likes.some((function(e){return e._id===t}))&&u.classList.add("card__like-button_is-active"),u.addEventListener("click",(function(t){a(t,e._id)})),c}(e,t,{deleteCard:a,likeCard:c,openImage:z});v.prepend(n)}!function(e){Array.from(document.querySelectorAll(e.formSelector)).forEach((function(t){!function(e,t){var n=Array.from(e.querySelectorAll(t.inputSelector)),r=e.querySelector(t.submitButtonSelector);n.forEach((function(o){o.addEventListener("input",(function(){(function(e,t,n){t.validity.valid?p(e,t,n):function(e,t,n,r){var o=e.querySelector(".".concat(t.id,"-error"));t.classList.add(r.inputErrorClass),o.textContent=n,o.classList.add(r.errorClass)}(e,t,t.validationMessage,n),t.validity.patternMismatch?t.setCustomValidity(t.dataset.errorMessage):t.setCustomValidity("")})(e,o,t),f(n,r,t)}))}))}(t,e)}))}(y)})();