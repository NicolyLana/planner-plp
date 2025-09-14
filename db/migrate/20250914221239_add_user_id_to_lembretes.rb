class AddUserIdToLembretes < ActiveRecord::Migration[7.1]
  def change
    add_reference :lembretes, :user, null: true, foreign_key: true
  end
end
