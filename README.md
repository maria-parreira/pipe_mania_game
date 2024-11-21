# pipe_mania_game



O que temos:
Cada célula tem um tubo com uma orientação (por exemplo, uma imagem que representa um tubo reto, curvado, etc.).
A água começa a fluir do ponto de início (onde a água começa).
A água deve verificar a orientação dos tubos nas células adjacentes (norte, sul, leste, oeste) para determinar se pode passar para essas células.
Como a água se propaga:
Detecção de células adjacentes: Quando a água chega a uma célula, precisa verificar as células vizinhas (norte, sul, leste, oeste).
Verificação de conexões: A água só pode passar de uma célula para outra se a orientação do tubo da célula atual for compatível com a orientação do tubo da célula adjacente.
Por exemplo, se a célula atual tiver um tubo de 90 graus que conecta à direita e para baixo, a água pode passar para a célula à direita e para baixo, mas não para a célula à esquerda ou para cima.
Passagem da água: Quando a água encontra uma célula adjacente que pode ser alcançada, o tubo nessa célula é atualizado para mostrar que a água chegou lá.
Água se espalha: A água continuará a se propagar para as células conectadas corretamente até que não haja mais células possíveis para a água passar.



Estrutura de Classes
1. Game
Responsável por gerenciar o estado geral do jogo, incluindo inicialização, controle do fluxo de água, lógica de vitória/derrota, e interação com o jogador.
* Propriedades:
    * grid: Grid: A grade do jogo.
    * pipeQueue: PipeQueue: A fila de peças disponíveis para o jogador.
    * startingCell: Cell: A célula de início do fluxo de água.
    * waterFlowing: boolean: Estado do fluxo de água.
    * minimumPathLength: number: O comprimento mínimo necessário para vencer.
    * gameStatus: string: O estado do jogo (em execução, vencido, perdido).
* Métodos:
    * startGame(): Inicializa o jogo.
    * placePipe(row: number, col: number, pipe: Pipe): Coloca uma peça no grid.
    * startWaterFlow(): Inicia o fluxo de água.
    * checkWinCondition(): Verifica se o jogador venceu ou perdeu.

2. Grid
Representa a grade do jogo e gerencia o estado de cada célula.
* Propriedades:
    * rows: number: Número de linhas.
    * cols: number: Número de colunas.
    * cells: Cell[][]: Matriz de células.
* Métodos:
    * initializeGrid(): Cria a grade, incluindo células bloqueadas.
    * getCell(row: number, col: number): Cell: Retorna uma célula específica.
    * isPathValid(): boolean: Verifica se o caminho atual é válido para o fluxo de água.

3. Cell
Representa uma célula individual na grade.
* Propriedades:
    * row: number: Linha da célula.
    * col: number: Coluna da célula.
    * pipe: Pipe | null: A peça de tubo colocada na célula (ou null se vazia).
    * blocked: boolean: Indica se a célula está bloqueada.
    * water: boolean: Indica se a célula contém água.
* Métodos:
    * addPipe(pipe: Pipe): Adiciona um tubo à célula.
    * removePipe(): Remove o tubo da célula.
    * isBlocked(): boolean: Retorna se a célula é bloqueada.

4. Pipe
Representa uma peça de tubo que pode ser colocada na grade.
* Propriedades:
    * type: PipeType: O tipo da peça (ex.: "straight", "curved").
    * rotation: number: A orientação da peça (fixa no momento).
    * connections: Direction[]: As direções de conexão da peça (ex.: ["up", "down"] para um tubo reto).
* Métodos:
    * connectsTo(direction: Direction): boolean: Verifica se a peça conecta-se a uma direção específica.

5. PipeQueue
Gerencia a fila de peças disponíveis para o jogador.
* Propriedades:
    * queue: Pipe[]: As peças disponíveis.
    * maxSize: number: O número máximo de peças exibidas (pode ser ilimitado).
* Métodos:
    * generatePipe(): Gera uma nova peça de tubo aleatória.
    * getNextPipe(): Pipe: Retorna a próxima peça da fila.
    * replacePipe(index: number, newPipe: Pipe): Substitui uma peça na fila.

6. WaterFlow
Gerencia o fluxo de água no grid.
* Propriedades:
    * currentCell: Cell: A célula atual onde a água está.
    * visitedCells: Cell[]: Células já visitadas pela água.
    * timer: number: O tempo entre cada passo do fluxo.
* Métodos:
    * startFlow(startingCell: Cell): Inicia o fluxo de água a partir de uma célula.
    * stepFlow(): Executa o próximo passo do fluxo, movendo a água para a próxima célula.
    * isFlowValid(cell: Cell): boolean: Verifica se a próxima célula é válida.   —————————————————  Fluxo Principal
    * 
* Inicialização do Jogo:
    * O Game inicializa o Grid e a PipeQueue.
    * Define a célula de início (startingCell) e garante que ela atenda às condições de posição.
* Interação do Jogador:
    * O jogador seleciona uma célula e coloca uma peça de tubo usando Game.placePipe().
* Fluxo de Água:
    * O método startWaterFlow() no Game inicia o fluxo de água.
    * A classe WaterFlow é usada para gerenciar o fluxo, preenchendo uma célula após a outra com base nas conexões dos tubos.
* Condições de Vitória/Derrota:
    * O método checkWinCondition() verifica se o caminho de tubos é válido e se a água atingiu o comprimento mínimo necessário ou se houve um erro.
    * 
