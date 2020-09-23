//  0 -> childElementCount - 1
// The upmost one is 0
// The downmost one is childElementCount - 1

function sidebarMovementClosure(){
    let position = null; // 0 is a valid position, can't use falsies

    function up(){
    const sidebar = document.getElementsByClassName("sidebar-content")[0];
    if(position > sidebar.childElementCount - 1 || String(position) === "null"){
        position = sidebar.childElementCount - 1;
    } else if(position){
        position -= 1;  
    } 
    sidebar.childNodes[position].scrollIntoView({block: "start"});
    }

    function down(){
        const sidebar = document.getElementsByClassName("sidebar-content")[0];
        if(position !==  sidebar.childElementCount -1){
            position += 1;
            sidebar.childNodes[position].scrollIntoView({block: "start"});
        } else if (position >= sidebar.childElementCount - 1 || String(position) === "null"){
            document.getElementsByClassName("roam-center")[0].scrollIntoView({block: "start"});
            position = sidebar.childElementCount - 1;
        }
    }

    function start(){
        const sidebar = document.getElementsByClassName("sidebar-content")[0];
        sidebar.childNodes[0].scrollIntoView({block: "start"})
        position = 0;
    }

    function end(){
        const sidebar = document.getElementsByClassName("sidebar-content")[0];
        sidebar.childNodes[sidebar.childElementCount - 1].scrollIntoView({block: "start"})  
        position = sidebar.childElementCount - 1;
    }

    function close(){
        const sidebar = document.getElementsByClassName("sidebar-content")[0];
        if(sidebar.childNodes[position].getElementsByClassName("bp3-icon-unpin bp3-small")[0]){
            sidebar.childNodes[position].getElementsByClassName("bp3-icon-unpin bp3-small")[0].click(); //if not unpin then appears again if reloaded;
        }
        sidebar.childNodes[position].getElementsByClassName("bp3-icon-cross")[0].click();
        if(position === 0){

        } else {
            position -=1;
        }
    }

    function moveSidebarPageDown(){
        const sidebar = document.getElementsByClassName("sidebar-content")[0];
        
        // Move top page down if sidebarMovement not initialized
        // Wonder if usage of null isn't complicating things rather than helping
        // The idea was to track when movement hasn't been initialized without using 0 because 0 was a valid position
        if(String(position) === "null") position = 0;

        if(position < sidebar.childElementCount - 1){
            sidebar.insertBefore(sidebar.childNodes[position+1],sidebar.childNodes[position]);
            if(position === sidebar.childElementCount - 2){
                fixCSSWhenPageReachesBottom(sidebar.childElementCount - 2);
            }
            down();
        }
    }

    function moveSidebarPageUp(){
        const sidebar = document.getElementsByClassName("sidebar-content")[0];
        if(position > 0){
            sidebar.insertBefore(sidebar.childNodes[position],sidebar.childNodes[position-1]);
            if(position === sidebar.childElementCount - 1){
                fixCSSWhenPageReachesBottom(sidebar.childElementCount - 2);
            }
            up();
        }
    }

    function moveSidebarPageToTop(){
        const sidebar = document.getElementsByClassName("sidebar-content")[0];
        sidebar.insertBefore(sidebar.childNodes[position],sidebar.childNodes[0]);
        if(position === sidebar.childElementCount - 1){
            fixCSSWhenPageReachesBottom(0);
        }
        sidebar.childNodes[0].scrollIntoView({block: "start"});
        position = 0;
    }
    
    function moveSidebarPageToBottom(){
        const sidebar = document.getElementsByClassName("sidebar-content")[0];
        sidebar.insertBefore(sidebar.childNodes[position],sidebar.childNodes[sidebar.childElementCount]);
        fixCSSWhenPageReachesBottom(sidebar.childElementCount - 2);
        end();
    }
    
    function fixCSSWhenPageReachesBottom(positionOfPageToFixBesidesBottom){
        const sidebar = document.getElementsByClassName("sidebar-content")[0];
        sidebar.childNodes[positionOfPageToFixBesidesBottom].getElementsByTagName('div')[3].style.paddingBottom = "8px"
        //sidebar.childNodes[sidebar.childElementCount - 1].getElementsByTagName('div')[3].style.paddingBottom = "144px"
    
        sidebar.childNodes[positionOfPageToFixBesidesBottom].getElementsByTagName('div')[0].style.borderBottom = "1px solid rgb(138, 155, 168)"
        sidebar.childNodes[sidebar.childElementCount - 1].getElementsByTagName('div')[0].style.borderBottom = "none";
    }

    return {up, down, end, start, close, moveSidebarPageDown, moveSidebarPageUp, moveSidebarPageToTop, moveSidebarPageToBottom};
}

const sidebarMovement = sidebarMovementClosure();

document.addEventListener("keydown", (e) => {
    if(e.ctrlKey && e.altKey && e.key.toLowerCase() === "i"){
        sidebarMovement.up();
    }
})

document.addEventListener("keydown", (e) => {
    if(e.ctrlKey && e.altKey && e.key.toLowerCase() === "k"){
        sidebarMovement.down();
    }
})

document.addEventListener("keydown", (e) => {
    if(e.ctrlKey && e.altKey && e.key.toLowerCase() === "l"){
        sidebarMovement.end();
    }
})

document.addEventListener("keydown", (e) => {
    if(e.ctrlKey && e.altKey && e.key.toLowerCase() === "j"){
        sidebarMovement.start();
    }
})

document.addEventListener("keydown", (e) => {
    if(e.ctrlKey && e.altKey && e.key.toLowerCase() === "x"){
        sidebarMovement.close();
    }
})

document.addEventListener("keydown", (e) => {
    if(e.altKey && e.shiftKey && e.key.toLowerCase() === "k"){
        sidebarMovement.moveSidebarPageDown();
    }
})

document.addEventListener("keydown", (e) => {
    if(e.altKey && e.shiftKey && e.key.toLowerCase() === "i"){
        sidebarMovement.moveSidebarPageUp();
    }
})

document.addEventListener("keydown", (e) => {
    if(e.altKey && e.shiftKey && e.key.toLowerCase() === "j"){
        sidebarMovement.moveSidebarPageToTop();
    }
})

document.addEventListener("keydown", (e) => {
    if(e.altKey && e.shiftKey && e.key.toLowerCase() === "l"){
        sidebarMovement.moveSidebarPageToBottom();
    }
})
