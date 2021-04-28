import { makeExecutableSchema } from "graphql-tools";
import { resolvers } from "./resolvers";

const typeDefs = `
    type Query {
        publications(slug: String, phone: String, status: Boolean, category: String): [Publications],
        validateLogin(phone: String, code: Int): String
    }

    type Mutation {
        createPublication(input: PublicationInput) : String,
        setLoginCode(phone: String) : String,
        changeStatePublication(id: Int, status: Boolean) : String,
        changeProfileData(input: UserInput) : String
    }    
    
    type Publications {
        certificate: Boolean
        id: Int
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
        status: Boolean
        tags: String
        title: String
        user_name: String
        user_picture: String
        user_phone: String
        banner_bottom: String
        banner_top: String
        type: String
    }

    input UserInput {
        email: String
        id: Int
        name: String
        phone: String
        picture: String
        token: String
    }

    input PublicationInput {
        description: String
        id: Int
        image_link: String
        image_2: String
        image_3: String
        image_4: String
        image_5: String
        is_new: Boolean
        isEdit: Boolean
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