$( () => {

  $("#btnLogout").click(()=>{
    $.ajax({
      url: "/Logout",
      method: "POST",
      success: (data)=>{
            location.href= './'
      }
    });
  });

});
