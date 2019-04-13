jQuery.browser = {};
(function() {
  jQuery.browser.msie = !1;
  jQuery.browser.version = 0;
  navigator.userAgent.match(/MSIE ([0-9]+)\./) &&
    ((jQuery.browser.msie = !0), (jQuery.browser.version = RegExp.$1));
})();
domen = "https://brandsoul.ru";
domen_iframe = "alinaadt.ru/brandtypes";
$(document).ready(function() {
  rank = [-1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1];
  archs = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
  balls = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
  maxSteps = parseInt($("#max-steps").val()) + 1;
  stepWidth = $(".mws-line-no-back").width() / maxSteps;
  curWidth = $(".mws-line-no-back").width();
  $(".mws-line-no-back").width(curWidth - stepWidth);
  $("#current_step").val(1);
  $(".mws-answer").on("click", onClickAnswer);
});

function onClickAnswer (a) {
    a.stopPropagation();
    a = $("#current_step").val();
    var b = $(".mws-question-step-" + a + " .mws-answers");
    if ($(this).hasClass("mws-vote")) {
        rank[a]--;
        $(this).find(".mws-rank-number") .text("");
        $(this).removeClass("mws-vote");
        if( 1 == $(this).attr("data-rank")) {
            b.find('.mws-answer[data-rank="2"] .mws-rank-number').text("1");
            b.find('.mws-answer[data-rank="2"]').attr("data-rank", "1");
        }
        $(this).attr("data-rank", 0);
    } else {
        if(1 < rank[a]) {
            fetch(`${$("#url_questions").val()}?question_id=${+a+1}`)
            .then((response) => {
                return response.json();
            })
            .then(function(result) {
                $(".mws-answer").remove();
                document.getElementsByTagName("main")[0].innerHTML += result.data;
                $(".mws-answer").on("click", onClickAnswer);
                next();
            });
        } else {
            $(this).find(".mws-rank-number").text(rank[a]);
            if(1 == rank[a]) {
                curRank_1 = $(this).find(".mws-aanswer-text").attr("data-type-arch");
                balls[curRank_1] += 3;
                countsarr[a] = curRank_1;
            }
            if(2 == rank[a]) {
                curRank_2 = $(this).find(".mws-aanswer-text").attr("data-type-arch");
                balls[curRank_2] += 2;
                countsarr[a] = curRank_2;
            }
            rank[a]++;
            $(this).addClass("mws-vote");
        }
    }
}

function next() {
    a = $("#current_step").val();
    $(".mws-action-prev").show();
    a++;
    $("#current_step").val(a);
    if (a >= maxSteps) {
        $(".mws-line").hide();
        start_calculated();
        $(".share-title").hide();
        setShareBtn();
        html2canvas(document.getElementById("result-questions")).then(
            function(a) {
                my_screen = a;
                my_screen.id = "canvas";
                document.getElementById("result").appendChild(my_screen);
                IMG = getImage(document.getElementById("canvas"));
                $.post("index.php/site/save", { base64data: $(IMG).attr("src") }, function(a) {
                    $("meta[property='og:image']").attr("content", domen + a);
                    $("#twitter-img").attr("content", domen + a);
                    URLIMG = a;
                    console.log(URLIMG);
                });
        });
        $("meta[property='og:title']").attr("content","\u041c\u043e\u0439 \u0430\u0440\u0445\u0438\u0442\u0438\u043f - " +label_1);
    }

    var b = $(".mws-line-no-back").width();
    $(".mws-line-no-back").animate({ width: b - stepWidth });
    $(".mws-question-step").hide();
    $(".mws-question-step-" + a).show();
}

function get_max_repeaters_value(a) {
  return (function(a) {
    return a.reduce(function(a, b) {
      var c = {};
      return Object.assign(a, ((c[b] = (a[b] || 0) + 1), c));
    }, {});
  })(void 0 === a ? "" : a);
}

function sortMapByValue(a) {
  var b = [],
    c;
  for (c in a) b.push([c, a[c]]);
  b.sort(function(a, b) {
    return b[1] - a[1];
  });
  return b;
}

