class MetasController < ApplicationController
  before_action :set_meta, only: %i[show edit update destroy]
  before_action :authenticate_user!

  # GET /metas
  def index
  status_concluido = Status.find_by(nome: 'Concluído')
  status_concluido_id = status_concluido&.id || -1
  @metas_por_data = current_user.metas.where.not(status_id: status_concluido_id).group_by(&:data_inicio)
    
    respond_to do |format|
      format.html
      format.json { render json: @metas_por_data }
    end
  end
  

  # metas_controller.rb
  def marcar_como_concluida
    @meta = Meta.find(params[:id])
    status_concluido = Status.find_by(nome: 'Concluído')
    if status_concluido.nil?
      render json: { success: false, message: 'Status "Concluído" não encontrado.' }, status: :unprocessable_entity
      return
    end
    if @meta.update_column(:status_id, status_concluido.id)
      render json: { success: true, message: 'Meta concluída com sucesso!' }
    else
      render json: { success: false, message: 'Erro ao concluir a meta.' }
    end
  end
  
  # GET /metas/:id
  def show
  end

  # GET /metas/new
  def new
    @categorias = Categoria.all # Pegue todas as categorias do banco
    @meta = Meta.new
  end

  # GET /metas/:id/edit
  def edit
  end

  # POST /metas
  def create
    @meta = current_user.metas.new(meta_params)

    if @meta.save
      redirect_to home_path, notice: 'Meta foi criada com sucesso.'
    else
      render :new, status: :unprocessable_entity
    end
  end

  # PATCH/PUT /metas/:id
  def update
    if @meta.update(meta_params)
      if request.xhr? || request.format.json?
        render json: { success: true, message: 'Meta atualizada com sucesso.' }
      else
        redirect_to meta_path(@meta), notice: 'Meta foi atualizada com sucesso.'
      end
    else
      if request.xhr? || request.format.json?
        render json: { success: false, errors: @meta.errors.full_messages }, status: :unprocessable_entity
      else
        render :edit, status: :unprocessable_entity
      end
    end
  end

  # DELETE /metas/:id
  def destroy
    @meta.destroy
    redirect_to metas_url, notice: 'Meta foi removida com sucesso.'
  end

  private

  # Use callbacks para compartilhar configurações ou restrições comuns entre as ações.
  def set_meta
    @meta = Meta.find(params[:id])
  end

  # Apenas permita uma lista de parâmetros confiáveis.
  def meta_params
    params.require(:meta).permit(:descricao, :data_inicio, :data_fim, :status_id, :categoria_id)
  end
end
