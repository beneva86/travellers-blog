// ------ check the email address and username in the database after giving the email address ------
$('#input_email').focusout(function(){
	let inputs = {
		username: $('#username').val(),
		email:$('#input_email').val()
	};
	$.post('/formvalidation', inputs, function(data) {
		if (data.message === 'OK'){
			$('.alert-danger').addClass('hidden');
		} else {
			$('.alert-danger').removeClass('hidden').text(`${data.message}`);
		}
	});
});

// ------ check the email address and username in the database after giving the username ------
$('#username').focusout(function(){
	let inputs = {
		username: $('#username').val(),
		email:$('#input_email').val()
	};
	$.post('/formvalidation', inputs, function(data) {
		if (data.message === 'OK'){	
			$('.alert-danger').addClass('hidden');
		} else {
			if($('#input_email').val() != ''){
				$('.alert-danger').removeClass('hidden').text(`${data.message}`);
			}
		}
	});
});

// ------ submit the form ------
$('#commentForm').submit(function(event){
	// cancels the form submission
	event.preventDefault(); 

	let username = $('#username').val();
	let email = $('#input_email').val();
	let message = $('#message').val();
	if (username != '' && email != '' && message != '' && $('.alert-danger').hasClass('hidden')){
		submitForm();
	} 
});

function submitForm(){
	let username = $('#username').val();
	let email = $('#input_email').val();
	let message = $('#message').val();
	let topic = document.getElementById('title').innerHTML;
	let topicUrl = topic.replace(/\s/g, '');

	$.ajax({
		type: 'POST',
		url: `/message_${topicUrl}`,
		data: $('#commentForm').serialize() + '&topic=' + topic,
		success : function(response){
			if (response.newMessage != undefined){

				function tableCreate(){
					// let parent = document.querySelector('.myCommentBox');
					let commentForm = document.querySelector('#commentForm');

					let tbl  = document.createElement('table');
					tbl.style.width  = '93%';
					tbl.style.border = '1px solid black';
					tbl.style.backgroundColor = '#ce787c17';
					tbl.style.marginLeft = '6%';
					tbl.style.marginTop = '-1%';

					let tr = tbl.insertRow();
					let tr2 = tbl.insertRow();
					let time = new Date().toLocaleTimeString().substring(0, 5);
					let date = new Date().toLocaleDateString();

					$(`<td(name='newMessage')><p style="padding-left: 2%; padding-top:1%">${username}</p></td>`).appendTo(tr);
					$(`<td><p style='padding-left:4%'>${message}</p><span class='date sub-text'>${time} ${date}</span></td>`).appendTo(tr2);

					// parent.append(tbl);
					$('.noComments').addClass('hidden');
					commentForm.before(tbl);

					let scrollDiv = $('.myCommentBox');
					// with animate 
					scrollDiv.animate({
						scrollTop: scrollDiv[0].scrollHeight - scrollDiv[0].clientHeight
					}, 50);
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
	});
}