function vendor_pie(a) {
  $.plot("#pie-chart", a, {
    series: {
      pie: {
        show: !0,
        innerRadius: 0.6,
        radius: 1,
        combine: { color: "#999", threshold: 0.1 },
        label: {
          show: !0,
          formatter: function(a, c) {
            return (
              '<div class="persent-arch arch-' +
              a +
              '">' +
              Math.round(c.percent) +
              "%</div>"
            );
          },
          threshold: 0.1
        }
      }
    },
    legend: { show: !0, position: "bottom", pieSliceText: "labeled" },
    grid: { hoverable: !0, clickable: !0 },
    colors: maincolors
  });
}

balls = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
countsarr = [];
curRank_2 = curRank_1 = "";
function get_result() {
  vat = get_max_repeaters_value(countsarr);
  sortVat = sortMapByValue(vat);
  sortballs = sortMapByValue(balls);
  max_balls_item_1 = sortballs[0];
  max_balls_item_2 = sortballs[1];
  max_balls_item_3 = sortballs[2];
}

three = second = first = null;

function start_calculated() {
  get_result();
  label_1 = $('.arch[data-id-arch="' + max_balls_item_1[0] + '"').text();
  label_2 = $('.arch[data-id-arch="' + max_balls_item_2[0] + '"').text();
  label_3 = $('.arch[data-id-arch="' + max_balls_item_3[0] + '"').text();
  var a =
    parseInt(max_balls_item_1[1]) +
    parseInt(max_balls_item_2[1]) +
    parseInt(max_balls_item_3[1]);
  a = 100 / parseInt(a);
  a = [
    { label: label_1, data: Math.round(a * max_balls_item_1[1]) },
    { label: label_2, data: Math.round(a * max_balls_item_2[1]) },
    { label: label_3, data: Math.round(a * max_balls_item_3[1]) }
  ];
  var b = $('.arch-desc[data-id-arch="' + max_balls_item_1[0] + '"').text(),
    c = $('.arch-desc[data-id-arch="' + max_balls_item_2[0] + '"').text(),
    d = $('.arch-desc[data-id-arch="' + max_balls_item_3[0] + '"').text(),
    h = $('.arch-desc[data-id-arch="' + max_balls_item_1[0] + '"').attr(
      "data-url-arch"
    ),
    k = $('.arch-desc[data-id-arch="' + max_balls_item_2[0] + '"').attr(
      "data-url-arch"
    ),
    l = $('.arch-desc[data-id-arch="' + max_balls_item_3[0] + '"').attr(
      "data-url-arch"
    ),
    e =
      "#" +
      $('.arch-desc[data-id-arch="' + max_balls_item_1[0] + '"').attr(
        "data-color"
      ),
    f =
      "#" +
      $('.arch-desc[data-id-arch="' + max_balls_item_2[0] + '"').attr(
        "data-color"
      ),
    g =
      "#" +
      $('.arch-desc[data-id-arch="' + max_balls_item_3[0] + '"').attr(
        "data-color"
      );
  maincolors = [e, f, g];
  vendor_pie(a);
  $(".archi-first").text(b);
  $(".archi-second").text(c);
  $(".archi-three").text(d);
  $("#name-type-1").text(label_1);
  $("#name-type-2").text(label_2);
  $("#name-type-3").text(label_3);
  $("#arch-name-1").text(label_1);
  $("#arch-name-2").text(label_2);
  $("#arch-name-3").text(label_3);
  $(".url-arch-1").attr("href", "https://alinaadt.ru/" + h);
  $(".url-arch-2").attr("href", "https://alinaadt.ru/" + k);
  $(".url-arch-3").attr("href", "https://alinaadt.ru/" + l);
  $("#result-desc-archtype-1")
    .find(".title-arch")
    .css("color", e);
  $("#result-desc-archtype-2")
    .find(".title-arch")
    .css("color", f);
  $("#result-desc-archtype-3")
    .find(".title-arch")
    .css("color", g);
}

