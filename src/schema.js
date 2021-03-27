import { makeExecutableSchema } from "graphql-tools";
import { resolvers } from "./resolvers";

const typeDefs = `
    type Query {
        hello: String
        greet(name: String): String
        publications(slug: String): [Publications]
    }

    type Mutation {
        createPublication(input: PublicationInput) : [Publications],
        setLoginCode(phone: String, login_code: Int) : String
    }
    
    type Publications {
        is_new: Boolean
        description: String
        image_2: String
        image_3: String
        image_4: String
        image_5: String
        image_link: String
        price: Int
        quantity: Int
        sale_price: String
        slug: String
        tags: String
        title: String
        type: String
    }

    input PublicationInput {
        is_new: Boolean
        description: String
        image_link: String
        price: Int
        quantity: Int
        sale_price: String
        slug: String
        tags: String
        title: String
        type: String
    }
`;

export default makeExecutableSchema({
    typeDefs,
    resolvers
})