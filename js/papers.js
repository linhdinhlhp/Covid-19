
$(function(){
	$(".button").on("click", function(e){
		e.preventDefault();
		
		$(this).addClass('loading');
		var type = $(this).data("id"),
			$this  = $(this);
		window.setTimeout(function () {
            $this.removeClass('loading');
            $this.addClass('success');
		}, 1000);

		/* Reset animation. */
		window.setTimeout(function () {
            $this.removeClass('success');
			window.open("Papers/"+ type,'_blank');
		}, 2000);
		
	});
});