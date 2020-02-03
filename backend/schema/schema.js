const graphql = require('graphql');
const axios = require('axios');

const {
    GraphQLObjectType,
    GraphQLString,
    GraphQLList,
    GraphQLSchema
} = graphql;

const DateType =  new GraphQLObjectType ({
    name: 'Date',
    fields: {
        id: { type: GraphQLString },
        date: { type: GraphQLString }
    }
});

const FruitType =  new GraphQLObjectType ({
    name: 'Fruit',
    fields: {
        id: { type: GraphQLString },
        name: { type: GraphQLString },
        sold: { type: GraphQLString },
        salesDateId: { type: GraphQLString }
    }
});

const SalesDateType = new GraphQLObjectType ({
    name: 'SalesDate',
    fields: {
        id: { type: GraphQLString },
        date: { type: GraphQLString },
        fruits: {
            type: new GraphQLList(FruitType),
            resolve(parentValue, args) {
                return axios.get(`http://localhost:3000/salesDates/${parentValue.id}/fruits `)
                  .then(res => res.data)
            } 
        }
    }
});

const RootQuery = new GraphQLObjectType({
    name: 'RootQueryType',
    fields: {
        saleDate: {
            type: SalesDateType,
            args: { 
                id: {type: GraphQLString}
            },
            resolve(parentValue, args) {
                return axios.get(`http://localhost:3000/salesDates/${args.id}`)
                  .then(res => res.data)
            }  
        },
        fruit: {
            type: FruitType,
            args: {
                id: {type: GraphQLString},
            },
            resolve(parentValue, args) {
                return axios.get(`http://localhost:3000/fruits/${args.id}`)
                .then(res => res.data)
            }
         },
         allSaleDates: {
             type: new GraphQLList(DateType),
             resolve(parentValue, args) {
                return axios.get(`http://localhost:3000/salesDates/`)
                  .then(res => res.data)
            } 
         }
    }
});

module.exports = new GraphQLSchema({
    query: RootQuery
});