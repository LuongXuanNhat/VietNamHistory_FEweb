/*
Theme by: WebThemez.com
Note: Please use our back link in your site
*/
$( function() {
        var endDate = "2024-03-18T00:00:00";

        $('.countdown.styled').countdown({
          date: endDate,
          render: function (data) {
            var countdownHTML = "<time>" + this.leadingZeros(data.years, 2) + " năm </time><time>" +
            this.leadingZeros(data.days, 3) + " ngày</time><time>" +
            this.leadingZeros(data.hours, 2) + " giờ</time><time>" +
            this.leadingZeros(data.min, 2) + " phút</time><time>" +
            this.leadingZeros(data.sec, 2) + " giây</time>";

            window.countdownService.updateCountdownState(countdownHTML);
          }
        });
        $('.countdown.callback').countdown({
          date: +(new Date) + 10000,
          render: function(data) {
            $(this.el).text(this.leadingZeros(data.sec, 2) + " sec");
          },
          onEnd: function() {
            $(this.el).addClass('ended');
          }
        }).on("click", function() {
          $(this).removeClass('ended').data('countdown').update(+(new Date) + 10000).start();
        });
		
		
		
      });
   