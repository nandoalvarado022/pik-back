const { makeExecutableSchema } = require("graphql-tools");
const resolvers = require("./resolvers");

const typeDefs = `
    type Query {
        publications(slug: String, phone: String, status: Boolean, category: Int, subcategory: Int, order: Boolean): [Publication]
        validateLogin(phone: String, code: Int): String
        getCoins(user: Int): [Coin]
        getNotifications(user: Int) : [Notification]
        getTransactions(user: Int) : [Transaction]
    }

    type Mutation {
        createPublication(input: PublicationInput) : String
        setLoginCode(phone: String) : String
        changeStatePublication(id: Int, status: Boolean) : String
        changeProfileData(input: UserInput) : String
        createTransaction(user: Int, user_to: Int, publication: Int, type: String) : String
        transactionConfirmed(id: Int) : String
        createNotification(user: Int, detail: String, coins: Int) : String
        deleteNotification(id: Int) : String
    }    

    type Transaction {
        created: String
        detail: String
        id: Int
        status: Int
        type: String
        u_name: String
        user: Int
        user_to: Int
    }

    type Coin {
        id: Int
        user: String
        detail: String
        value: Int
        created: String
    }

    type Notification {
        id: Int
        user: String
        detail: String
        coins: Int
        created: String
    }
    
    type Publication {
        accept_changues: Boolean
        banner_bottom: String
        banner_top: String
        category: Int
        certificate: Boolean
        created: String
        description: String
        id: Int
        image_1: String
        image_2: String
        image_3: String
        image_4: String
        image_5: String
        image_link: String
        is_new: Boolean
        price: Int
        quantity: Int
        sale_price: Int
        slug: String
        status: Boolean
        subcategory: Int
        tags: String
        title: String
        user: Int
        user_name: String
        user_phone: String
        user_picture: String
        views: Int
    }

    input UserInput {
        token: String
        picture: String
        phone: String
        name: String
        last_login: String
        id: Int
        email: String
        city: String
    }

    input PublicationInput {
        accept_changues: Boolean
        description: String
        id: Int
        image_link: String
        image_1: String
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