export const authManager = (state = {}, action) => {
    switch (action.type) {
        case 'SINGIN':
            return {
                ...action.payload,
                signed: true,

            };
        case 'SINGOUT':
            return { signed: false }
        default:
            return { state }
    }
}