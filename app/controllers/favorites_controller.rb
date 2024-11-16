class FavoritesController < ApplicationController

  def create
    @mod1 = current_user.favorites.create(blog_id: params[:blog_id])
    if request.headers["Accept"] == "application/json"
      render json: {id: @mod1.id}
    else
      redirect_to blogs_path
    end
  end

  def destroy
    current_user.favorites.find_by(id: params[:id]).destroy
    if request.headers["Accept"] == "application/json"
      render json: {}
    else
      redirect_to blogs_path
    end
  end

end
