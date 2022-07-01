const dotenv = require('dotenv')

const config = {
    ...dotenv.config().parsed,
    ...dotenv.config({ path: '.env.local' }).parsed,
}

module.exports = {
    client: {
        addTypename: true,
        includes: ['**/*.ts', '**/*.tsx'],
        name: 'grasp-backend',
        service: {
            url: config.NEXT_PUBLIC_API_URI,
            // localSchemaFile: 'schema.gql',
            name: 'grasp',
        },
    },
}
