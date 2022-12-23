const allFavPlace = {
    response: {
        200: {
            type: 'array',
            items: {
                type: 'object',
                required: ['id','name'],
                propeties: {
                    id: {type: 'string'},
                    name: {type: 'string'}
                }
            }
        }
    }
}