'use strict'

const uuid = require('uuid/v4')

const loadGraduationLevels = async queryInterface => {
  try {
    return await queryInterface.sequelize.query(`SELECT id, name FROM GraduationLevels`, {
      type: queryInterface.sequelize.QueryTypes.SELECT
    })
  } catch (e) {
    console.log('Não foi possivel carregar a lista de GraduationLevels.')
    throw e
  }
}

module.exports = {
  up: async (queryInterface, Sequelize) => {
    //load GraduationLevels
    const graduationLevels = await loadGraduationLevels(queryInterface)
    let graduationLevel_ids = []
    for (const el of graduationLevels) {
      graduationLevel_ids[el.name] = el.id
    }

    //insert Courses on table
    return queryInterface.bulkInsert(
      'Courses',
      [
        {
          id: uuid(),
          name: 'GPPGR',
          description: 'curso de Gestão de Políticas Públicas em Gênero e Raça - EAD',
          graduationLevel_id: graduationLevel_ids['Especialização']
        },
        {
          id: uuid(),
          name: 'Licenciatura em Artes Visuais',
          description: 'curso de licenciatura em Artes Visuais - EAD',
          graduationLevel_id: graduationLevel_ids['Graduação']
        },
        {
          id: uuid(),
          name: 'Licenciatura em Biologia',
          description: 'curso de licenciatura em Biologia - EAD',
          graduationLevel_id: graduationLevel_ids['Graduação']
        },
        {
          id: uuid(),
          name: 'Licenciatura em Filosofia',
          description: 'curso de licenciatura em Filosofia - EAD',
          graduationLevel_id: graduationLevel_ids['Graduação']
        },
        {
          id: uuid(),
          name: 'Licenciatura em Física',
          description: 'curso de licenciatura em Física - EAD',
          graduationLevel_id: graduationLevel_ids['Graduação']
        },
        {
          id: uuid(),
          name: 'Licenciatura em História',
          description: 'curso de licenciatura em História - EAD',
          graduationLevel_id: graduationLevel_ids['Graduação']
        },
        {
          id: uuid(),
          name: 'Licenciatura em Pedagogia',
          description: 'curso de licenciatura em Pedagogia - EAD',
          graduationLevel_id: graduationLevel_ids['Graduação']
        },
        {
          id: uuid(),
          name: 'Licenciatura em Química',
          description: 'curso de licenciatura em Química - EAD',
          graduationLevel_id: graduationLevel_ids['Graduação']
        },
        {
          id: uuid(),
          name: 'Dimensões da Humanização',
          description: 'curso de aperfeiçoamento em Dimensões da Humanização - EAD',
          graduationLevel_id: graduationLevel_ids['Aperfeiçoamento']
        },
        {
          id: uuid(),
          name: 'Gestão em Saúde',
          description: 'curso de especialização Gestão em Saúde - EAD',
          graduationLevel_id: graduationLevel_ids['Especialização']
        },
        {
          id: uuid(),
          name: 'Prevenção do Uso de Drogas',
          description:
            'curso de aperfeiçoamento em Prevenção do Uso de Drogas para educadores de escolas públicas - EAD',
          graduationLevel_id: graduationLevel_ids['Aperfeiçoamento']
        },
        {
          id: uuid(),
          name: 'Direitos Humanos',
          description: 'curso de especialização em Direitos Humanos - EAD',
          graduationLevel_id: graduationLevel_ids['Especialização']
        },
        {
          id: uuid(),
          name: 'Especialização em Matemática',
          description: 'Curso de especialização em Ensino de Matemática - EAD',
          graduationLevel_id: graduationLevel_ids['Especialização']
        },
        {
          id: uuid(),
          name: 'Especialização Epidemiologia',
          description: 'curso de especialização em Epidemiologia - EAD',
          graduationLevel_id: graduationLevel_ids['Especialização']
        },
        {
          id: uuid(),
          name: 'Especialização em Educação',
          description: 'Especialização em educação, pobreza e desiqualdade',
          graduationLevel_id: graduationLevel_ids['Especialização']
        },
        {
          id: uuid(),
          name: 'Edu Pob e Desigualdade',
          description:
            'Curso de especialização em Educação, pobreza e desigualdade social, na modalidade a distância - SECADI/UFES',
          graduationLevel_id: graduationLevel_ids['Especialização']
        },
        {
          id: uuid(),
          name: 'Oratória Transversalidade e D.',
          description: 'Oratória, Transversalidade e Didática da Fala para Formação de Professores',
          graduationLevel_id: graduationLevel_ids['Especialização']
        },
        {
          id: uuid(),
          name: 'Filosofia e Psicanálise',
          description: 'Especialização Filosofia e Psicanálise',
          graduationLevel_id: graduationLevel_ids['Especialização']
        },
        {
          id: uuid(),
          name: 'Gestão Pública',
          description: 'Curso de especialização em Gestão Pública',
          graduationLevel_id: graduationLevel_ids['Especialização']
        },
        {
          id: uuid(),
          name: 'Licenciatura Letras Italiano',
          description: 'Licenciatura em Letras Italiano',
          graduationLevel_id: graduationLevel_ids['Graduação']
        },
        {
          id: uuid(),
          name: 'Especialização Ciencia e Dez',
          description: 'Especialização em ensino de ciências - anos finais do ensino fundamental - Ciência é 10!',
          graduationLevel_id: graduationLevel_ids['Especialização']
        }
      ],
      {}
    )
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('Courses', null, {})
  }
}
