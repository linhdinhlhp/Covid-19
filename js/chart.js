$(function(){
	var $data;
	$.ajax({
            type : "POST",
            url : "./php/chart.php",
            data : {
                count : '1'
            },
            dataType : 'json',
            success : function(res){
				if(res != 0)
				{
					$("#count_1").text(res[0]);
					$("#count_2").text(res[1]);
					$("#count_3").text(res[2]);
					$("#count_4").text(res[3]);
				}
            },
        error : function(){
            alert("Lỗi máy chủ");
        }
    });
	$.ajax({
            type : "POST",
            url : "./php/chart.php",
            data : {
                tuoi : '1'
            },
            dataType : 'json',
            success : function(res){
				if(res != 0)
				{
					$data = [parseInt(res[0], 10), parseInt(res[1], 10), parseInt(res[2], 10)];
				}
            },
        error : function(){
            alert("Lỗi máy chủ");
        }
    });
	
    Chart.defaults.font.family = 'Nunito', '-apple-system,system-ui,BlinkMacSystemFont,"Segoe UI",Roboto,"Helvetica Neue",Arial,sans-serif';
    Chart.defaults.font.color = 'Nunito', '#858796';
    // Pie Chart Example
    var ctx = document.getElementById("doTuoiChart");
    var myPieChart = new Chart(ctx, {
        type: 'doughnut',
        data: {
        labels: ["Từ 0 đến 14 tuổi", "Từ 15 đến 59 tuổi", "Trên 60 tuổi"],
        datasets: [{
            data: [4, 5, 9],
            backgroundColor: ['#4e73df', '#1cc88a', '#36b9cc'],
            hoverBackgroundColor: ['#2e59d9', '#17a673', '#2c9faf'],
            hoverBorderColor: "rgba(234, 236, 244, 1)",
        }],
        },
        options: {
            maintainAspectRatio: false,
            tooltips: {
                backgroundColor: "rgb(255,255,255)",
                bodyFontColor: "#858796",
                borderColor: '#dddfeb',
                borderWidth: 1,
                xPadding: 15,
                yPadding: 15,
                displayColors: false,
                caretPadding: 10,
            },
            legend: {
                display: false
            },
            cutoutInnerPercentage: 80,
        },
    });
})