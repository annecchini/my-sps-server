# Questões sobre o uso do paranoid

- Precisei criar um campo virtual isActive pois não consigo fazer uniqueKey com 'deletedAt' com valor null.
- Uso a uniqueKey com is Active para garantir que possam existir vários itens "unicos" mas apenas 1 ativo. Substituindo "unique" em um atributo.
- Nos hooks beforeDestroy do modelos exitem procedimentos para emular onDelete "RESTRICT" e "CASCADE"/"SET NULL". Apesar de mais complicado, Estão lá pois:
  - Fazem as verificações para todos os modelos envolvidos. (validateDelete)
  - Propagam as mudanças para todos os modelos envolvidos. (transação para deletar ou setar Null)

# GlobalAdmin

- Usar findOrCreate ou só create? (Está create por enquanto.)

# Usar contexto no sistema de permissões?

- Criei usando contexto para ficar mais evidente
- Acredito que dessa forma posso criar outros contextos no futuro.

# Como as permissões estão funcionando. Por hora de duas formas:

- usando middleware para admin e permissões globais.
- dentro das apis (validatePermission) quando preciso recuperar o course_id de um modelo.
- fiz dessa forma pois gerar o modelo a partir da url estava falho e ineficiente.
