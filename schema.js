const { makeExecutableSchema } = require("graphql-tools");
const resolvers = require("./resolvers");

const typeDefs = `
    type Query {
        publications(slug: String, phone: String, status: Boolean, category: Int, subcategory: Int, Order: Boolean): [Publications],
        validateLogin(phone: String, code: Int): String
    }

    type Mutation {
        createPublication(input: PublicationInput) : String,
        setLoginCode(phone: String) : String,
        changeStatePublication(id: Int, status: Boolean) : String,
        changeProfileData(input: UserInput) : String
    }    
    
    type Publications {
        accept_changues: Boolean
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
        category: Int
        subcategory: Int
        views: Int
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
        accept_changues: Boolean
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
        category: Int
    }
`;

const a = makeExecutableSchema({
    typeDefs,
    resolvers
})

module.exports = a