function testDrawing() {
  var a = document.getElementById("canvas").getContext("2d");
  a.save();
  a.beginPath();
  a.moveTo(10, 10);
  a.lineTo(340, 340);
  a.stroke();
  a.restore();
}

function getImage(a) {
  a = a.toDataURL();
  var b = new Image();
  b.src = a;
  return b;
}

function saveImage(a) {
  var b = document.createElement("a");
  b.setAttribute("href", a.src);
  b.setAttribute("download", "myarchitype");
  b.click();
}

function saveCanvasAsImageFile() {
  var a = getImage(document.getElementById("canvas"));
  saveImage(a);
}

Share = {
  vkontakte: function(a, b, c, d) {
    url = "http://vkontakte.ru/share.php?";
    url += "url=" + encodeURIComponent(a);
    url += "&title=" + encodeURIComponent(b);
    url += "&description=" + encodeURIComponent(d);
    url += "&image=" + encodeURIComponent(c);
    url += "&noparse=false";
    Share.popup(url);
  },
  odnoklassniki: function(a, b) {
    url = "http://www.odnoklassniki.ru/dk?st.cmd=addShare&st.s=1";
    url += "&st.comments=" + encodeURIComponent(b);
    url += "&st._surl=" + encodeURIComponent(a);
    Share.popup(url);
    console.log(url);
  },
  facebook: function(a, b, c, d) {
    url = "http://www.facebook.com/sharer.php?s=100";
    url += "&p[title]=" + encodeURIComponent(b);
    url += "&p[summary]=" + encodeURIComponent(d);
    url += "&p[url]=" + encodeURIComponent(a);
    url += "&p[images][0]=" + encodeURIComponent(c);
    Share.popup(url);
    console.log(url);
  },
  twitter: function(a, b) {
    url = "http://twitter.com/share?";
    url += "text=" + encodeURIComponent(b);
    url += "&url=" + encodeURIComponent(a);
    url += "&counturl=" + encodeURIComponent(a);
    Share.popup(url);
    console.log(url);
  },
  mailru: function(a, b, c, d) {
    url = "http://connect.mail.ru/share?";
    url += "url=" + encodeURIComponent(a);
    url += "&title=" + encodeURIComponent(b);
    url += "&description=" + encodeURIComponent(d);
    url += "&imageurl=" + encodeURIComponent(c);
    Share.popup(url);
    console.log(url);
  },
  telegram: function(a, b, c, d) {
    url = "https://telegram. me/share/url?";
    url += "url=" + encodeURIComponent(a);
    url += "&title=" + encodeURIComponent(b);
    Share.popup(url);
    console.log(url);
  },
  popup: function(a) {
    window.open(a, "", "toolbar=0,status=0,width=626,height=436");
  }
};

