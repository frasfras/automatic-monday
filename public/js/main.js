var graphdata;

$(function($) {
    drawKnob = function() {
        // "tron" case
        if (this.$.data('skin') == 'tron') {

            this.cursorExt = 0.3;

            var a = this.arc(this.cv) // Arc
                ,
                pa // Previous arc
                , r = 1;

            this.g.lineWidth = this.lineWidth;

            if (this.o.displayPrevious) {
                pa = this.arc(this.v);
                this.g.beginPath();
                this.g.strokeStyle = this.pColor;
                this.g.arc(this.xy, this.xy, this.radius - this.lineWidth, pa.s, pa.e, pa.d);
                this.g.stroke();
            }

            this.g.beginPath();
            this.g.strokeStyle = r ? this.o.fgColor : this.fgColor;
            this.g.arc(this.xy, this.xy, this.radius - this.lineWidth, a.s, a.e, a.d);
            this.g.stroke();

            this.g.lineWidth = 2;
            this.g.beginPath();
            this.g.strokeStyle = this.o.fgColor;
            this.g.arc(this.xy, this.xy, this.radius - this.lineWidth + 1 + this.lineWidth * 2 / 3, 0, 2 * Math.PI, false);
            this.g.stroke();

            return false;
        }
    }

    $(".listings-knob .knob").knob({
        min: 1,
        max: 100,
        change: function(value) {
            $(".listings-knob .js-range-slider").data("ionRangeSlider").update({
                from: value
            });
            document.getElementById('listings-input').value = parseInt(value);
            compute();
        },
        draw: drawKnob
    });
    $(".occupancy-knob .knob").knob({
        min: 0,
        max: 100,
        change: function(value) {
            $(".occupancy-knob .js-range-slider").data("ionRangeSlider").update({
                from: value
            });
            document.getElementById('occupancy-input').value = parseInt(value);
            compute();
        },
        draw: drawKnob
    });
    $(".weekday-knob .knob").knob({
        min: 0,
        max: 2500,
        change: function(value) {
            $(".weekday-knob .js-range-slider").data("ionRangeSlider").update({
                from: value
            });
            document.getElementById('weekday-input').value = parseInt(value);
            compute();
        },
        draw: drawKnob
    });
    $(".weekend-knob .knob").knob({
        min: 0,
        max: 2500,
        change: function(value) {
            $(".weekend-knob .js-range-slider").data("ionRangeSlider").update({
                from: value
            });
            document.getElementById('weekend-input').value = parseInt(value);
            compute();
        },
        draw: drawKnob
    });

    $(".listings-knob .js-range-slider").ionRangeSlider({
        min: 1,
        max: 100,
        from: 1,
        grid: false,
        hide_min_max: true,
        hide_from_to: true,
        skin: 'round',
        onChange: function(data) {
            document.getElementById('listings-input').value = data.from;
            $(".listings-knob .knob").val(data.from).trigger('change', true);
        }
    });
    $(".occupancy-knob .js-range-slider").ionRangeSlider({
        min: 0,
        max: 100,
        from: 10,
        grid: false,
        hide_min_max: true,
        hide_from_to: true,
        skin: 'round',
        onChange: function(data) {
            document.getElementById('occupancy-input').value = data.from;
            $(".occupancy-knob .knob").val(data.from).trigger('change', true);
        }
    });
    $(".weekday-knob .js-range-slider").ionRangeSlider({
        min: 0,
        max: 2500,
        from: 40,
        grid: false,
        hide_min_max: true,
        hide_from_to: true,
        skin: 'round',
        onChange: function(data) {
            document.getElementById('weekday-input').value = data.from;
            $(".weekday-knob .knob").val(data.from).trigger('change', true);
        }
    });
    $(".weekend-knob .js-range-slider").ionRangeSlider({
        min: 0,
        max: 2500,
        from: 40,
        grid: false,
        hide_min_max: true,
        hide_from_to: true,
        skin: 'round',
        onChange: function(data) {
            document.getElementById('weekend-input').value = data.from;
            $(".weekend-knob .knob").val(data.from).trigger('change', true);
        }
    });

    $(".listings-knob .knob").change(function(event, wasTriggered) {
        if (!wasTriggered) {
            $(".listings-knob .js-range-slider").data("ionRangeSlider").update({
                from: this.value
            });
            document.getElementById('listings-input').value = this.value;
            document.getElementById('listings-input1').value = this.value;
        }
        compute();
    });
    $(".occupancy-knob .knob").change(function(event, wasTriggered) {
        if (!wasTriggered) {
            $(".occupancy-knob .js-range-slider").data("ionRangeSlider").update({
                from: this.value
            });
            document.getElementById('occupancy-input').value = this.value;
        }
        compute();
    });
    $(".weekday-knob .knob").change(function(event, wasTriggered) {
        if (!wasTriggered) {
            $(".weekday-knob .js-range-slider").data("ionRangeSlider").update({
                from: this.value
            });
            document.getElementById('weekday-input').value = this.value;
        }
        compute();
    });
    $(".weekend-knob .knob").change(function(event, wasTriggered) {
        if (!wasTriggered) {
            $(".weekend-knob .js-range-slider").data("ionRangeSlider").update({
                from: this.value
            });
            document.getElementById('weekend-input').value = this.value;
        }
        compute();
    });

    cmigraph = new Chartist.Bar('.ct-chart', {
        labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
        series: [
            [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]
        ]
    }, {
        stackBars: true,
        axisY: {
            labelInterpolationFnc: function(value) {
                return '$' + formatNumber(value, 0);
            },
            offset: 55
        },
        height: 230
    });

    // document.querySelectorAll('.expenses-input').forEach((expenses_input) => {
    //     setInputFilter(expenses_input, function(value) {
    //         return /^\d*\.?\d{0,2}$/.test(value) && (value === "" || parseInt(value) <= 9999999999);
    //     }, function(value) {
    //         compute()
    //     });
    // });

    setInputFilter(document.getElementById('listings-input'), function(value) {
        return /^\d*\.?\d{0,2}$/.test(value) && (value === "" || (parseInt(value) > 0 && parseInt(value) <= 100));
    }, function(value) {
        $(".listings-knob .knob").val(parseInt(value)).trigger('change', true);
        $(".listings-knob .js-range-slider").data("ionRangeSlider").update({
            from: parseInt(value)
        });
    });
    setInputFilter(document.getElementById('occupancy-input'), function(value) {
        return /^\d*\.?\d{0,2}$/.test(value) && (value === "" || parseInt(value) >= 0 || parseInt(value) <= 100);
    }, function(value) {
        $(".occupancy-knob .knob").val(parseInt(value)).trigger('change', true);
        $(".occupancy-knob .js-range-slider").data("ionRangeSlider").update({
            from: parseInt(value)
        });
    });
    setInputFilter(document.getElementById('weekday-input'), function(value) {
        return /^\d*\.?\d{0,2}$/.test(value) && (value === "" || parseInt(value) >= 0 || parseInt(value) <= 2500);
    }, function(value) {
        $(".weekday-knob .knob").val(parseInt(value)).trigger('change', true);
        $(".weekday-knob .js-range-slider").data("ionRangeSlider").update({
            from: parseInt(value)
        });
    });
    setInputFilter(document.getElementById('weekend-input'), function(value) {
        return /^\d*\.?\d{0,2}$/.test(value) && (value === "" || parseInt(value) >= 0 || parseInt(value) <= 2500);
    }, function(value) {
        $(".weekend-knob .knob").val(parseInt(value)).trigger('change', true);
        $(".weekend-knob .js-range-slider").data("ionRangeSlider").update({
            from: parseInt(value)
        });
    });

    $(".listings-knob .js-range-slider").data("ionRangeSlider").update({
        from: document.querySelector('.listings-knob input.knob').value
    });
    $(".occupancy-knob .js-range-slider").data("ionRangeSlider").update({
        from: document.querySelector('.occupancy-knob input.knob').value
    });
    $(".weekday-knob .js-range-slider").data("ionRangeSlider").update({
        from: document.querySelector('.weekday-knob input.knob').value
    });
    $(".weekend-knob .js-range-slider").data("ionRangeSlider").update({
        from: document.querySelector('.weekend-knob input.knob').value
    });
    document.getElementById('listings-input').value = document.querySelector('.listings-knob input.knob').value;
    document.getElementById('occupancy-input').value = document.querySelector('.occupancy-knob input.knob').value;
    document.getElementById('weekday-input').value = document.querySelector('.weekday-knob input.knob').value;
    document.getElementById('weekend-input').value = document.querySelector('.weekend-knob input.knob').value;

    compute();

});

