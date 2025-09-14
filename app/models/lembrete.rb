class Lembrete < ApplicationRecord
    belongs_to :user
    has_one :tarefa

    validates :data, presence: true
    validates :descricao, presence: true
end
