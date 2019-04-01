$(document).on('turbolinks:load', function() {
  var search_list = $("#user-search-result");

  function appendUser(user) {
    var html = `<div class="chat-group-user clearfix">
                  <p class="chat-group-user__name">${ user.name }</p>
                  <a class="user-search-add chat-group-user__btn chat-group-user__btn--add" data-user-id="${ user.id }" data-user-name="${ user.name }">追加</a>
                </div>`
    search_list.append(html);
  }

  function appendErrMsgToHTML(msg) {
    var html = `<div class='chat-group-user clearfix'>${ msg }</div>`
    search_list.append(html);
  }

  function appendUserToGroup(user_id, user_name) {
    var html = `<div class='chat-group-user clearfix js-chat-member' id='chat-group-user-${ user_id }'>
                  <input name='group[user_ids][]' type='hidden' value='${ user_id }' class='chat-group-user__id'>
                  <p class='chat-group-user__name'>${ user_name }</p>
                  <a class='user-search-remove chat-group-user__btn chat-group-user__btn--remove js-remove-btn'>削除</a>
                </div>`
    return html;
}

  $(".chat-group-form__input").on("keyup", function() {
    var input = $(this).val();
    var name = [];
    $(".chat-group-user__id").each(function() {
      name.push($(this).val());
    })
    $.ajax({
      type: 'GET',
      url: '/users/search',
      data: { keyword: input, name: name},
      dataType: 'json'
    })

    .done(function(users) {
      $("#user-search-result").empty();
      if (users.length !== 0 && input.length !== 0) {
        users.forEach(function(user){
          appendUser(user);
        });
      }
      else {
        appendErrMsgToHTML("一致するユーザーはいません");
      }
    })
    .fail(function() {
      alert('ユーザー検索に失敗しました');
    })
  });

  $(document).on('click', '.user-search-add', function() {
    var user_id = $(this).data('user-id');
    var user_name = $(this).data("user-name");
    var html = appendUserToGroup(user_id, user_name);
    $('#chat-group-users').append(html);
    $(this).parent().remove();
  });

  $(document).on('click', '.user-search-remove', function() {
    $(this).parent().remove();
  });
})
