import { GraphQLSchema, GraphQLObjectType, GraphQLString } from 'graphql';

const userModel = new GraphQLSchema({
    query: new GraphQLObjectType({
        name: 'User',
        fields: {
            hello: {
                type: GraphQLString,
                resolve: () => 'world',
            },
        },
    })
});

export default userModel