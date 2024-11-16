document.addEventListener("DOMContentLoaded",function(){
    const token = document.head.querySelector('meta[name="csrf-token"]').content
    document.querySelectorAll(".favorite-link").forEach(function(addLink){
        addLink.addEventListener("click",function(e){
            e.preventDefault();
            const blogId = addLink.classList[1].split("-")[1];
            const firstElement = addLink.classList[1].split("-")[0];
            if(firstElement == "delete"){
                const favId = addLink.getAttribute("fav-id")
                fetch("/favorites/" + favId,{
                    method: "DELETE",
                    headers:  {
                        "Content-Type": "application/json",
                        "Accept": "application/json"
                    },
                    body : JSON.stringify({ authenticity_token: token, entity: { name: "new name" } })
                }).then(function(res){
                    addLink.classList.remove(addLink.classList[1]);
                    addLink.parentNode.lastChild.textContent = (Number)(addLink.parentNode.lastChild.textContent) - 1
                    if(addLink.querySelector("i").textContent === "star"){
                        addLink.querySelector("i").textContent = "star_border";
                    }else{
                        addLink.querySelector("i").textContent = "star";
                    }
                    addLink.classList.add(`post-${blogId}`)
                    addLink.removeAttribute("fav-id")
                }).catch(function(){
                    alert("Failed to remove from favorites")
                });
            }else if(firstElement == 'post'){
                fetch("/favorites?blog_id=" + blogId,{
                    method: "POST",
                    headers:  {
                        "Content-Type": "application/json",
                        "Accept": "application/json"
                    },
                    body : JSON.stringify({ authenticity_token: token, entity: { name: "new name" } })
                }).then(function(response){
                    return response.json();
                }).then(function(data){
                    addLink.classList.remove(addLink.classList[1]);
                    addLink.parentNode.lastChild.textContent = (Number)(addLink.parentNode.lastChild.textContent) + 1
                    if(addLink.querySelector("i").textContent === "star"){
                        addLink.querySelector("i").textContent = "star_border";
                    }else{
                        addLink.querySelector("i").textContent = "star";
                    }
                    addLink.classList.add(`delete-${blogId}`)
                    addLink.setAttribute("fav-id",data.id)
                }).catch(function(){
                    alert("Failed to add to favorites")
                });
            }
            e.stopPropagation();
        });
    });
});