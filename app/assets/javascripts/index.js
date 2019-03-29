$(function() {

  function buildMessagesHTML(message) {
    if(message.image) {
      var image = 'src=${message.image} '
    } else {
      var image = ''
    }
    var html = `<div class="message" data-id=${ message.id }>
                  <div class="message__info">
                    <div class="message__info__user">
                      ${ message.user_name }
                    </div>
                    <div class="message__info__time">
                      ${ message.date }
                    </div>
                  </div>
                  <div class="message__text">
                    <p class="lower-message__content">
                      ${ message.content }
                    </p>
                    <img class="lower-message__image" ${ image }>
                  </div>
                </div>`
              return html;
  }


  setInterval(update, 5000);

  var update = function() {
    if($('.message')[0]) {
      var message_id = $('.message:last').data('id');
    } else {
      var message_id = 0
    }


    if(document.URL.match('/messages')){
      $.ajax({
        url: location.href,
        type: 'GET',
        data: { message: { id: message_id } },
        dataType: 'json'
      })
      .done(function(message) {
        if(message.length >= 1){
          message.forEach(function(message) {
            var html = buildMessagesHTML(message);
            $('.messages').append(html);
          })
            $('.messages').animate({scrollTop: $('.messages')[0].scrollHeight}, 'fast');
        }
      })
      .fail(function(){
        alert('error');
      });
      return false;
    }
  }
})
