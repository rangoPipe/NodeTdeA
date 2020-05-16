$( () => {
  $("#btnLogin").click(()=>{
      $("#loginModal").modal();
  });

  $("#btnAceptarLogin").click(()=>{
    $.ajax({
      url: "/api/Loggear",
      method: "POST",
      data: {
        usuario :$("#usuario").val(),
        contra : $("#contra").val()
      },
      success: (data)=>{
      	if(!data.success)
          alert(data.data)
        else {
            location.href= './'
          }
      }
    });
  });
});