function setInputFilter(textbox, inputFilter, afterfiltercallback) {
    ["input", "keydown", "keyup", "mousedown", "mouseup", "select", "contextmenu", "drop"].forEach(function(event) {
        textbox.addEventListener(event, function() {
            if (inputFilter(this.value)) {
                this.oldValue = this.value;
                this.oldSelectionStart = this.selectionStart;
                this.oldSelectionEnd = this.selectionEnd;
            } else if (this.hasOwnProperty("oldValue")) {
                this.value = this.oldValue;
                this.setSelectionRange(this.oldSelectionStart, this.oldSelectionEnd);
            } else {
                this.value = "";
            }
            afterfiltercallback(this.value);
        });
    });
}

function compute() {
    var grossrevenue = ((document.querySelector('.weekday-knob input.knob').value * 21.75) + (document.querySelector('.weekend-knob input.knob').value * 8.6)) * (document.querySelector('.occupancy-knob input.knob').value / 100);
    var expenses = 0,
        airbnbfrees = 0,
        frondeskfees = 0,
        listings = document.querySelector('.listings-knob input.knob').value;
   /*  document.querySelectorAll('.expenses-input').forEach((expenses_input) => {
        expenses += parseFloat(expenses_input.value) || 0;
    }); */
    grossrevenue *= listings;
    expenses *= listings;
    airbnbfees = grossrevenue * 0.03;
   // frontdeskfees = document.getElementById('frontdesk-check').checked ? (grossrevenue * 0.05) : 0;
   // netmonthlyincome = grossrevenue - expenses - airbnbfees - frontdeskfees;

   // document.getElementById('gross-revenue-text').innerText = '$ ' + formatNumber(grossrevenue);
   /*  document.getElementById('airbnb-fees-text').innerText = '$ ' + formatNumber(airbnbfees);
    document.getElementById('frontdesk-fees-text').innerText = '$ ' + formatNumber(frontdeskfees);
    document.getElementById('net-montly-text').innerText = '$ ' + formatNumber(netmonthlyincome);
    document.getElementById('daily-cashflow').innerText = formatNumber(netmonthlyincome / 30);
    document.getElementById('monthly-cashflow').innerText = formatNumber(netmonthlyincome);
    document.getElementById('yearly-cashflow').innerText = formatNumber(netmonthlyincome * 12);
    document.getElementById('daily-cashflow-sm').innerText = formatNumber(netmonthlyincome / 30);
    document.getElementById('monthly-cashflow-sm').innerText = formatNumber(netmonthlyincome);
    document.getElementById('yearly-cashflow-sm').innerText = formatNumber(netmonthlyincome * 12);
 */
  //  rent = (document.getElementById('rent-input').value || 0) * listings;

    graphdata = [
        [],
        [],
        []
    ];
    for (i = 1; i < 13; i++) {
        // graphdata[0][i - 1] = Math.round(rent);
        // graphdata[1][i - 1] = Math.round(expenses - rent);
        // graphdata[2][i - 1] = Math.round(netmonthlyincome * i);
    }
    graphdata = {
        labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
        series: graphdata
    }
    cmigraph.update(graphdata);
}

function formatNumber(num, decdigit = 2) {
    return num.toFixed(decdigit).toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,')
}