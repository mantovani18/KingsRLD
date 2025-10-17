# Kings League — Mini site

Site estático que apresenta resultados e tabela de uma mini-liga com 4 times.

Times:
- Los Aliens
- Los Galaticos
- Fc Revolution
- Hydra

Resultados inseridos:
- Rodada 1
  - Los Aliens 3 - 3 Hydra
  - Los Galaticos 9 - 6 Fc Revolution
- Rodada 2
  - Los Aliens 5 - 1 Fc Revolution
  - Los Galaticos 3 - 2 Hydra
- Rodada 3
  - Acontecerá domingo. Você pode inserir o resultado usando o formulário na página.

Como abrir:
1. Abra o `index.html` no seu navegador (duplo clique ou `Abrir com`).
2. A tabela será calculada automaticamente usando os resultados existentes.
Adicionar resultados (modo manual por código):
- Existem duas formas fáceis de adicionar resultados:

- 1) Editando `script.js` diretamente: abra o arquivo e adicione um objeto ao array `matches`.
  Exemplo:

```js
// adiciona um jogo na Rodada 3
matches.push({ round: 3, home: 'Los Aliens', away: 'Hydra', homeGoals: 2, awayGoals: 1 });
```

- 2) Usando os helpers no console do navegador (persistem no LocalStorage):

```js
// adicionar partida e salvar automaticamente
addMatch({ round: 3, home: 'Los Aliens', away: 'Hydra', homeGoals: 2, awayGoals: 1 });

// limpar storage e recarregar
clearMatchesStorage();
```

Imagens (logos e artilharia)
- Crie uma pasta `images` dentro do projeto (`c:\Users\pedromantovani\Desktop\Nova\images`).
- Coloque as imagens com estes nomes (sugestão):
  - `kings-logo.png` (logo da competição)
  - `los-aliens.png`
  - `los-galaticos.png`
  - `fc-revolution.png`
  - `hydra.png`
  - `artilharia.png` (imagem dos artilheiros)

PowerShell: copiar/renomear imagens
- Se você salvou as imagens anexadas na sua pasta de Downloads e quer copiá-las/renomeá-las em lote para a pasta `images`, use comandos PowerShell (ajuste os nomes de arquivo originais conforme necessário):

```powershell
# exemplo: copiar e renomear
New-Item -ItemType Directory -Force -Path .\images
Copy-Item -Path C:\Users\%USERNAME%\Downloads\alien.png -Destination .\images\los-aliens.png
Copy-Item -Path C:\Users\%USERNAME%\Downloads\galacticos.png -Destination .\images\los-galaticos.png
Copy-Item -Path C:\Users\%USERNAME%\Downloads\revolution.png -Destination .\images\fc-revolution.png
Copy-Item -Path C:\Users\%USERNAME%\Downloads\hydra.png -Destination .\images\hydra.png
Copy-Item -Path C:\Users\%USERNAME%\Downloads\kings.png -Destination .\images\kings-logo.png
Copy-Item -Path C:\Users\%USERNAME%\Downloads\artilharia.png -Destination .\images\artilharia.png
```

Observações finais:
- O site salva os resultados no LocalStorage do navegador (chave `kings_matches_v1`). Use `clearMatchesStorage()` no console para remover e recarregar.
- Se alguma imagem não existir, o layout usa um fallback simples (a imagem é escondida e o nome do time permanece visível).
Imagens locais (agora esperado)
- O projeto agora usa imagens locais na pasta `images/`. Crie `c:\Users\pedromantovani\Desktop\Nova\images` e coloque as imagens com estes nomes:
  - `kings-logo.png` (logo da competição)
  - `los-aliens.png`
  - `los-galaticos.png`
  - `fc-revolution.png`
  - `hydra.png`
  - `artilharia.png` (imagem dos artilheiros)

PowerShell rápido (exemplo)
```powershell
New-Item -ItemType Directory -Force -Path .\images
Copy-Item -Path 'C:\Users\%USERNAME%\Downloads\logo_galacticos.jpg' -Destination .\images\los-galaticos.png -Force
Copy-Item -Path 'C:\Users\%USERNAME%\Downloads\logo_aliens.png' -Destination .\images\los-aliens.png -Force
Copy-Item -Path 'C:\Users\%USERNAME%\Downloads\logo_revolution.png' -Destination .\images\fc-revolution.png -Force
Copy-Item -Path 'C:\Users\%USERNAME%\Downloads\logo_hydra.png' -Destination .\images\hydra.png -Force
Copy-Item -Path 'C:\Users\%USERNAME%\Downloads\kings.png' -Destination .\images\kings-logo.png -Force
Copy-Item -Path 'C:\Users\%USERNAME%\Downloads\artilharia.png' -Destination .\images\artilharia.png -Force
Get-ChildItem .\images
```