function setShareBtn() {
  $("#share_vk").on("click", function() {
    $("#result-desc-archtype-1").text();
    var a = $("#name-type-1").text();
    console.log(domen + URLIMG);
    Share.vkontakte(
      domen,
      "\u041c\u043e\u0439 \u0432\u0435\u0434\u0443\u0449\u0438\u0439 \u0430\u0440\u0445\u0435\u0442\u0438\u043f - " +
        a +
        '. \u041f\u0440\u043e\u0439\u0434\u0438 \u0442\u0435\u0441\u0442 "\u0411\u0440\u0435\u043d\u0434 \u041f\u0435\u0440\u0441\u043e\u043d\u0430", \u0443\u0437\u043d\u0430\u0439 \u0431\u043e\u043b\u044c\u0448\u0435 \u043e \u0441\u0432\u043e\u0438\u0445 \u0442\u0430\u043b\u0430\u043d\u0442\u0430\u0445 \u0438 \u043a\u0430\u043a \u0438\u0445 \u043f\u0440\u0438\u043c\u0435\u043d\u0438\u0442\u044c \u0432 \u043a\u0430\u0440\u044c\u0435\u0440\u0435! ',
      domen + URLIMG,
      "\u041f\u043e\u0434\u0440\u043e\u0431\u043d\u043e\u0435 \u043e\u043f\u0438\u0441\u0430\u043d\u0438\u0435 \u0442\u0435\u0441\u0442\u0430"
    );
  });
  $("#share_face").on("click", function() {
    $("#result-desc-archtype-1").text();
    var a = $("#name-type-1").text();
    console.log(domen + URLIMG);
    Share.facebook(
      domen,
      "\u041c\u043e\u0439 \u0432\u0435\u0434\u0443\u0449\u0438\u0439 \u0430\u0440\u0445\u0435\u0442\u0438\u043f - " +
        a +
        '. \u041f\u0440\u043e\u0439\u0434\u0438 \u0442\u0435\u0441\u0442 "\u0411\u0440\u0435\u043d\u0434 \u041f\u0435\u0440\u0441\u043e\u043d\u0430", \u0443\u0437\u043d\u0430\u0439 \u0431\u043e\u043b\u044c\u0448\u0435 \u043e \u0441\u0432\u043e\u0438\u0445 \u0442\u0430\u043b\u0430\u043d\u0442\u0430\u0445 \u0438 \u043a\u0430\u043a \u0438\u0445 \u043f\u0440\u0438\u043c\u0435\u043d\u0438\u0442\u044c \u0432 \u043a\u0430\u0440\u044c\u0435\u0440\u0435! ',
      domen + URLIMG,
      "\u041f\u043e\u0434\u0440\u043e\u0431\u043d\u043e\u0435 \u043e\u043f\u0438\u0441\u0430\u043d\u0438\u0435 \u0442\u0435\u0441\u0442\u0430"
    );
  });
  $("#share_tw").on("click", function() {
    $("#result-desc-archtype-1").text();
    var a = $("#name-type-1").text();
    console.log(domen + URLIMG);
    Share.twitter(
      domen,
      "\u041c\u043e\u0439 \u0432\u0435\u0434\u0443\u0449\u0438\u0439 \u0430\u0440\u0445\u0435\u0442\u0438\u043f - " +
        a +
        '. \u041f\u0440\u043e\u0439\u0434\u0438 \u0442\u0435\u0441\u0442 "\u0411\u0440\u0435\u043d\u0434 \u041f\u0435\u0440\u0441\u043e\u043d\u0430", \u0443\u0437\u043d\u0430\u0439 \u0431\u043e\u043b\u044c\u0448\u0435 \u043e \u0441\u0432\u043e\u0438\u0445 \u0442\u0430\u043b\u0430\u043d\u0442\u0430\u0445 \u0438 \u043a\u0430\u043a \u0438\u0445 \u043f\u0440\u0438\u043c\u0435\u043d\u0438\u0442\u044c \u0432 \u043a\u0430\u0440\u044c\u0435\u0440\u0435! ',
      domen + URLIMG,
      "\u041f\u043e\u0434\u0440\u043e\u0431\u043d\u043e\u0435 \u043e\u043f\u0438\u0441\u0430\u043d\u0438\u0435 \u0442\u0435\u0441\u0442\u0430"
    );
  });
  $("#share_tele").on("click", function() {
    $("#result-desc-archtype-1").text();
    var a = $("#name-type-1").text();
    console.log(domen + URLIMG);
    Share.telegram(
      domen,
      "\u041c\u043e\u0439 \u0432\u0435\u0434\u0443\u0449\u0438\u0439 \u0430\u0440\u0445\u0435\u0442\u0438\u043f - " +
        a +
        '. \u041f\u0440\u043e\u0439\u0434\u0438 \u0442\u0435\u0441\u0442 "\u0411\u0440\u0435\u043d\u0434 \u041f\u0435\u0440\u0441\u043e\u043d\u0430", \u0443\u0437\u043d\u0430\u0439 \u0431\u043e\u043b\u044c\u0448\u0435 \u043e \u0441\u0432\u043e\u0438\u0445 \u0442\u0430\u043b\u0430\u043d\u0442\u0430\u0445 \u0438 \u043a\u0430\u043a \u0438\u0445 \u043f\u0440\u0438\u043c\u0435\u043d\u0438\u0442\u044c \u0432 \u043a\u0430\u0440\u044c\u0435\u0440\u0435! '
    );
  });
}

