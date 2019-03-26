class UsersController < ApplicationController


  def index
  end

  def edit
  end

  def search
    @users = User.where('name LIKE(?)', "%#{params[:keyword]}%").where.not(id: params[:name])
    respond_to do |format|
      format.html
      format.json
    end
  end

  def update
    if current_user.update(user_params)
      redirect_to root_path
    else
      render :edit
    end
  end

  private

  def user_params
    params.require(:user).permit(:id, :name, :email, :group_id)
  end


end
