class TarefasController < ApplicationController
  before_action :set_tarefa, only: %i[show edit update destroy]
  before_action :authenticate_user!

  def new
    @categorias = Categoria.all
    @tarefa = Tarefa.new
  end

  # GET /tarefas
  def index
  status_concluido = Status.find_by(nome: 'Concluído')
  status_concluido_id = status_concluido&.id || -1
  @tarefas_por_data = current_user.tarefas.where.not(status_id: status_concluido_id).group_by(&:data) # Ignora tarefas concluídas

    respond_to do |format|
      format.html
      format.json { render json: @tarefas_por_data }
    end
  end

  # GET /relatorio
  def relatorio
    @tarefas_por_turno = Tarefa.where(status_id: 3).group(:turno).count
  end

  # GET /tarefas/:id
  def show
  end

  # GET /tarefas/new
  def new
    @tarefa = Tarefa.new
    @categorias = Categoria.all # Garante que as categorias estejam disponíveis para o formulário
  end

  # GET /tarefas/:id/edit
  def edit
    @categorias = Categoria.all # Incluindo categorias também no edit
  end

  # POST /tarefas
  def create
    @tarefa = current_user.tarefas.new(tarefa_params)
    @tarefa.status_id = Status.find_by(nome: 'Pendente')&.id || default_status_id

    if @tarefa.save
      redirect_to home_path, notice: 'Tarefa foi criada com sucesso.'
    else
      @categorias = Categoria.all # Garante que categorias estejam disponíveis ao renderizar o formulário
      render :new, status: :unprocessable_entity
    end
  end

  # PATCH/PUT /tarefas/:id
  def update
    if @tarefa.update(tarefa_params)
      redirect_to @tarefa, notice: 'Tarefa foi atualizada com sucesso.'
    else
      @categorias = Categoria.all # Garante que categorias estejam disponíveis ao renderizar o formulário
      render :edit, status: :unprocessable_entity
    end
  end

  # DELETE /tarefas/:id
  def destroy
    @tarefa.destroy
    redirect_to tarefas_url, notice: 'Tarefa foi removida com sucesso.'
  end

  # Marcar tarefa como concluída
  def marcar_como_concluida
    @tarefa = Tarefa.find_by(id: params[:id])

    if @tarefa.nil?
      render json: { success: false, message: 'Tarefa não encontrada.' }, status: :not_found
      return
    end

    status_concluido = Status.find_by(nome: 'Concluído')
    if status_concluido.nil?
      render json: { success: false, message: 'Status "Concluído" não encontrado.' }, status: :unprocessable_entity
      return
    end

    if @tarefa.update_column(:status_id, status_concluido.id)
      render json: { success: true, message: 'Tarefa marcada como concluída.' }
    else
      render json: { success: false, message: 'Erro ao marcar como concluída.' }, status: :unprocessable_entity
    end
  end

  private

  def set_tarefa
    @tarefa = Tarefa.find(params[:id])
  end

  # Certifique-se de permitir o parâmetro :turno
  def tarefa_params
    params.require(:tarefa).permit(:data, :descricao, :bloco, :categoria_id, :status_id, :turno)
  end

  def default_status_id
    1 # Defina um ID padrão para o status
  end
end
