# scouthandebol
Aplicativo PWA (Progressive Web App) para registro estatístico de handebol ao vivo, em quadra, feito para uso rápido em tablet ou celular durante a partida.


O que o app faz

O Scout Handebol permite que uma única pessoa registre, durante o jogo, as ações de cada atleta em quadra com poucos toques — sem menus, sem popups, sem perder tempo — e gera estatísticas completas (tabelas e gráficos) ao final.

Principais funcionalidades

Cadastro de equipe


Nome da equipe e elenco (número, nome, posição, marcação de goleiro)
Campo de nome sempre em branco ao abrir (não guarda nome de sessões anteriores)
Botão de "Limpar equipe e recomeçar do zero" com confirmação


Novo jogo


Tela sempre começa vazia — nenhum nome pré-carregado
Botão "+ Adicionar atleta" abre lista pra escolher quem é convocado
Escolha dos 7 titulares que começam em quadra
Atalhos "Marcar todos" / "Excluir todos"


Scout ao vivo (o coração do app)
Cada atleta convocado (em quadra ou banco) tem um painel sempre aberto, sem cliques extras, com:

CategoriaItensAtaqueArremesso por zona (6M, 9M, Ponta, Contra-ataque) → Gol/Erro · Assistência · Perda de bola (passe errado, passe certo, andada, falta de ataque) · Falta técnicaDefesaRoubo de bola · Bloqueio · Falta cometida/recebidaDisciplinarAdvertência (máx. 1) · Exclusão (máx. 3) · Desqualificação (máx. 1) · Desqualificação + Azul (máx. 1) — limites automáticos por atletaGoleiro (se marcado)Defesa por zona (Ponta Esq., Ponta Dir., Pivô/6m, Armador/9m, 7m) → Defendida/Sofrida


Cada botão mostra o número em tempo real ao lado do nome
Botão "−" em cada item específico (corrige clique errado sem afetar os outros)
Botão "↩ Desfazer" por atleta (remove a última ação lançada, ajusta placar se necessário)
Quem sai por substituição continua visível na lista (marcado como "BANCO"), pra comparar rendimento e decidir quem volta
Substituição funciona nos dois sentidos: tocar no atleta em quadra (⇄ Sub) ou no atleta do banco (▶ Entrar)
Placar com ajuste manual (+/−), atualizado automaticamente em gols e gols sofridos


Quadra tática (SVG, desenhada em código — funciona 100% offline)


Bolinhas de handebol verde-limão representando os titulares, com nome e número
Bolinhas vermelhas representando o adversário (7, com a sigla da posição dentro — não temos elenco do time rival)
Ambas arrastáveis por toque (mouse, dedo no tablet/celular), livres por toda a quadra
Bolas vermelhas sempre visíveis, mesmo sem partida em andamento (posição salva à parte)
Posição arrastada persiste entre telas e após substituições
Mini gráfico de barras (gols por zona) grudado em cada atleta em quadra — acompanha a bolinha ao arrastar


Estatísticas completas


Tabelas: Ataque, Defesa, Goleiros, Disciplinar
Gráfico de barras horizontais coloridas — gols por zona, um por atleta
Legenda de siglas (6M, 9M, PTA, C.A) no final da página


Histórico de jogos


Lista de jogos finalizados com placar e data
Exclusão individual de jogo, com confirmação


Outros detalhes


Confirmação (Sim/Não) ao encerrar jogo — não é mais o alerta padrão do navegador
Som de clique em qualquer botão/toque do app
Melodia ao abrir o app e ao fechar (Web Audio API), com botão de mudo 🔊/🔇
Rodapé fixo com crédito da autora, visível em todas as páginas
Botão "← Voltar" em todas as telas (exceto Home, que é a tela raiz)
App sempre abre direto na Home (com a quadra), sem depender de cadastro completo



Tecnologia


Arquivo único: index.html — HTML + CSS + JavaScript puro, sem frameworks, sem dependências externas
PWA instalável: manifest embutido (base64), funciona como app nativo (tela cheia, ícone)
Offline-first: sw.js (Service Worker) cacheia os arquivos; funciona sem internet durante o jogo
Armazenamento: localStorage do navegador — todos os dados (equipe, jogos, formação) ficam salvos no próprio dispositivo, sem servidor
Gráficos: SVG desenhado diretamente em JavaScript (nenhuma biblioteca externa)


Como instalar


Suba index.html e sw.js juntos (mesma pasta) no GitHub Pages ou qualquer hospedagem estática
Abra o link no navegador do tablet/celular
Use o menu do navegador → "Adicionar à tela inicial" / "Instalar app"


Fluxo de uso recomendado


Editar Atletas → cadastra o elenco (uma vez só)
Novo Jogo → escolhe adversário, convoca quem joga, define os 7 titulares
Durante o jogo → toca nos botões de cada atleta conforme as ações acontecem; arrasta as bolinhas na quadra pra representar a tática
Substituições → toca em "⇄ Sub" (quem sai) ou "▶ Entrar" (quem está no banco)
Encerrar jogo → confirma, e o jogo vai pro histórico
Ver Estatísticas Completas → consulta tabelas e gráficos a qualquer momento, durante ou depois do jogo


Regra de manutenção do projeto

Toda alteração em index.html deve vir acompanhada do incremento da versão do cache em sw.js (CACHE_NAME), e os dois arquivos devem ser publicados juntos. Isso garante que o navegador sempre carregue a versão mais recente do app.
