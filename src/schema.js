import { makeExecutableSchema } from "graphql-tools";
import { resolvers } from "./resolvers";

const typeDefs = `
    type Query {
        hello: String
        greet(name: String): String
        publications(slug: String, phone: String): [Publications],
        validateLogin(phone: String, code: Int): String
    }

    type Mutation {
        createPublication(input: PublicationInput) : String,
        setLoginCode(phone: String) : String
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
        sale_price: Int
        slug: String
        tags: String
        title: String
        type: String
    }

    input PublicationInput {
        description: String
        image_link: String
        image_2: String
        image_3: String
        image_4: String
        image_5: String
        is_new: Boolean
        phone: String
        price: Int
        quantity: Int
        sale_price: Int
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