$(document).ready(function () {
	

	/** 點擊TOP時 **/
	gotop = function () {
		$("html, body").scrollTop(0);
	}

	$('#gotopBtn').on('vclick',function () {
		gotop(0);
	})
	$(window).scroll(function(){
      var topval = $("body").scrollTop();
      if (document.documentElement.scrollTop > 0 || topval > 0) {
        $(".gotopBtn").show();
        return;
      } else {
        $(".gotopBtn").hide();
        return;
      }
    });


});