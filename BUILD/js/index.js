"use strict";function initialize(){console.log("Running Start!");var e=document.getElementById("opnModalUno"),n=document.getElementById("opnModalDos"),t=document.getElementById("opnModalFke");e.addEventListener("click",function(){createModal(250,400,"modal_uno")}),n.addEventListener("click",function(){createModal(500,400,"modal_dos")}),t.addEventListener("click",function(){createModal(500,400,"fakeModal")})}function createModal(e,n,t){e='{"width":'.concat(e,', "height": ').concat(n,"}");window.open("about:blank",t,e)}document.addEventListener("DOMContentLoaded",initialize);