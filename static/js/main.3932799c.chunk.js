(this.webpackJsonprogue=this.webpackJsonprogue||[]).push([[0],{57:function(t,e,n){},58:function(t,e,n){},60:function(t,e,n){},61:function(t,e,n){"use strict";n.r(e);var r=n(0),a=n(1),c=n.n(a),i=n(14),l=n.n(i),u=(n(57),n(58),n(12)),s=n(15),o=n.n(s),d=n(7),f=(n(60),o.a.Component);function h(t,e,n){var r=2*e+1;if(r<n.length){var a={};a.name=n[r],"null"!==a.name&&h(a,r,n),t.children||(t.children=[]),t.children.push(a)}var c=2*e+2;if(c<n.length){var i={};i.name=n[c],"null"!==i.name&&h(i,c,n),t.children||(t.children=[]),t.children.push(i)}}function p(t){var e=t.split(","),n={};return 0===e.length||(n.name=e[0],n.children=[],console.log(n),h(n,0,e)),n}function j(){var t=Object(a.useState)(""),e=Object(u.a)(t,2),n=e[0],c=e[1],i=Object(a.useState)("1,2,3,4,5,null,7,8,9,0,11,12,13,14,15"),l=Object(u.a)(i,2),s=l[0],o=l[1];return Object(a.useEffect)((function(){var t=p(s);c(function(t){console.log("runned!");var e=20,n=120,r=840-n,a=500-e-20,c=d.b(t),i=d.a();i.size([400,200]),i(c);var l=document.createElement("div"),u=d.c(l).append("svg").attr("width",r).attr("height",a).append("g").attr("font-family","sans-serif").attr("font-size",10).attr("transform","translate("+n+","+e+")"),s=u.append("g").attr("class","links"),o=u.append("g").attr("class","nodes").selectAll("circle.node").data(c.descendants()).enter().append("g").attr("class",(function(t){return"null"===t.data.name?"node-invisible":"node"})).attr("visibility",(function(t){return"null"===t.data.name?"hidden":"visible"}));return o.append("circle").attr("cx",(function(t){return t.x})).attr("cy",(function(t){return t.y})).attr("r",10),o.append("text").attr("dx",(function(t){return t.x-3})).attr("dy",(function(t){return t.y+3})).text((function(t){return console.log(t),t.data.name})),s.selectAll("line.link").data(c.links()).enter().append("line").classed("link",!0).attr("x1",(function(t){return t.source.x})).attr("y1",(function(t){return t.source.y})).attr("x2",(function(t){return t.target.x})).attr("y2",(function(t){return t.target.y})).attr("visibility",(function(t){return"null"===t.target.data.name?"hidden":"visible"})),l}(t))}),[s]),Object(r.jsxs)("div",{children:[Object(r.jsx)("h1",{children:"Tree parser and visualizer"}),Object(r.jsx)("textarea",{cols:"60",value:s,placeholder:"Heap tree repr",onChange:function(t){o(t.target.value)}}),Object(r.jsxs)("div",{children:[Object(r.jsx)("p",{children:"Current tree"}),Object(r.jsx)("p",{children:s})]}),Object(r.jsx)("div",{children:Object(r.jsx)(f,{data:n})})]})}var b=function(){return Object(r.jsx)("div",{className:"App",children:Object(r.jsx)(j,{})})},v=function(t){t&&t instanceof Function&&n.e(3).then(n.bind(null,62)).then((function(e){var n=e.getCLS,r=e.getFID,a=e.getFCP,c=e.getLCP,i=e.getTTFB;n(t),r(t),a(t),c(t),i(t)}))};l.a.render(Object(r.jsx)(c.a.StrictMode,{children:Object(r.jsx)(b,{})}),document.getElementById("root")),v()}},[[61,1,2]]]);
//# sourceMappingURL=main.3932799c.chunk.js.map