var cursor=document.createElement('img')
cursor.width=30
cursor.height=30
cursor.style.position='fixed'
cursor.style.zIndex=99999
cursor.src=chrome.extension.getURL("/res/image/cursor.ico");
document.body.appendChild(cursor)
window.onmousemove=(event)=>{
    cursor.style.left=event.clientX+20+'px'
    cursor.style.top=event.clientY+'px'
}