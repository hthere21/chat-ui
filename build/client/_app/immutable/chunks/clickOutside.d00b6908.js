function i(c,t){function n(e){c.contains(e.target)||t()}return document.body.addEventListener("click",n),{update(e){t=e},destroy(){document.body.removeEventListener("click",n)}}}export{i as c};
