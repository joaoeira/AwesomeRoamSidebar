// childElementCount - 1 -> 0
// The rightmost one is 0
// The leftmost one is childElementCount - 1

function sidebarMovementClosure(){
    let position = null; // 0 is a valid position, can't use falsies

    function right(){
      const sidebar = document.getElementsByClassName("sidebar-content")[0];
      if(position > sidebar.childElementCount - 1 || String(position) === "null"){
        position = sidebar.childElementCount - 1;
      } else if(position){
        position -= 1;  
      } 
      sidebar.childNodes[position].scrollIntoView({inline: "center"});
    }

    function left(){
        const sidebar = document.getElementsByClassName("sidebar-content")[0];
        if(position !==  sidebar.childElementCount -1){
            position += 1;
            sidebar.childNodes[position].scrollIntoView({inline: "center"});
        } else if (position >= sidebar.childElementCount - 1 || String(position) === "null"){
            document.getElementsByClassName("roam-center")[0].scrollIntoView({inline: "center"});
            position = sidebar.childElementCount;
        }
    }

    function end(){
        const sidebar = document.getElementsByClassName("sidebar-content")[0];
        sidebar.childNodes[0].scrollIntoView({inline: "center"})
        position = 0;
    }

    function start(){
        const sidebar = document.getElementsByClassName("sidebar-content")[0];
        document.getElementsByClassName("roam-center")[0].scrollIntoView({inline: "center"})
        position = sidebar.childElementCount;
    }

    function close(){
        const sidebar = document.getElementsByClassName("sidebar-content")[0];
        if(sidebar.childNodes[position].getElementsByClassName("bp3-icon-unpin bp3-small")[0]){
            sidebar.childNodes[position].getElementsByClassName("bp3-icon-unpin bp3-small")[0].click(); //if not unpin then appears again if reloaded;
        }
        sidebar.childNodes[position].getElementsByClassName("bp3-icon-cross")[0].click()
        if(position === 0){

        } else {
            position -=1;
        }
    }
    
    function moveSidebarPageToLeft(){
        const sidebar = document.getElementsByClassName("sidebar-content")[0];
        sidebar.insertBefore(sidebar.childNodes[position+1],sidebar.childNodes[position]);
        left();
    }

    function moveSidebarPageToRight(){
        const sidebar = document.getElementsByClassName("sidebar-content")[0];

        // Move leftmost page to the right if sidebarMovement not initialized
        // Wonder if usage of null isn't complicating things rather than helping
        // The idea was to track when movement hasn't been initialized without using 0 because 0 was a valid position
        if(String(position) === "null") position = sidebar.childElementCount - 1;

        if(position > 0){
            sidebar.insertBefore(sidebar.childNodes[position],sidebar.childNodes[position-1]);
            right();
        }
    }

    function moveSidebarPageToStart(){
        const sidebar = document.getElementsByClassName("sidebar-content")[0];
        sidebar.insertBefore(sidebar.childNodes[position],sidebar.childNodes[sidebar.childElementCount]);
        sidebar.childNodes[sidebar.childElementCount - 1].scrollIntoView({inline: "center"});
        position = sidebar.childElementCount - 1;
    }
    
    function moveSidebarPageToEnd(){
        const sidebar = document.getElementsByClassName("sidebar-content")[0];
        if(position > 0){
            sidebar.insertBefore(sidebar.childNodes[position],sidebar.childNodes[0]);
            end();
        }
    }

    return {right, left, end, start, close,moveSidebarPageToLeft, moveSidebarPageToRight, moveSidebarPageToStart, moveSidebarPageToEnd};
}

const sidebarMovement = sidebarMovementClosure();

document.addEventListener("keydown", (e) => {
    if(e.ctrlKey && e.altKey && e.key === "ArrowRight"){
        sidebarMovement.right();
    }
})

document.addEventListener("keydown", (e) => {
    if(e.ctrlKey && e.altKey && e.key === "ArrowLeft"){
        sidebarMovement.left();
    }
})

document.addEventListener("keydown", (e) => {
    if(e.ctrlKey && e.altKey && e.key === "ArrowUp"){
        sidebarMovement.end();
    }
})

document.addEventListener("keydown", (e) => {
    if(e.ctrlKey && e.altKey && e.key === "ArrowDown"){
        sidebarMovement.start();
    }
})

document.addEventListener("keydown", (e) => {
    if(e.ctrlKey && e.altKey && e.key === "x"){
        sidebarMovement.close();
    }
})

document.addEventListener("keydown", (e) => {
    if(e.altKey && e.shiftKey && e.key === "ArrowLeft"){
        sidebarMovement.moveSidebarPageToLeft();
    }
})

document.addEventListener("keydown", (e) => {
    if(e.altKey && e.shiftKey && e.key === "ArrowRight"){
        sidebarMovement.moveSidebarPageToRight();
    }
})

document.addEventListener("keydown", (e) => {
    if(e.altKey && e.shiftKey && e.key === "ArrowDown"){
        sidebarMovement.moveSidebarPageToStart();
    }
})

document.addEventListener("keydown", (e) => {
    if(e.altKey && e.shiftKey && e.key === "ArrowUp"){
        sidebarMovement.moveSidebarPageToEnd();
    }
})
