(this["webpackJsonpclb-client"]=this["webpackJsonpclb-client"]||[]).push([[0],{2:function(e,t,a){},20:function(e,t,a){e.exports=a.p+"static/media/CLB_DP.41fed40b.jpg"},21:function(e,t,a){e.exports=a(46)},45:function(e,t,a){},46:function(e,t,a){"use strict";a.r(t);var n=a(0),r=a.n(n),o=a(18),i=a.n(o),s=a(4),c=a(3),l=a.n(c),m=a(5),u=a(6),p=a(19),d=a.n(p),f={addUser:function(){var e=Object(m.a)(l.a.mark((function e(t){var a,n,r,o;return l.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return"+1",a=t.phoneNumber,n="+1".concat(a),r={name:t.firstname,number:n},e.next=6,d.a.post("/api",r);case 6:return o=e.sent,e.abrupt("return",o.data);case 8:case"end":return e.stop()}}),e)})));return function(t){return e.apply(this,arguments)}}()},b=(a(2),a(20)),h=a.n(b),g=[{tag:"cf-robot-message",type:"text",name:"greeting_1","cf-questions":"Yo what's going on? It's The Boy, a.k.a. Drake \ud83c\udf0e"},{tag:"cf-robot-message",type:"text",name:"greeting_2","cf-questions":"I hope you enjoyed C.L.B. \ud83e\udd30\ud83c\udffd"},{tag:"cf-robot-message",type:"text",name:"greeting_3","cf-questions":"C.L.B. Hotline was a fun experience, and I wanted to continue sending texts for future albums that I am personally anticipating such as Adele's 30 & Travis Scott's Utopia \ud83d\udcbd"},{tag:"input",type:"text",name:"firstname",id:"firstname",required:"",minlength:"3",maxlength:"15","cf-questions":"First off, do you have name or nickname you go by?","cf-input-placeholder":"Eg. The Boy","cf-error":"3 - 15 characters"},{tag:"cf-robot-message",type:"text",name:"greeting_4","cf-questions":"Nice to meet you {firstname}! \ud83e\udd1d","cf-conditional-continue":"yes"},{tag:"input",type:"tel",pattern:"[0-9]{10}",name:"phoneNumber",id:"phoneNumber",required:"",minlength:"10",maxlength:"10","cf-questions":"So {firstname}, what is your cell phone number?","cf-input-placeholder":"10 digit Eg. 4161234567","cf-error":"10 digit number no dashes"},{tag:"cf-robot-message",type:"text",name:"adding_Contact_Info_1","cf-questions":"Alright {firstname}! Give me a minute to verify and add you to my contacts \u23f3"}];function E(){var e=Object(n.useRef)();return Object(n.useEffect)((function(){function t(){return(t=Object(m.a)(l.a.mark((function e(){var t,n;return l.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return t=a.getFormData(!0),e.next=3,f.addUser(t);case 3:"Invalid number"===(n=e.sent)?(a.addRobotChatResponse("This is an invalid Canadian \ud83c\udde8\ud83c\udde6 / American \ud83c\uddfa\ud83c\uddf8 cell phone number {firstname} \ud83d\ude02"),a.addRobotChatResponse("KMT ... my time is precious like a Patek Philippe, {firstname} \u270c\ud83c\udffc")):"Non-unique number"===n?(a.addRobotChatResponse("{firstname}, you must love talking with me \ud83d\ude02"),a.addRobotChatResponse("You've already subscribed to the C.L.B. Hotline \u270d\ud83c\udffc"),a.addRobotChatResponse("Until next time {firstname} \u270c\ud83c\udffc")):(a.addRobotChatResponse("Woi Oi! You've been subscribed! \ud83d\udc98"),a.addRobotChatResponse("I'll send out a confirmation text from ".concat(n.secret," shortly \ud83d\udcf1")),a.addRobotChatResponse("If you change your mind just text 'TAKECARE' to ".concat(n.secret," to unsubscribe")),a.addRobotChatResponse("Until next time {firstname} \u270c\ud83c\udffc"));case 5:case"end":return e.stop()}}),e)})))).apply(this,arguments)}var a=u.ConversationalForm.startTheConversation({options:{theme:"dark",context:e.current,preventAutoFocus:!1,submitCallback:function(){!function(){t.apply(this,arguments)}()},userImage:"https://pbs.twimg.com/profile_images/563843814725402624/Vb8k670S_400x400.png",robotImage:h.a,loadExternalStyleSheet:!0},tags:g});return function(){a.remove()}}),[g]),r.a.createElement("div",{className:"CForm",ref:e})}var y=function(e){var t=e.title;return r.a.createElement("h1",{className:"outlineText"},r.a.createElement("i",null,t))},v=function(e){var t=e.title;return r.a.createElement("h1",{className:"solidText"},r.a.createElement("i",null,t))},C=function(e){var t=e.question;return r.a.createElement("h2",{className:"contrast"},r.a.createElement("i",null,t))},N=function(e){var t=e.blurb;return r.a.createElement("p",{className:"contrast"},t)},x=function(e){var t=e.icon,a=e.link,n=e.label;return r.a.createElement("div",{className:"icon"},r.a.createElement("a",{href:a},r.a.createElement("i",{className:t})),r.a.createElement("p",null,n))};var w=function(){var e=Object(s.b)({opacity:1,from:{opacity:0},config:{duration:500}}),t=Object(s.b)({opacity:1,from:{opacity:0},config:{duration:1e3}});return r.a.createElement("div",{className:"parent"},r.a.createElement(s.a.div,{style:e,className:"logo"},r.a.createElement(y,{title:"C.L.B. HOTLINE"}),r.a.createElement(y,{title:"C.L.B. HOTLINE"}),r.a.createElement(v,{title:"C.L.B. HOTLINE"}),r.a.createElement(y,{title:"C.L.B. HOTLINE"}),r.a.createElement(y,{title:"C.L.B. HOTLINE"})),r.a.createElement(s.a.div,{style:e,className:"pitch"},r.a.createElement("div",{className:"ms-word-center"},r.a.createElement(C,{question:"Growing impatient for the release of your favourite artist's next album?"})),r.a.createElement("div",{className:"ms-word-center"},r.a.createElement(N,{blurb:"Look no further, C.L.B. Hotline is a web app built to solve this very problem. The app will send subscribers an SMS text mesage to their phone once highly anticipated albums are available on streaming platforms. Currently only Canadian and U.S. mobile numbers are supported \ud83c\udde8\ud83c\udde6 & \ud83c\uddfa\ud83c\uddf8"})),r.a.createElement("div",{className:"ms-word-center bottom"},r.a.createElement(N,{blurb:"Feel free to subscribe with the interactive onboarding process below \ud83d\udc47\ud83c\udffe"})),r.a.createElement("div",{className:"ms-word-center right"},r.a.createElement(N,{blurb:"Feel free to subscribe with the interactive onboarding process to the right \ud83d\udc49\ud83c\udffe"}))),r.a.createElement(s.a.div,{style:t,className:"form"},r.a.createElement(E,null)),r.a.createElement("div",{className:"footer"},r.a.createElement(N,{blurb:"Designed and Built by Nish \ud83d\udc68\ud83c\udffe\u200d\ud83d\udcbb"}),r.a.createElement("div",{className:"footerIcon"},r.a.createElement(x,{icon:"fab fa-spotify",label:"Spotify",link:"https://open.spotify.com/artist/3TVXtAsR1Inumwj472S9r4"}),r.a.createElement(x,{icon:"fab fa-itunes-note",label:"Apple Music",link:"https://music.apple.com/us/artist/drake/271256"}))))};a(45);i.a.render(r.a.createElement(r.a.StrictMode,null,r.a.createElement(w,null)),document.getElementById("root"))}},[[21,1,2]]]);
//# sourceMappingURL=main.6fa3d91a.chunk.js.map