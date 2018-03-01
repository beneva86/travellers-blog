$("#commentForm").submit(function(event){
    // cancels the form submission
    event.preventDefault(); // ezzel megallitjuk a form szabalyos mukodeset, mert akkor frissulne az oldal
    submitForm();
});

function submitForm(){
    let username = $("#username").val();
    let email = $("#input_email").val();
    let message = $("#message").val();
    let topic = document.getElementById("title").innerHTML
 
    $.ajax({
        type: "POST",
        url: `/message_${topic}`,
        data: "username=" + username + "&email=" + email + "&message=" + message + "&topic=" + topic,
        success : function(response){
            if (response.newMessage != undefined){

				function tableCreate(){
					let parent = document.querySelector(".myCommentBox")
					let commentForm = document.querySelector("#commentForm")

				    let tbl  = document.createElement('table');
				    tbl.style.width  = '96%';
    				tbl.style.border = '1px solid black';

			        let tr = tbl.insertRow();
			        // let td = tr.insertCell();
			        let tr2 = tbl.insertRow();
			        // let td2 = tr.insertCell();
			        let time = new Date().toLocaleTimeString().substring(0, 5)
			        let date = new Date().toLocaleDateString()

					$(`<td(name='newMessage')><p style="padding-left: 2%; padding-top:1%">${username}</p></td>`).appendTo(tr);
					$(`<td><p style='padding-left:4%'>${message}</p><span class='date sub-text'>${time} ${date}</span></td>`).appendTo(tr2);

					parent.append(tbl)
				    // commentForm.before(tbl)
				    let scrollDiv = $(".myCommentBox");

				    // with animate 
				    scrollDiv.animate({
			            scrollTop: scrollDiv[0].scrollHeight - scrollDiv[0].clientHeight
			          }, 1000);

				    // without animate
				    // scrollDiv.scrollTop(scrollDiv[0].scrollHeight - scrollDiv[0].clientHeight);
				    

				}
				tableCreate();
			    // Clear the form
			    $('#username').val('');
			    $('#input_email').val('');
			    $('#message').val('');
			}
		}
	})
};
