var textarea = document.querySelector('textarea');

textarea.addEventListener('keydown', autosize);
             
function autosize(){
  let element = this;
  setTimeout(function(){
    element.style.cssText = 'height:35px; padding-top:10px';
    // for box-sizing other than "content-box" use:
    // element.style.cssText = '-moz-box-sizing:content-box';
    element.style.cssText = 'height:' + element.scrollHeight + 'px';
  },0);
}