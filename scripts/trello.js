 $(function () {
     var list_button_content = $(".list-button-content");
     var list_button_modal = $("#list-button-modal");
     var card_modify_modal = $(".card-modify-modal")
     var select_list_cards;
     var createList = $("#createList");
     var pTxt;

     $(createList).bind("keydown", function (e) {
         var code = e.keyCode || e.which;
         if (code == 13) {
             var newList = first_part + $(createList).val() + seccond_part
             $(createList).parent("div").before(newList)
             $(createList).val("");
         }
         $("body").animate({
             scrollLeft: 100000
         });
         dragAndDrop()
     })
     var first_part ='<div class="list-cards-margin"><div class="list-layout list-header list-layout"><span class="modal-close list-close">&times;</span><p>'
     var seccond_part ='</p></div><div class="list-cards"></div><div class="list-button"><span>新增卡片</span></div>'
     $(document).on("click", ".list-header>.list-close", function () {
         $(this).closest(".list-cards-margin").remove();
     })
     $(document).on("click", ".list-card>.list-close", function () {
         $(this).closest(".list-card").remove();
     })
     $(document).on("click", ".list-button>span", function () {
         select_list_cards = $(this).parents("div.list-cards-margin");
         $(list_button_modal).css({
             "display": "block"
         })
     })
     $(list_button_modal).find(".modal-close").on("click", function () {
         close_modal()
     })
     $(window).on("click", function (e) {
         if (e.target.id == "list-button-modal" || e.target.id == "card-modify-modal"||e.target.id == "change-board-name" ) {
             close_modal()
         }
     })
     close_modal = function () {
         $(list_button_modal).css({
             "display": "none"
         })
         $(card_modify_modal).css({
             "display": "none"
         })
		$("#change-board-name").css({
		 "display":"none"
		})
     }
     $(list_button_content).on("click", function () {
         var select_Item;
         var input_card;
         select_Item = $(this).text();
         input_card =
             '<div class="list-card"><span class="modal-close list-close">&times;</span><span class="card-modify"><?xml version="1.0" ?><svg viewBox="0 0 16 16" xmlns="http://www.w3.org/2000/svg"><defs></defs><title/><g data-name="Layer 2" id="Layer_2"><g data-name="Layer 1" id="Layer_1-2"><rect class="cls-1" height="4.86" transform="translate(-3.77 7.81) rotate(-45)" width="11.44" x="1.83" y="6.02"/><path class="cls-2" d="M15.73,2.4,13.6.27a.93.93,0,0,0-1.31,0L11.11,1.45l3.44,3.43,1.18-1.18A.93.93,0,0,0,15.73,2.4Z"/><path class="cls-2" d="M0,15.28A.61.61,0,0,0,.72,16L4,15.45.55,12Z"/></g></g></svg></span><p>' +
             select_Item + '</p></div>'
         if ($(select_list_cards).find(".list-card").length == 0) {
             $(select_list_cards).find(".list-cards").prepend(input_card);
         } else {
             $(select_list_cards).find(".list-card").first().before(input_card);
         }

     })
     $(document).on("click", ".list-card svg", function () {
         var top = $(this).closest(".list-card").offset().top - $(window).scrollTop(); ;
         var left = $(this).closest(".list-card").offset().left - $(window).scrollLeft(); ;
         $(card_modify_modal).css({
             "display": "block",
         })
         $(".card-modify-content").css({
             "top": top,
             "left": left,
         })
         pTxt = $(this).closest(".list-card").find("p");
         $(card_modify_modal).find("textarea").val($(pTxt).text().replace(/\s/g, '')).focus();
     })
     $(".btn-modify-input").on("click", function () {
         $(pTxt).text($(card_modify_modal).find("textarea").val())
         close_modal()
     })
     $(".btn-modify-close").on("click", function () {
         close_modal()
     })
    

 })
 $(function () {
     var myModal = $("#myModal")
     var new_board = $("#new-board")
     $(new_board).on("click", function () {
         var top = $(new_board).offset().top + $(new_board).innerHeight();
         var left = $(new_board).offset().left;
         $(myModal).css({
             "top": top,
             "left": left,
             "display": "block"
         }).find("input[name=name]").focus()
     });
     $(".modal-close").on("click", function () {
         $(".new-board-model").css({
             "display": "none"
         })
     })
     $(myModal).find("input[type=submit]").on("click", function () {
         var input = $(myModal).find("input[name=name]").val();
         var mHtml = (
             '<div class="col-xs-3 col-sm-3 col-md-3 col-lg-3"> <span class="list-board-close">&times;</span><div class="board-inline-block"><a href="' + path + "#" + input + '" class=" btn  list-board"><span class="text-center" >' +
             input +
             '</span></a></div></div>')
         if ($("#DDS").find(".col-xs-3").length == 0) $("#DDS").prepend(mHtml)
         else $("#DDS").find(".col-xs-3").last().after(mHtml)
         $(myModal).css({
             "display": "none"
         })
         dragAndDrop()
         $(myModal).find("input[name=name]").val("")

         return false;
     })
     $(document).on("click", ".list-board-close", function () {
         $(this).closest(".col-xs-3").remove();
         return false;
     })
	 
	 
 })
 $(function () {
     $(".lcard-modify").on("click", function () {
         $(this).replaceWith("<textarea>" + $(this).find("p").text() + "</textarea>")
     })
 })



 $(document).on("mouseenter", ".list-card svg", function () {
     $(this).find(".cls-1").toggleClass("svg-hover")
     $(this).find(".cls-2").toggleClass("svg-hover")
 });

 $(document).on("mouseleave", ".list-card svg", function () {
     $(this).find(".cls-1").toggleClass("svg-hover")
     $(this).find(".cls-2").toggleClass("svg-hover")
 });

 function txt(e) {
     $(e).css({
         'height': 'auto',
         'overflow-y': 'hidden'
     }).height(e.scrollHeight);
 }
 $('textarea').each(function () {
     txt(this);
 }).on('input', function () {
     txt(this);
 });
 var path = window.location.origin + "/page2.html";
 document.title = window.location.hash.substr(1);