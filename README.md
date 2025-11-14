# Comprar — App de Lista de Compras

Aplicativo móvel simples em React Native + TypeScript para gerenciar uma lista de compras: adicionar itens, marcar como comprado/pendente, remover itens e limpar a lista. Dados persistem localmente com AsyncStorage.

## Recursos

- Adicionar item com descrição
- Marcar item como "Comprado" ou "Pendente"
- Remover item
- Limpar toda a lista
- Filtrar itens por status (Pendentes / Comprados)
- Persistência local usando `@react-native-async-storage/async-storage`

## Pré-requisitos

- Node.js (recomendado >= 14)
- Yarn ou npm
- Android Studio / Xcode ou dispositivo físico para executar o app
- (Opcional) Expo CLI se o projeto estiver configurado com Expo

## Instalação

No diretório do projeto:

fish shell (exemplo):

- Usando npm
  npm install

- Usando yarn
  yarn install

## Executando o app (desenvolvimento)

Comandos genéricos — confira `package.json` e ajuste conforme necessário:

- Iniciar bundler / Metro
  npm run start

  # ou

  yarn start

- Executar no Android (React Native CLI)
  npm run android

  # ou

  yarn android

- Executar no iOS (macOS + Xcode)
  npm run ios
  # ou
  yarn ios

Se o projeto for Expo, use:

expo start

## Estrutura do projeto (resumo)

- `src/app/Home` — Tela principal (formulário para adicionar itens, filtros e lista)
- `src/components` — Componentes reutilizáveis:
  - `Button`, `Inputs`, `Filter`, `Item`, `StatusIcon`
- `src/storage` — Helpers para AsyncStorage (`get`, `add`, `remove`, `save`, `clearAllItems`, `toggleStausItems`)
- `src/types/FilterStatus.ts` — enum de status (`DONE`, `PENDING`)
- `assets/` — imagens (logo)

## Observações técnicas importantes

- O estado dos itens é tipado como:
  `{ id: string; description: string; status: FilterStatus }`

- Ao adicionar um item o `status` deve ser `FilterStatus.PENDING` por padrão.

- `setState` em React é assíncrono — caso precise do novo array imediatamente, compute e use-o dentro da função de atualização do estado:

```tsx
setItems((prev) => {
  const next = [...prev, newItem];
  // usar `next` aqui para logs/ações
  return next;
});
```

- O `FlatList` deve receber `data={items}` para renderizar a lista atual.

- Verifique que o mapeamento status ↔ ícone/texto esteja consistente em `StatusIcon` e `Filter` (ex.: `DONE` ↔ "Comprados" ↔ ícone de check).

## Persistência (AsyncStorage)

Utilize os utilitários em `src/storage/index.ts` para ler e gravar os itens localmente. Funções úteis:

- `itemsStorage.get()` — obter todos os itens
- `itemsStorage.getByStatus(status)` — obter por status
- `itemsStorage.add(newItem)` — adicionar e salvar
- `itemsStorage.remove(id)` — remover por id e salvar
- `itemsStorage.clearAllItems()` — limpar armazenamento
- `itemsStorage.toggleStausItems(id, status)` — atualizar status de um item

## Testes manuais e depuração

- Limpar armazenamento: chamar `itemsStorage.clearAllItems()` em console/terminal de depuração ou usar o botão "Limpar" na UI (se implementado)
- Ver logs no Metro / console do dispositivo para verificar fluxos de add/remove/toggle

## Contribuição

1. Fork e clone o repositório
2. Criar branch com `feature/` ou `fix/`
3. Implementar alterações e testar em dispositivos/emuladores
4. Abrir PR descrevendo mudanças

## Licença
