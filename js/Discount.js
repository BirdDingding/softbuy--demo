$(function(){

   $.ajax({
       url: "http://localhost:9090/api/getcoupon",
       dataType: "json",
       success: function (data) {
            console.log(data)
           var html = template('ssTpl', data);
           
           $('#main').html(html);

       }
   });


   
})