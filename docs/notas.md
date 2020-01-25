# Questões sobre o uso do paranoid

- Precisei criar um campo virtual isActive pois não consigo fazer uniqueKey com 'deletedAt' com valor null.
- Uso a uniqueKey com is Active para garantir que possam existir vários itens "unicos" mas apenas 1 ativo. Substituindo "unique" em um atributo.
- Nos hooks beforeDestroy do modelos exitem procedimentos para emular onDelete "RESTRICT" e "CASCADE"/"SET NULL". Apesar de mais complicado, Estão lá pois:
  - Fazem as verificações para todos os modelos envolvidos. (validateDelete)
  - Propagam as mudanças para todos os modelos envolvidos. (transação para deletar ou setar Null)

# GlobalAdmin

- Usar findOrCreate ou só create? (Está create por enquanto.)

# Usar contexto no sistema de permissões?

- ???
