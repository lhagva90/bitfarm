$(function() {
  $(".plan-select > div").on("click", function(event) {
    $(".plan-select").removeClass("active");
    $(this)
      .parent()
      .addClass("active");
    var plan = $(this)
      .parent()
      .attr("rel");
    var data = sw(plan);
    var amount = data.min;
    $(".calculate-amount").val(amount);

    calc(data, amount);
  });

  $(".calculate-amount")
    .on("change keyup", function() {
      var amount = Number($(this).val() * Math.pow(10, 2)) / Math.pow(10, 2);

      var plan = $(".plan-select.active").attr("rel");
      var data = sw(plan);
      if (amount > data.max) {
        amount = data.max;
        $(this).val(amount);
        var data = sw(plan);
      }

      calc(data, amount);
    })
    .on("keypress", isNumberKey);

  function isNumberKey(event) {
    var charCode = event.which ? event.which : event.keyCode;
    if (charCode == 46) return true;
    if (charCode > 31 && (charCode < 48 || charCode > 57)) return false;
    return true;
  }

  function sw(plan) {
    data = [];
    data.min = 10;
    data.max = 500;
    data.duration = 16;
    data.percent = 8.5;
    data.deposit = 0;

    switch (plan) {
      case "1":
        data.min = 10;
        data.max = 49;
        data.duration = 16;
        data.percent = 8.5;
        data.deposit = 0;
        data.planname = "Callcenter Worker";
        break;
      case "2":
        data.min = 50;
        data.max = 99;
        data.duration = 16;
        data.percent = 9;
        data.deposit = 0;
        data.planname = "Construction Builder";
        break;
      case "3":
        data.min = 100;
        data.max = 499;
        data.duration = 16;
        data.percent = 9.5;
        data.deposit = 0;
        data.planname = "Medical Specialist";
        break;
      case "4":
        data.min = 500;
        data.max = 25000;
        data.duration = 16;
        data.percent = 10;
        data.deposit = 0;
        data.planname = "IT Developer";
        break;
    }
    console.clear();
    console.log(data);
    return data;
  }

  function calc(data, amount) {
    if (jQuery.isEmptyObject(data)) {
      data = sw();
      amount = data.min;
      $(".calculate-amount").val(data.min);
      calculate(amount, data.percent, data.duration, data.deposit);
    }

    calculate(amount, data.percent, data.duration, data.deposit);
  }

  function calculate(amount, percent, duration, deposit) {
    var sum = Number(amount);
    var percent = Number(percent);
    var duration = Number(duration);
    var deposit = Number(deposit);

    var result_daily_value = pow((sum * percent) / 100, 2);
    var result_total_value = pow(
      (sum * deposit) / 100 + (sum * percent * 16) / 100,
      2
    );
    var result_profit_value = pow(result_total_value - sum - deposit / 100, 2);
    var result_plan_name = data.planname;

    console.log(result_daily_value);

    $("#daily-return").html(result_daily_value + " <small>USD</small>");
    $("#total-return").html(result_total_value + " <small>USD</small>");
    $("#profit").html(+result_profit_value + " <small>USD</small>");
    $("#plan").html(result_plan_name);
  }

  function pow(amount, pow) {
    return (
      Math.round(amount * Math.pow(10, pow)).toFixed(0) / Math.pow(10, pow)
    );
  }
});

$(function() {
  var Accordion = function(el, multiple) {
    this.el = el || {};
    this.multiple = multiple || false;

    // Variables privadas
    var links = this.el.find(".a-link");
    // Evento
    links.on("click", { el: this.el, multiple: this.multiple }, this.dropdown);
  };

  Accordion.prototype.dropdown = function(e) {
    var $el = e.data.el;
    ($this = $(this)), ($next = $this.next());

    $next.slideToggle();
    $this.parent().toggleClass("open");

    if (!e.data.multiple) {
      $el
        .find(".submenu")
        .not($next)
        .slideUp()
        .parent()
        .removeClass("open");
    }
  };

  var accordion = new Accordion($(".accordion"), false);
});
