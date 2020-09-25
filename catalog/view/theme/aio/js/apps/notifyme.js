function notifyme(id){
    document.getElementById('modal-notify-me').classList.add('is-active');
    document.getElementById('requestproduct_product_id').value = id;
}

function requestproduct_send(){
$.ajax({     
    type: "POST",
    url: 'index.php?route=module/requestproduct/requestproduct',
    data: 'requestproduct_name=' + $("input[name=requestproduct_name]").val() + '&requestproduct_email=' + $("input[name=requestproduct_email]").val() + '&requestproduct_product_id=' + $("input[name=requestproduct_product_id]").val(),
   success: function (json) {
        // console.log(data);
         //console.log(json['response']);
         var result = json['response'];
         //success send email
         if(result == 1){
         	$("#requestproduct_name").val('');
         	$("#requestproduct_email").val('');
         	Swal({
				type: 'success',
				title: 'Success',
 				text: 'We will update you when product is available'
		 	});	 
		 	//email already sent before
         }else if(result == 2){
         	Swal({
				type: 'success',
				title:'Success',
 				text: 'We will update you when product is available'
		 	}); 
         	$("#requestproduct_name").val('');
         	$("#requestproduct_email").val('');
         	//email not sent
         }else if(result == 3){
         	document.getElementById('modal-notify-me').classList.add('is-active');
            Swal({
				type: 'error',
				title: 'Error',
 				text: 'Error processing request'
		 	});	 
         } 
         
     },
     dataType: "json"
});
}