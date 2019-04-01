$(function(){

  $(document).on('turbolinks:load', function() {
    function buildMessageHTML(message){
      var imageHTML = (message.image) ? `<img src=${message.image}>` : '';
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
                      ${ imageHTML }
                    </div>
                  </div>`
                return html;
    }
    $('#form__new').on('submit', function(e){
      e.preventDefault();
      var formData = new FormData(this);
      var url = $(this).attr('action')
      $.ajax({
        url: url,
        type: "POST",
        data: formData,
        dataType: 'json',
        processData: false,
        contentType: false
      })
       .done(function(newMessage){
         var html = buildMessageHTML(newMessage);
         $('.messages').append(html);
         $('.messages').animate({scrollTop: $('.messages')[0].scrollHeight}, 'fast');
         $('form')[0].reset();
       })
        .fail(function(){
          alert('error');
        });
        return false;
    });



    setInterval(update, 5000);

    var update = function() {
      var message_id = ($('.message')[0]) ? $('.message:last').data('id') : 0
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
      }
    }
  });
});
