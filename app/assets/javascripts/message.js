$(function(){
  function buildMessageHTML(message){
    if (message.image) {
      var html = `<div class="message">
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
                    </div>
                    <asset_path src=${message.image} >
                  </div>`
                return html;
    } else {
      var html = `<div class="message">
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
                    </div>
                  </div>`
              return html;
              };
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
       var html = buildMassegeHTML(newMessage);
       $('.messages').append(html);
       $('.messages').animate({scrollTop: $('.messages')[0].scrollHeight}, 'fast');
       $('form')[0].reset();
     })
      .fail(function(){
        alert('error');
      });
      return false;
  });
});
