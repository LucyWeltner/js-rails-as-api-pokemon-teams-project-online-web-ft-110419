class CreatePokemons < ActiveRecord::Migration[6.0]
  def change
    create_table :pokemons do |t|
      t.string :species
      t.string :nickname
      t.integer :trainer_id

      t.timestamps
    end
  end
end
