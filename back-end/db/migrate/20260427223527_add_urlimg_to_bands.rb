class AddUrlimgToBands < ActiveRecord::Migration[8.1]
  def change
    add_column :bands, :urlimg, :string
  end
end
