class BandsController < ApplicationController
  def index
     bands = Band.all
     render json: bands
  end
  def show
     band = Band.find(params[:id])
     render json: band
  end
  def create
     band = Band.create(band_params)
     render json: band
  end
  def update
     band = Band.find_by(id: params[:id])
     band.update(band_params)
     render json: band
  end
  def destroy
     band = Band.find_by(id: params[:id])
     band.destroy
  end
  private
  def band_params
     params.require(:band).permit(:id, :name, :description)
  end
end