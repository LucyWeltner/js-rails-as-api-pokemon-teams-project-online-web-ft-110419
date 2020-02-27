require 'faker'
class PokemonsController < ApplicationController
	def index
		pokemons = Pokemon.all 
		render json: pokemons
	end
	def show
		pokemon = Pokemon.find_by_id(params[:id])
		render json: pokemon 
	end 
	def create 
		name = Faker::Name.first_name
    	type = Faker::Games::Pokemon.name
		pokemon = Pokemon.new(nickname: name, species: type, trainer_id: params[:pokemon][:trainer_id])
		if pokemon.save
			render json: pokemon 
		else 
			render json: "{message: Pokemon not created}"
		end
	end

	def destroy
		pokemon = Pokemon.find_by_id(params[:id])
		pokemon.destroy
		render json: pokemon
	end

	private
	def ok_params
		params.require("pokemon").permit("nickname", "species", "trainer_id")
	end
end
